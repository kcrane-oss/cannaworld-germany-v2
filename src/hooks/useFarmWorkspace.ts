import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { buildThaiGacpChecklist } from '@/lib/farm-workspace/buildThaiGacpChecklist';
import { buildFarmTimeline } from '@/lib/farm-workspace/buildFarmTimeline';
import { buildFarmActivity } from '@/lib/farm-workspace/buildFarmActivity';
import type { FarmWorkspaceData, FarmAxisScore, FarmDocumentItem } from '@/lib/farm-workspace/types';

const AXES: { key: string; label: string; weight: number }[] = [
  { key: 'cultivation', label: 'Cultivation', weight: 25 },
  { key: 'post_harvest', label: 'Post-Harvest', weight: 25 },
  { key: 'documentation', label: 'Documentation', weight: 25 },
  { key: 'quality', label: 'Quality', weight: 15 },
  { key: 'personnel', label: 'Personnel', weight: 10 },
];

const REQUIRED_DOCS = [
  { type: 'company_registration', name: 'Company Registration' },
  { type: 'cannabis_license', name: 'Cannabis License' },
  { type: 'export_permit', name: 'Export Permit' },
  { type: 'gacp_certificate', name: 'GACP Certificate' },
  { type: 'coa', name: 'Certificate of Analysis (CoA)' },
  { type: 'facility_photo', name: 'Facility Photos' },
  { type: 'sop_manual', name: 'SOP Manual' },
];

const getRating = (score: number) => {
  if (score < 20) return 'INSUFFICIENT';
  if (score < 40) return 'BASIC';
  if (score < 60) return 'INTERMEDIATE';
  if (score < 80) return 'ADVANCED';
  return 'CERTIFIED';
};

export const useFarmWorkspace = () => {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: ['farm-workspace', user?.id],
    enabled: !!user,
    queryFn: async () => {
      const userId = user!.id;
      const [onboardingRes, docsRes, plansRes, signaturesRes, postHarvestRes, auditRes] = await Promise.all([
        supabase.from('exporter_onboarding').select('*').eq('user_id', userId).single(),
        supabase.from('onboarding_documents').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
        supabase.from('facility_plans').select('id, created_at, updated_at').eq('created_by', userId),
        supabase.from('digital_signatures').select('id, token, signature_png, created_at').eq('user_id', userId).eq('document_type', 'contract').order('created_at', { ascending: false }).limit(1),
        supabase.from('post_harvest_orders').select('id, service_type, created_at').eq('requested_by', userId).order('created_at', { ascending: false }).limit(20),
        supabase.from('audit_trail').select('id, table_name, operation, changed_at').eq('user_id' as any, userId).order('changed_at' as any, { ascending: false }).limit(20),
      ]);

      const onboarding = onboardingRes.data as any;
      const docs = (docsRes.data || []) as any[];
      const plans = (plansRes.data || []) as any[];
      const signatures = (signaturesRes.data || []) as any[];
      const postHarvest = (postHarvestRes.data || []) as any[];
      const audit = (auditRes.data || []) as any[];

      const assessment = (onboarding?.shinrai_assessment || {}) as Record<string, any>;
      const axes: FarmAxisScore[] = AXES.map((axis) => {
        const raw = assessment[axis.key]?.score ?? assessment[axis.key] ?? (axis.key === 'quality' ? assessment.quality_testing?.score ?? assessment.quality_testing ?? 0 : 0);
        return { key: axis.key, label: axis.label, score: Number(raw || 0) };
      });

      const score = Math.round(axes.reduce((sum, axis) => {
        const weight = AXES.find((a) => a.key === axis.key)?.weight || 0;
        return sum + (axis.score * weight) / 100;
      }, 0));

      const documents: FarmDocumentItem[] = REQUIRED_DOCS.map((req) => {
        const doc = docs.find((d) => d.document_type === req.type);
        let status: FarmDocumentItem['status'] = 'missing';
        if (doc) status = doc.status === 'ai_validated' || doc.status === 'validated' ? 'validated' : 'pending';
        return { type: req.type, name: req.name, status, createdAt: doc?.created_at };
      });

      const missingDocs = documents.filter((d) => d.status === 'missing').length;
      const blocking = [documents.find((d) => d.type === 'gacp_certificate')?.status === 'missing', documents.find((d) => d.type === 'coa')?.status === 'missing', axes.find((a) => a.key === 'documentation')?.score === 0].filter(Boolean).length;
      const auditGaps = axes.filter((a) => a.score > 0 && a.score < 50).length;

      const timeline = buildFarmTimeline({
        completedSteps: onboarding?.completed_steps || [],
        hasAssessment: !!onboarding?.shinrai_assessment,
        facilityPlans: plans.length,
        documents,
      });

      const dtamChecklist = buildThaiGacpChecklist({
        assessment,
        documents,
        facilityPlans: plans.length,
        hasSignedContract: !!signatures[0]?.signature_png,
        postHarvestOrders: postHarvest.length,
      });

      const activity = buildFarmActivity([
        ...docs.map((doc) => ({ id: `doc-${doc.id}`, ts: doc.created_at, text: `${doc.document_type} uploaded` })),
        ...plans.map((plan) => ({ id: `plan-${plan.id}`, ts: plan.updated_at || plan.created_at, text: 'Facility plan updated' })),
        ...postHarvest.map((order) => ({ id: `ph-${order.id}`, ts: order.created_at, text: `Post-harvest service requested: ${order.service_type}` })),
        ...audit.map((item) => ({ id: `audit-${item.id}`, ts: item.changed_at, text: `${item.operation} on ${item.table_name}` })),
        ...signatures.map((sig) => ({ id: `sig-${sig.id}`, ts: sig.created_at, text: sig.signature_png ? 'Service agreement signed' : 'Signature request created' })),
      ]);

      const data: FarmWorkspaceData = {
        loading: false,
        companyName: onboarding?.company_name || 'Unknown Farm',
        ownerName: onboarding?.contact_name || onboarding?.full_name || 'Farm Owner',
        targetStandard: 'thai_gacp',
        compliance: {
          score,
          rating: getRating(score),
          axes,
          gaps: {
            blocking,
            audit: auditGaps,
            structural: missingDocs,
            optimization: 0,
          },
        },
        documents: {
          items: documents,
          counts: {
            validated: documents.filter((d) => d.status === 'validated').length,
            pending: documents.filter((d) => d.status === 'pending').length,
            missing: documents.filter((d) => d.status === 'missing').length,
          },
        },
        dtamChecklist,
        timeline,
        activity,
        quickStats: {
          hasSignedContract: !!signatures[0]?.signature_png,
          facilityPlans: plans.length,
          postHarvestOrders: postHarvest.length,
        },
      };

      return data;
    },
  });

  return useMemo(() => query.data || {
    loading: query.isLoading,
    companyName: '',
    ownerName: '',
    targetStandard: 'thai_gacp' as const,
    compliance: { score: 0, rating: 'INSUFFICIENT', axes: [], gaps: { blocking: 0, audit: 0, structural: 0, optimization: 0 } },
    documents: { items: [], counts: { validated: 0, pending: 0, missing: 0 } },
    dtamChecklist: [],
    timeline: { currentPhase: 1, phases: [] },
    activity: [],
    quickStats: { hasSignedContract: false, facilityPlans: 0, postHarvestOrders: 0 },
  }, [query.data, query.isLoading]);
};