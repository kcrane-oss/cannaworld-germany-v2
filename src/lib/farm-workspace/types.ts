export type FarmDocStatus = 'validated' | 'pending' | 'missing';
export type FarmChecklistStatus = 'red' | 'orange' | 'yellow' | 'green';
export type FarmTimelineStatus = 'done' | 'current' | 'todo';

export interface FarmAxisScore {
  key: string;
  label: string;
  score: number;
}

export interface FarmGapCounts {
  blocking: number;
  audit: number;
  structural: number;
  optimization: number;
}

export interface FarmDocumentItem {
  type: string;
  name: string;
  status: FarmDocStatus;
  createdAt?: string;
}

export interface FarmChecklistItem {
  id: number;
  name: string;
  status: FarmChecklistStatus;
  evidenceCount?: number;
}

export interface FarmTimelinePhase {
  name: string;
  status: FarmTimelineStatus;
}

export interface FarmActivityItem {
  id: string;
  text: string;
  time: string;
  ts: string;
}

export interface FarmWorkspaceData {
  loading: boolean;
  companyName: string;
  ownerName: string;
  targetStandard: 'thai_gacp';
  compliance: {
    score: number;
    rating: string;
    axes: FarmAxisScore[];
    gaps: FarmGapCounts;
  };
  documents: {
    items: FarmDocumentItem[];
    counts: { validated: number; pending: number; missing: number };
  };
  dtamChecklist: FarmChecklistItem[];
  timeline: {
    currentPhase: number;
    phases: FarmTimelinePhase[];
  };
  activity: FarmActivityItem[];
  quickStats: {
    hasSignedContract: boolean;
    facilityPlans: number;
    postHarvestOrders: number;
  };
}