import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface FarmDashboardData {
  loading: boolean;
  shinraiScore: number;
  shinraiRating: string;
  shinraiAxes: { key: string; label: string; score: number }[];
  gaps: { critical: number; audit: number; structural: number; optimization: number };
  documents: { type: string; name: string; status: 'validated' | 'pending' | 'missing' }[];
  certPhase: number;
  activity: { text: string; time: string }[];
  companyName: string;
}

interface ShinrAiAxis {
  score: number;
  answers: Record<string, any>;
}

interface ShinrAiAssessment {
  cultivation?: ShinrAiAxis;
  post_harvest?: ShinrAiAxis;
  documentation?: ShinrAiAxis;
  quality?: ShinrAiAxis;
  personnel?: ShinrAiAxis;
}

const AXIS_CONFIG = [
  { key: 'cultivation', label: 'Anbau', weight: 25 },
  { key: 'post_harvest', label: 'Post-Harvest', weight: 25 },
  { key: 'documentation', label: 'Dokumentation', weight: 25 },
  { key: 'quality', label: 'Qualität', weight: 15 },
  { key: 'personnel', label: 'Personal', weight: 10 },
];

const REQUIRED_DOCS = [
  { type: 'company_registration', name: 'Handelsregisterauszug' },
  { type: 'cultivation_license', name: 'Anbaulizenz' },
  { type: 'cannabis_license', name: 'Cannabislizenz' },
  { type: 'export_permit', name: 'Exporterlaubnis' },
  { type: 'gacp_certificate', name: 'GACP Zertifikat' },
  { type: 'coa', name: 'Analysezertifikat (CoA)' },
  { type: 'facility_photo', name: 'Anlagenfotos' },
];

const getRating = (score: number): string => {
  if (score < 20) return 'INSUFFICIENT';
  if (score < 40) return 'BASIC';
  if (score < 60) return 'INTERMEDIATE';
  if (score < 80) return 'ADVANCED';
  return 'CERTIFIED';
};

export const useFarmDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState<FarmDashboardData>({
    loading: true,
    shinraiScore: 0,
    shinraiRating: 'INSUFFICIENT',
    shinraiAxes: [],
    gaps: { critical: 0, audit: 0, structural: 0, optimization: 0 },
    documents: [],
    certPhase: 1,
    activity: [],
    companyName: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // 1. Fetch Onboarding Profile
        const { data: onboarding, error: onboardingError } = await supabase
          .from('exporter_onboarding')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (onboardingError || !onboarding) {
          setData(prev => ({ ...prev, loading: false }));
          return;
        }

        // 2. Fetch Documents
        const { data: docs, error: docsError } = await supabase
          .from('onboarding_documents')
          .select('*')
          .eq('onboarding_id', onboarding.id);

        if (docsError) console.error('Error fetching documents:', docsError);

        // 3. Process ShinrAi Assessment
        const assessment = (onboarding.shinrai_assessment as unknown as ShinrAiAssessment) || {};
        let totalScore = 0;
        const axes: FarmDashboardData['shinraiAxes'] = [];
        let criticalGaps = 0;
        let auditGaps = 0;

        AXIS_CONFIG.forEach(axis => {
          const axisData = assessment[axis.key as keyof ShinrAiAssessment];
          const score = axisData?.score || 0;
          
          totalScore += (score * axis.weight) / 100;
          axes.push({ key: axis.key, label: axis.label, score });

          // Gap Logic
          if (score === 0 && axis.weight >= 25) {
            criticalGaps++;
          } else if (score < 50 && axis.weight >= 15) {
            auditGaps++;
          }
        });

        // 4. Process Documents
        const processedDocs: FarmDashboardData['documents'] = REQUIRED_DOCS.map(req => {
          const doc = docs?.find(d => d.document_type === req.type);
          let status: 'validated' | 'pending' | 'missing' = 'missing';
          
          if (doc) {
            status = doc.status === 'ai_validated' ? 'validated' : 'pending';
          }
          
          return { type: req.type, name: req.name, status };
        });

        const structuralGaps = processedDocs.filter(d => d.status === 'missing').length;

        // 5. Determine Certification Phase
        let certPhase = 1;
        const completedSteps = onboarding.completed_steps || [];
        if (completedSteps.includes(1) && completedSteps.includes(2) && completedSteps.includes(3)) {
          certPhase = 2;
          if (onboarding.shinrai_assessment) {
            certPhase = 2; // In real scenarios might be 3 if assessment is finished
          }
        }

        // 6. Activity Mock (as requested)
        const recentActivity = [
          { text: 'Profil vervollständigt', time: new Date(onboarding.updated_at).toLocaleDateString() },
        ];
        if (docs && docs.length > 0) {
          recentActivity.unshift({ 
            text: 'Dokumente hochgeladen', 
            time: new Date(docs[0].created_at).toLocaleTimeString() 
          });
        }

        setData({
          loading: false,
          shinraiScore: Math.round(totalScore),
          shinraiRating: getRating(totalScore),
          shinraiAxes: axes,
          gaps: {
            critical: criticalGaps,
            audit: auditGaps,
            structural: structuralGaps,
            optimization: Math.max(0, 5 - auditGaps) // Placeholder logic
          },
          documents: processedDocs,
          certPhase,
          activity: recentActivity,
          companyName: onboarding.company_name || 'Unbekanntes Unternehmen',
        });

      } catch (error) {
        console.error('Error in useFarmDashboard:', error);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, [user]);

  return data;
};
