/**
 * Pre-Audit Gap Generator — Intelligent Priority Analysis
 * 
 * NOT equal-weight slicing. Weighted by what KILLS an EU import first:
 * 
 * Priority Tiers (from "instant rejection" to "nice to have"):
 * 
 * 🔴 TIER 1 — IMPORT KILLERS (rejection at border/BfArM/GACP audit)
 *    - Pesticide contamination (PhEur 2.8.13 — 500+ substances)
 *    - Heavy metals above EU limits (Pb, Cd, Hg, As)
 *    - Microbial contamination (PhEur 5.1.4/5.1.8)
 *    - Mycotoxins (Aflatoxin B1/total, Ochratoxin A)
 *    - No batch traceability = no import permit period
 *    - No accredited lab = results worthless
 * 
 * 🟠 TIER 2 — AUDIT FAILURES (GACP inspector finds → no certification)
 *    - No validated drying process (18-22°C, 45-55% RH)
 *    - No GDP-compliant storage (15-25°C, <60% RH, light protection)
 *    - No SOPs or outdated SOPs
 *    - No ALCOA+ documentation
 *    - No deviation/CAPA process
 *    - Water quality not documented
 * 
 * 🟡 TIER 3 — STRUCTURAL GAPS (fixable in 2-4 weeks)
 *    - No org chart
 *    - No training records
 *    - No IPM plan documented
 *    - Facility layout not to scale
 *    - No hygiene program
 * 
 * 🟢 TIER 4 — OPTIMIZATION (good to have, not blocking)
 *    - Genetic verification (DNA fingerprinting)
 *    - Environmental monitoring logs
 *    - FIFO stock rotation system
 *    - Quarantine area marking
 */

export interface GapItem {
  id: string;
  tier: 1 | 2 | 3 | 4;
  category: string;
  gap: string;
  impact: string;
  action: string;
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
  cost_estimate?: string;
  eu_reference: string;
  blocking: boolean;
}

export interface PreAuditReport {
  company: string;
  date: string;
  overall_score: number;
  rating: string;
  tier: string;
  total_gaps: number;
  critical_gaps: number;
  blocking_gaps: number;
  estimated_weeks_to_ready: number;
  gaps: GapItem[];
  executive_summary: string;
  priority_actions: string[];
}

export function generatePreAuditReport(
  companyName: string,
  shinraiScore: number,
  shinraiRating: string,
  tier: string,
  assessment: Record<string, { answers: Record<string, number>; score: number }>,
): PreAuditReport {
  const gaps: GapItem[] = [];
  let gapId = 0;

  const g = (
    tierId: 1 | 2 | 3 | 4,
    category: string,
    gap: string,
    impact: string,
    action: string,
    effort: 'low' | 'medium' | 'high',
    timeframe: string,
    eu_reference: string,
    blocking: boolean,
    cost_estimate?: string,
  ): GapItem => ({
    id: `GAP-${String(++gapId).padStart(3, '0')}`,
    tier: tierId,
    category,
    gap,
    impact,
    action,
    effort,
    timeframe,
    cost_estimate,
    eu_reference,
    blocking,
  });

  // ─── Analyze each axis ───

  // CULTIVATION (fac_gacp)
  const gacpAnswer = assessment.cultivation?.answers?.fac_gacp ?? 0;

  if (gacpAnswer <= 1) {
    gaps.push(g(1, 'GACP Certification', 
      'No GACP certification or process in place',
      'Cannot export to EU without GACP. BfArM requires GACP certificate for import permit application.',
      'Engage GACP consultant, begin gap assessment, target certification within 6 months',
      'high', '4-6 months',
      'EU-GMP Annex 7, GACP Guidelines (WHO/EMA), German BfArM Import Requirements',
      true, '€15,000-30,000 for consultant + certification'));
  }

  // POST-HARVEST (ph_drying, ph_storage)
  const dryingAnswer = assessment.post_harvest?.answers?.ph_drying ?? 0;
  const storageAnswer = assessment.post_harvest?.answers?.ph_storage ?? 0;

  if (dryingAnswer <= 1) {
    gaps.push(g(2, 'Post-Harvest: Drying',
      'No validated drying process',
      'Uncontrolled drying → inconsistent moisture, mold risk, mycotoxin contamination. GACP auditor will flag immediately.',
      'Install temp/humidity monitoring in drying room. Validate drying SOP: 18-22°C, 45-55% RH, target moisture 8-12%, water activity ≤0.60',
      'medium', '2-4 weeks',
      'GACP §5 (Drying), PhEur Monograph Cannabis Flos',
      true, '€2,000-5,000 for sensors + calibration'));
  }

  if (storageAnswer <= 1) {
    gaps.push(g(2, 'Post-Harvest: Storage',
      'No GDP-compliant storage conditions',
      'Product degradation, contamination risk. EU importer cannot accept product stored outside spec.',
      'Implement controlled storage: 15-25°C, <60% RH, UV light protection, pest control, continuous monitoring logs',
      'medium', '2-4 weeks',
      'GACP §6 (Storage), GDP Guidelines 2013/C 343/01',
      true, '€3,000-8,000 for climate control + monitoring'));
  }

  if (dryingAnswer <= 1 || storageAnswer <= 1) {
    gaps.push(g(1, 'Post-Harvest: Contamination Risk',
      'No water activity testing / moisture control',
      'Water activity >0.60 = mycotoxin growth. Aflatoxin contamination = instant EU border rejection, entire batch destroyed.',
      'Source water activity meter (aw meter). Test every batch. Target aw ≤0.60, moisture 8-12%.',
      'low', '1 week',
      'PhEur 2.8.13, EU Regulation 1881/2006 (mycotoxin limits)',
      true, '€500-1,500 for aw meter'));
  }

  // DOCUMENTATION (doc_batch_records)
  const batchAnswer = assessment.documentation?.answers?.doc_batch_records ?? 0;

  if (batchAnswer === 0) {
    gaps.push(g(1, 'Documentation: Batch Traceability',
      'No batch records exist',
      'ABSOLUTE IMPORT KILLER. Without seed-to-sale traceability, no EU import permit possible. BfArM requires complete chain of custody.',
      'Implement batch numbering system immediately. Every harvest, drying, trimming, packaging step gets a batch number. Template: KK-YYYY-NNN.',
      'medium', '1-2 weeks',
      'GACP §10 (Traceability), EU-GMP Annex 11, German BtMG §5',
      true));
  }

  if (batchAnswer <= 1) {
    gaps.push(g(2, 'Documentation: ALCOA+',
      'No ALCOA+ compliant documentation system',
      'GACP audit will check: Attributable, Legible, Contemporaneous, Original, Accurate. Handwritten or missing records = major finding.',
      'Create master SOP list. Implement record templates (batch record, harvest log, drying log, storage log). Train staff on ALCOA+ principles.',
      'medium', '2-3 weeks',
      'GACP §9 (Documentation), ICH Q7, PIC/S PE 009-16',
      true));

    gaps.push(g(2, 'Documentation: SOPs',
      'Standard Operating Procedures missing or not current',
      'GACP auditor expects minimum: Harvest SOP, Drying SOP, Packaging SOP, Storage SOP, Cleaning SOP, Pest Control SOP, Deviation Handling SOP.',
      'Draft 7 core SOPs (templates available in CannaWorld platform). Get head of operations to review + sign. Version control system.',
      'medium', '2-4 weeks',
      'GACP §7 (Quality Control), EU-GMP Chapter 4',
      false));
  }

  // QUALITY TESTING (qa_lab_accredited)
  const labAnswer = assessment.quality_testing?.answers?.qa_lab_accredited ?? 0;

  if (labAnswer === 0) {
    gaps.push(g(1, 'Quality: Lab Testing',
      'No accredited laboratory testing',
      'EU requires ISO 17025 accredited lab results. Non-accredited test results are legally worthless for EU import.',
      'Contract an ISO 17025 accredited lab in Thailand (e.g., SGS, Eurofins, TÜV). Full PhEur panel: cannabinoids, pesticides (500+), heavy metals (ICP-MS), microbiology, mycotoxins, moisture.',
      'low', '1-2 weeks to contract',
      'PhEur Monograph Cannabis Flos, ISO 17025, EU Dir 2001/83/EC',
      true, '€800-2,000 per batch for full panel'));
  }

  if (labAnswer <= 1) {
    gaps.push(g(1, 'Quality: Pesticide Testing',
      'No PhEur pesticide panel (500+ substances)',
      'Single pesticide above EU limit = entire shipment rejected at border. Most common Thai farm failure point.',
      'Stop ALL non-approved pesticide use immediately. Use only GACP-approved IPM. Test next harvest with full PhEur 2.8.13 panel.',
      'high', '1 harvest cycle',
      'PhEur 2.8.13, EU Regulation 396/2005',
      true));

    gaps.push(g(1, 'Quality: Heavy Metals',
      'No ICP-MS heavy metal analysis',
      'Lead, Cadmium, Mercury, Arsenic above PhEur limits = batch rejection. Thai soil often contaminated from prior land use.',
      'Soil analysis before next cultivation. ICP-MS testing of current product. If soil contaminated: remediate or relocate.',
      'medium', '2-4 weeks',
      'PhEur 2.4.27, ICH Q3D',
      true, '€200-500 per soil test, €300-600 per product test'));
  }

  // PERSONNEL (staff_trained)
  const trainedAnswer = assessment.personnel?.answers?.staff_trained ?? 0;

  if (trainedAnswer <= 1) {
    gaps.push(g(3, 'Personnel: Training',
      'No formal GACP/GMP training for staff',
      'GACP §8 requires documented training. Auditor will interview random staff — if they cant explain hygiene or batch procedures, major finding.',
      'Schedule GACP basics training (1 day). Cover: personal hygiene, hand washing, protective clothing, batch documentation, deviation reporting. Document attendance.',
      'low', '1 week',
      'GACP §8 (Personnel), EU-GMP Chapter 2',
      false, '€500-1,500 for trainer'));

    gaps.push(g(3, 'Personnel: Hygiene Program',
      'No documented hygiene program',
      'Minor audit finding but accumulated minors = major. Easy fix.',
      'Create hygiene SOP: handwashing stations, PPE requirements, health checks, no eating/smoking in production areas. Post visual signs in Thai.',
      'low', '3-5 days',
      'GACP §8.3 (Hygiene)',
      false, '€200-500'));
  }

  // Always add these structural gaps for score < 30
  if (shinraiScore < 30) {
    gaps.push(g(3, 'Structure: Organization',
      'No organizational chart with defined responsibilities',
      'GACP auditor needs to see who is responsible for what. Quality, Production, Storage must have named responsible persons.',
      'Create org chart. Assign: Farm Manager, QA Responsible, Storage Manager. Even if same person — document it.',
      'low', '1 day',
      'GACP §8.1 (Organization)',
      false));

    gaps.push(g(4, 'Optimization: Seed-to-Sale System',
      'No digital traceability system',
      'Paper-based is GACP-compliant but error-prone. Digital system reduces audit risk and speeds up EU import documentation.',
      'Onboard to CannaWorld platform batch tracking module. Connects to ShinrAi for continuous compliance monitoring.',
      'low', '1-2 weeks',
      'GACP §10, EU-GMP Annex 11',
      false));
  }

  // ─── Sort by tier (import killers first), then by blocking status ───
  gaps.sort((a, b) => {
    if (a.tier !== b.tier) return a.tier - b.tier;
    if (a.blocking !== b.blocking) return a.blocking ? -1 : 1;
    return 0;
  });

  // ─── Calculate estimates ───
  const criticalGaps = gaps.filter(g => g.tier === 1).length;
  const blockingGaps = gaps.filter(g => g.blocking).length;
  
  // Weeks estimate based on worst gaps
  let weeksEstimate = 4; // minimum
  if (criticalGaps >= 4) weeksEstimate = 24; // 6 months for GACP cert
  else if (criticalGaps >= 2) weeksEstimate = 16;
  else if (blockingGaps >= 3) weeksEstimate = 12;
  else if (blockingGaps >= 1) weeksEstimate = 8;

  // Executive summary
  const summary = shinraiScore < 15
    ? `${companyName} is at a very early stage of EU export readiness. ${criticalGaps} critical gaps identified that would result in immediate import rejection. The most urgent priorities are: establishing batch traceability, contracting an accredited lab, and implementing validated drying/storage processes. Without these fundamentals, no EU import permit application is possible. Estimated timeline to GACP audit-ready: ${weeksEstimate} weeks with dedicated effort.`
    : shinraiScore < 30
    ? `${companyName} has basic operations but significant compliance gaps. ${criticalGaps} import-killing issues need immediate attention. Focus on documentation system and quality testing infrastructure.`
    : `${companyName} shows partial compliance readiness. ${blockingGaps} blocking gaps remain before EU export is viable.`;

  // Top 5 priority actions
  const priorityActions = gaps
    .filter(g => g.tier <= 2)
    .slice(0, 5)
    .map((g, i) => `${i + 1}. ${g.action.split('.')[0]}.`);

  return {
    company: companyName,
    date: new Date().toISOString().split('T')[0],
    overall_score: shinraiScore,
    rating: shinraiRating,
    tier,
    total_gaps: gaps.length,
    critical_gaps: criticalGaps,
    blocking_gaps: blockingGaps,
    estimated_weeks_to_ready: weeksEstimate,
    gaps,
    executive_summary: summary,
    priority_actions: priorityActions,
  };
}
