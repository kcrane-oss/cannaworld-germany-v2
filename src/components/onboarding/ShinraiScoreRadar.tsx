import { cn } from "@/lib/utils";

interface AxisScore {
  key: string;
  label: string;
  score: number; // 0-100
  weight: number;
}

interface Props {
  axes: AxisScore[];
  totalScore: number;
  rating: string;
  size?: number;
  className?: string;
}

const RATING_CONFIG: Record<string, { label: string; color: string; stars: string }> = {
  excellence: { label: "Excellence", color: "text-amber-500", stars: "⭐⭐⭐⭐⭐" },
  compliant: { label: "Compliant", color: "text-emerald-500", stars: "⭐⭐⭐⭐" },
  developing: { label: "Developing", color: "text-blue-500", stars: "⭐⭐⭐" },
  basic: { label: "Basic", color: "text-muted-foreground", stars: "⭐⭐" },
  insufficient: { label: "Insufficient", color: "text-red-500", stars: "⭐" },
};

const FILL_COLORS: Record<string, string> = {
  excellence: "rgba(245,158,11,0.15)",
  compliant: "rgba(16,185,129,0.15)",
  developing: "rgba(59,130,246,0.15)",
  basic: "rgba(156,163,175,0.15)",
  insufficient: "rgba(239,68,68,0.15)",
};

const STROKE_COLORS: Record<string, string> = {
  excellence: "rgba(245,158,11,0.8)",
  compliant: "rgba(16,185,129,0.8)",
  developing: "rgba(59,130,246,0.8)",
  basic: "rgba(156,163,175,0.8)",
  insufficient: "rgba(239,68,68,0.8)",
};

export function ShinraiScoreRadar({ axes, totalScore, rating, size = 280, className }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - 40;
  const n = axes.length;

  const getPoint = (index: number, radius: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  };

  const rings = [0.2, 0.4, 0.6, 0.8, 1.0];
  const dataPoints = axes.map((a, i) => getPoint(i, (a.score / 100) * maxR));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";
  const ratingInfo = RATING_CONFIG[rating] ?? RATING_CONFIG.basic;

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {rings.map((r) => {
          const points = Array.from({ length: n }, (_, i) => getPoint(i, r * maxR));
          const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";
          return <path key={r} d={path} fill="none" stroke="currentColor" strokeOpacity={0.1} strokeWidth={1} />;
        })}
        {axes.map((_, i) => {
          const p = getPoint(i, maxR);
          return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="currentColor" strokeOpacity={0.1} strokeWidth={1} />;
        })}
        <path d={dataPath} fill={FILL_COLORS[rating] ?? FILL_COLORS.basic} stroke={STROKE_COLORS[rating] ?? STROKE_COLORS.basic} strokeWidth={2} />
        {dataPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3} fill={STROKE_COLORS[rating] ?? STROKE_COLORS.basic} />
        ))}
        {axes.map((a, i) => {
          const p = getPoint(i, maxR + 20);
          return (
            <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-[10px]">
              {a.label}
            </text>
          );
        })}
        <text x={cx} y={cy - 8} textAnchor="middle" className="fill-foreground text-2xl font-bold">{totalScore}</text>
        <text x={cx} y={cy + 12} textAnchor="middle" className="fill-muted-foreground text-[10px]">ShinrAi</text>
      </svg>
      <div className={cn("text-sm font-medium", ratingInfo.color)}>
        {ratingInfo.stars} {ratingInfo.label}
      </div>
    </div>
  );
}
