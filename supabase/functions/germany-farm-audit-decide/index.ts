import { authenticate, corsHeaders, isRateLimited, json } from "../_shared/cors.ts";

/**
 * germany-farm-audit-decide
 *
 * A human (admin/compliance) releases or rejects a pending farm self-audit.
 * On approval, a farm_producer is created at tier_1_gacp_ready (the self-audit
 * cleared the remote pre-audit gate; external GACP certification still follows).
 *
 * Auth: JWT + role admin / compliance. Rate limit: 60 / minute per user.
 */

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders(req) });
  if (req.method !== "POST") return json(req, { error: "method_not_allowed" }, 405);

  try {
    const auth = await authenticate(req);
    if (!auth) return json(req, { error: "unauthorized" }, 401);

    if (await isRateLimited(auth.admin, "germany-farm-audit-decide", auth.userId, 60, 60)) {
      return json(req, { error: "rate_limited", retry_after_seconds: 60 }, 429);
    }

    const { data: roles } = await auth.admin.from("user_roles").select("role").eq("user_id", auth.userId);
    const roleSet = new Set((roles ?? []).map((r: { role: string }) => r.role));
    if (!["admin", "compliance"].some((r) => roleSet.has(r))) return json(req, { error: "forbidden_role" }, 403);

    const body = await req.json().catch(() => ({}));
    const submissionId = String(body.submission_id ?? "").trim();
    const decision = String(body.decision ?? "").trim();
    const note = body.note ? String(body.note).slice(0, 2000) : null;
    if (!submissionId) return json(req, { error: "submission_id_required" }, 400);
    if (!["approved", "rejected"].includes(decision)) return json(req, { error: "invalid_decision" }, 400);

    const { data: sub } = await auth.admin
      .from("farm_audit_submissions" as never)
      .select("id, status, farm_name, province")
      .eq("id", submissionId)
      .maybeSingle();
    if (!sub) return json(req, { error: "not_found" }, 404);
    const s = sub as { status: string; farm_name: string | null; province: string | null };
    if (s.status !== "pending") return json(req, { error: "already_decided", status: s.status }, 409);

    await auth.admin
      .from("farm_audit_submissions" as never)
      .update({ status: decision, decided_by: auth.userId, decision_note: note, decided_at: new Date().toISOString() })
      .eq("id", submissionId);

    let producerId: string | null = null;
    if (decision === "approved") {
      const { data: prod } = await auth.admin
        .from("farm_producers" as never)
        .insert({ name: s.farm_name, province: s.province, country: "TH", type: "farm", tier: "tier_1_gacp_ready", status: "active" })
        .select("id")
        .maybeSingle();
      producerId = (prod as { id?: string } | null)?.id ?? null;
    }

    return json(req, { id: submissionId, status: decision, producer_id: producerId });
  } catch {
    return json(req, { error: "internal_error" }, 500);
  }
});
