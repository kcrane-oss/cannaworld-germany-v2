import { formatDistanceToNow } from 'date-fns';
import type { FarmActivityItem } from './types';

interface SourceItem {
  id: string;
  ts: string;
  text: string;
}

export function buildFarmActivity(sources: SourceItem[]): FarmActivityItem[] {
  return sources
    .filter((item) => !!item.ts)
    .sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime())
    .slice(0, 8)
    .map((item) => ({
      id: item.id,
      text: item.text,
      ts: item.ts,
      time: formatDistanceToNow(new Date(item.ts), { addSuffix: true }),
    }));
}