import type { FarmDocumentItem, FarmTimelinePhase } from './types';

interface TimelineInput {
  completedSteps?: number[];
  hasAssessment: boolean;
  facilityPlans: number;
  documents: FarmDocumentItem[];
}

export function buildFarmTimeline(input: TimelineInput): { currentPhase: number; phases: FarmTimelinePhase[] } {
  const validatedOrPendingDocs = input.documents.filter((d) => d.status !== 'missing').length;

  const phases: FarmTimelinePhase[] = [
    { name: 'Onboarding', status: 'done' },
    { name: 'Gap Analysis', status: input.hasAssessment ? 'current' : 'todo' },
    { name: 'Infrastructure', status: input.facilityPlans > 0 ? 'current' : 'todo' },
    { name: 'Training & Docs', status: validatedOrPendingDocs >= 4 ? 'current' : 'todo' },
    { name: 'DTAM Audit', status: 'todo' },
  ];

  let currentPhase = 2;
  if (!input.hasAssessment) currentPhase = 1;
  else if (input.facilityPlans > 0 && validatedOrPendingDocs >= 4) currentPhase = 4;
  else if (input.facilityPlans > 0) currentPhase = 3;

  const normalized = phases.map((phase, index) => ({
    ...phase,
    status: index + 1 < currentPhase ? 'done' as const : index + 1 === currentPhase ? 'current' as const : 'todo' as const,
  }));

  return { currentPhase, phases: normalized };
}