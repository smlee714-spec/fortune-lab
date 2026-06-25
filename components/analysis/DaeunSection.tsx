import type { DaeunAnalysis } from "@/lib/analysis/types";

interface DaeunSectionProps {
  data: DaeunAnalysis;
}

export default function DaeunSection({ data }: DaeunSectionProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-saju-gold/10 bg-saju-gold/[0.04] px-4 py-3">
        <p className="text-[0.65rem] font-semibold text-saju-gold/70">대운 방향</p>
        <p className="mt-1 text-sm text-saju-cream/70">{data.direction}</p>
        <p className="mt-2 text-xs leading-relaxed text-saju-cream/45">{data.summary}</p>
      </div>

      <div className="space-y-3">
        {data.periods.map((period) => (
          <article key={`${period.startAge}-${period.stem}${period.branch}`} className="analysis-card">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="font-serif text-sm font-semibold text-saju-gold-light">
                  {period.startAge}~{period.endAge}세
                </p>
                <p className="mt-0.5 text-xs text-saju-cream/40">
                  {period.stem}
                  {period.branch} · {period.keyword}
                </p>
              </div>
              <span className="rounded-lg border border-white/10 bg-black/20 px-2 py-1 font-serif text-sm text-saju-cream/70">
                {period.stem}
                {period.branch}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "돈", value: period.money },
                { label: "직업", value: period.career },
                { label: "연애", value: period.love },
                { label: "건강", value: period.health },
              ].map((field) => (
                <div
                  key={field.label}
                  className="rounded-lg border border-white/[0.05] bg-black/15 px-3 py-2"
                >
                  <p className="text-[0.6rem] font-semibold text-saju-gold/60">{field.label}</p>
                  <p className="mt-1 text-[0.65rem] leading-snug text-saju-cream/50">{field.value}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
