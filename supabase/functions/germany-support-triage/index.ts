import { authenticate, codexAuthorized, corsHeaders, isRateLimited, json, serviceClient } from "../_shared/cors.ts";

/**
 * germany-support-triage  (B2)
 *
 * Classifies one inbound support message and updates its conversation
 * (category, urgency/priority, escalation tier, suggested reply draft).
 *
 * Layered & cost-aware:
 *   1. Deterministic rules (mirrors src/lib/triage-rules.ts) — compliance/safety
 *      cases are forced to tier 2 and NEVER AI-auto-resolved.
 *   2. LLM classification (default claude-haiku-4-5) only if CW_AI_TRIAGE_ENABLED.
 *
 * Config: CW_AI_TRIAGE_ENABLED ('true'|'false'), CW_TRIAGE_MODEL, ANTHROPIC_API_KEY.
 * Auth: Codex service token OR staff JWT (admin/compliance).
 */

const COMPLIANCE = ["recall", "rückruf", "legal", "rechtlich", "gdpr", "dsgvo", "datenschutz", "safety", "sicherheit", "contamination", "kontamination", "bfarm", "narcotic", "betäubungsmittel", "audit", "deviation", "abweichung", "complaint", "beschwerde", "adverse", "nebenwirkung"];
const URGENT = ["urgent", "dringend", "asap", "sofort", "emergency", "notfall"];
const HIGH = ["important", "wichtig", "deadline", "frist", "blocked", "blockiert", "overdue", "überfällig"];

function rules(text: string) {
  const t = text.toLowerCase();
  const complianceFlag = COMPLIANCE.some((k) => t.includes(k));
  const urgency = URGENT.some((k) => t.includes(k)) ? "urgent" : HIGH.some((k) => t.includes(k)) ? "high" : "normal";
  return { complianceFlag, urgency, forceTier: complianceFlag ? 2 : 0, autoResolvable: !complianceFlag };
}

async function classifyWithLLM(text: string, model: string, apiKey: string) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": apiKey, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model,
      max_tokens: 400,
      system:
        "You triage B2B medical-cannabis support messages. Reply ONLY with JSON: " +
        '{"category":"status|docs|logistics|commercial|compliance|other","urgency":"low|normal|high|urgent","suggested_reply":"..."}. ' +
        "B2B only, no therapeutic/medical claims in the reply.",
      messages: [{ role: "user", content: text.slice(0, 4000) }],
    }),
  });
  if (!res.ok) throw new Error(`llm_${res.status}`);
  const data = await res.json();
  const raw = data?.content?.[0]?.text ?? "{}";
  return JSON.parse(raw) as { category?: string; urgency?: string; suggested_reply?: string };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders(req) });
  if (req.method !== "POST") return json(req, { error: "method_not_allowed" }, 405);

  try {
    // Auth: Codex service token (automation) OR staff JWT.
    let admin;
    let callerId = "codex";
    if (codexAuthorized(req)) {
      admin = serviceClient();
    } else {
      const auth = await authenticate(req);
      if (!auth) return json(req, { error: "unauthorized" }, 401);
      const { data: roles } = await auth.admin.from("user_roles").select("role").eq("user_id", auth.userId);
      const roleSet = new Set((roles ?? []).map((r: { role: string }) => r.role));
      if (!["admin", "compliance"].some((r) => roleSet.has(r))) return json(req, { error: "forbidden_role" }, 403);
      admin = auth.admin;
      callerId = auth.userId;
    }

    if (await isRateLimited(admin, "germany-support-triage", callerId, 60, 120)) {
      return json(req, { error: "rate_limited", retry_after_seconds: 60 }, 429);
    }

    const body = await req.json().catch(() => ({}));
    const messageId = String(body.message_id ?? "").trim();
    if (!messageId) return json(req, { error: "message_id_required" }, 400);

    const { data: msg } = await admin
      .from("support_messages" as never)
      .select("id, conversation_id, body")
      .eq("id", messageId)
      .maybeSingle();
    if (!msg) return json(req, { error: "message_not_found" }, 404);
    const m = msg as { conversation_id: string; body: string };

    const r = rules(m.body ?? "");
    const aiEnabled = Deno.env.get("CW_AI_TRIAGE_ENABLED") === "true";
    const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
    const model = Deno.env.get("CW_TRIAGE_MODEL") || "claude-haiku-4-5";

    let category = r.complianceFlag ? "compliance" : "other";
    let urgency = r.urgency;
    let suggestedReply: string | null = null;
    let usedModel = "rules-only";

    if (aiEnabled && apiKey) {
      try {
        const ai = await classifyWithLLM(m.body ?? "", model, apiKey);
        usedModel = model;
        if (!r.complianceFlag && ai.category) category = ai.category; // rules win on compliance
        if (ai.urgency && r.urgency === "normal") urgency = ai.urgency; // rules win when they raised it
        suggestedReply = ai.suggested_reply ?? null;
      } catch {
        usedModel = "rules-only(llm_failed)";
      }
    }

    const tier = r.forceTier; // B2: compliance→2; auto-resolution handled in B3 escalation
    const priorityMap: Record<string, string> = { low: "low", normal: "normal", high: "high", urgent: "urgent" };

    await admin.from("support_triage_results" as never).insert({
      message_id: messageId,
      model: usedModel,
      category,
      urgency,
      compliance_flag: r.complianceFlag,
      suggested_reply: suggestedReply,
      auto_resolved: false,
      cache_hit: false,
    });

    await admin
      .from("support_conversations" as never)
      .update({
        status: r.complianceFlag ? "open" : "triaged",
        tier,
        priority: priorityMap[urgency] ?? "normal",
        updated_at: new Date().toISOString(),
      })
      .eq("id", m.conversation_id);

    return json(req, { category, urgency, compliance_flag: r.complianceFlag, tier, model: usedModel, suggested_reply: suggestedReply });
  } catch {
    return json(req, { error: "internal_error" }, 500);
  }
});
