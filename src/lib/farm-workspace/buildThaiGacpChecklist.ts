import type { FarmChecklistItem, FarmDocumentItem } from './types';

interface ChecklistInput {
  assessment?: Record<string, any> | null;
  documents: FarmDocumentItem[];
  facilityPlans: number;
  hasSignedContract: boolean;
  postHarvestOrders: number;
}

const hasDoc = (documents: FarmDocumentItem[], type: string, statuses: string[] = ['validated', 'pending']) =>
  documents.some((d) => d.type === type && statuses.includes(d.status));

export function buildThaiGacpChecklist(input: ChecklistInput): FarmChecklistItem[] {
  const assessment = input.assessment || {};
  const axes = {
    cultivation: assessment.cultivation?.score ?? assessment.cultivation ?? 0,
    post_harvest: assessment.post_harvest?.score ?? assessment.post_harvest ?? 0,
    documentation: assessment.documentation?.score ?? assessment.documentation ?? 0,
    quality: assessment.quality?.score ?? assessment.quality ?? assessment.quality_testing?.score ?? assessment.quality_testing ?? 0,
    personnel: assessment.personnel?.score ?? assessment.personnel ?? 0,
  };

  return [
    { id: 1, name: 'Quality Assurance', status: hasDoc(input.documents, 'coa') ? 'green' : 'red', evidenceCount: hasDoc(input.documents, 'coa') ? 1 : 0 },
    { id: 2, name: 'Personal Hygiene', status: axes.personnel >= 50 ? 'green' : axes.personnel >= 20 ? 'orange' : 'red' },
    { id: 3, name: 'Documentation System', status: axes.documentation >= 50 ? 'green' : axes.documentation >= 20 ? 'orange' : 'red', evidenceCount: (input.documents as any).items?.length || input.documents.length },
    { id: 4, name: 'Equipment Management', status: input.facilityPlans > 0 ? 'yellow' : 'red' },
    { id: 5, name: 'Cultivation Site', status: hasDoc(input.documents, 'cannabis_license') ? 'green' : 'yellow', evidenceCount: hasDoc(input.documents, 'cannabis_license') ? 1 : 0 },
    { id: 6, name: 'Water Management', status: axes.cultivation >= 50 ? 'yellow' : 'red' },
    { id: 7, name: 'Fertilizer Control', status: axes.cultivation >= 50 ? 'yellow' : 'red' },
    { id: 8, name: 'Seeds & Propagation', status: axes.cultivation >= 25 ? 'yellow' : 'red' },
    { id: 9, name: 'Cultivation Practices', status: axes.cultivation >= 50 ? 'green' : axes.cultivation >= 20 ? 'orange' : 'red' },
    { id: 10, name: 'Harvesting', status: axes.post_harvest >= 50 ? 'green' : axes.post_harvest >= 20 ? 'orange' : 'red' },
    { id: 11, name: 'Primary Processing', status: input.postHarvestOrders > 0 ? 'yellow' : axes.post_harvest >= 20 ? 'orange' : 'red', evidenceCount: input.postHarvestOrders },
    { id: 12, name: 'Processing Facilities', status: input.facilityPlans > 0 ? 'yellow' : 'red', evidenceCount: input.facilityPlans },
    { id: 13, name: 'Packaging & Labeling', status: hasDoc(input.documents, 'export_permit') ? 'yellow' : 'red' },
    { id: 14, name: 'Storage & Distribution', status: hasDoc(input.documents, 'export_permit') ? 'orange' : 'red', evidenceCount: hasDoc(input.documents, 'export_permit') ? 1 : 0 },
  ];
}