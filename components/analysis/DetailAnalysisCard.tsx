import type { ReactNode } from "react";

interface DetailAnalysisCardProps {
  title: string;
  badge?: string;
  badgeVariant?: "detected" | "neutral" | "relation";
  children: ReactNode;
}

export default function DetailAnalysisCard({
  title,
  badge,
  badgeVariant = "neutral",
  children,
}: DetailAnalysisCardProps) {
  const badgeClass = {
    detected: "border-saju-gold/30 bg-saju-gold/10 text-saju-gold-light",
    neutral: "border-white/10 bg-white/5 text-saju-cream/50",
    relation: "border-saju-water/30 bg-saju-water/10 text-saju-water",
  }[badgeVariant];

  return (
    <article className="analysis-card">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="font-serif text-sm font-semibold text-saju-cream">{title}</h3>
        {badge && (
          <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[0.65rem] font-medium ${badgeClass}`}>
            {badge}
          </span>
        )}
      </div>
      {children}
    </article>
  );
}

interface DetailRowProps {
  label: string;
  value: string;
}

export function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="border-t border-white/[0.05] py-2.5 first:border-0 first:pt-0">
      <p className="mb-1 text-[0.65rem] font-semibold tracking-wide text-saju-gold/60">{label}</p>
      <p className="text-xs leading-[1.75] text-saju-cream/55">{value}</p>
    </div>
  );
}
