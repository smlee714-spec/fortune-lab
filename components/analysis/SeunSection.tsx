import type { SeunAnalysis } from "@/lib/analysis/types";

interface SeunSectionProps {
  data: SeunAnalysis;
}

export default function SeunSection({ data }: SeunSectionProps) {
  return (
    <div className="space-y-4">
      <p className="text-xs leading-relaxed text-saju-cream/40">{data.summary}</p>

      {data.years.map((year) => (
        <article
          key={year.year}
          className="analysis-card border-saju-gold/10 bg-gradient-to-br from-saju-gold/[0.05] to-transparent"
        >
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="font-serif text-lg font-bold text-saju-gold-light">{year.label}</p>
              <p className="text-xs text-saju-cream/40">{year.year}년 · {year.keyword}</p>
            </div>
            <span className="rounded-full border border-saju-gold/20 bg-saju-gold/10 px-2.5 py-1 text-[0.65rem] text-saju-gold-light">
              {year.keyword}
            </span>
          </div>

          <p className="mb-3 text-xs leading-relaxed text-saju-cream/60">{year.overall}</p>

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "돈", value: year.money, icon: "◆" },
              { label: "연애", value: year.love, icon: "♥" },
              { label: "직업", value: year.career, icon: "▲" },
              { label: "건강", value: year.health, icon: "●" },
            ].map((field) => (
              <div
                key={`${year.year}-${field.label}`}
                className="rounded-xl border border-white/[0.06] bg-black/20 p-3"
              >
                <p className="text-[0.65rem] font-semibold text-saju-gold/70">
                  {field.icon} {field.label}
                </p>
                <p className="mt-1.5 text-[0.65rem] leading-snug text-saju-cream/50">{field.value}</p>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
