import type { SipsungAnalysis } from "@/lib/analysis/types";

interface SipsungSectionProps {
  data: SipsungAnalysis;
}

export default function SipsungSection({ data }: SipsungSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full border border-saju-gold/25 bg-saju-gold/10 px-3 py-1 text-[0.7rem] text-saju-gold-light">
          강함: {data.strong.join(", ")}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.7rem] text-saju-cream/50">
          부족: {data.weak.join(", ")}
        </span>
      </div>

      <div className="space-y-2">
        {data.items.map((item) => (
          <div
            key={item.name}
            className={`rounded-xl border px-4 py-3 ${
              item.present
                ? "border-white/[0.08] bg-white/[0.03]"
                : "border-white/[0.04] bg-black/10 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-serif text-sm font-semibold text-saju-cream">{item.name}</span>
              <span className="text-xs tabular-nums text-saju-gold/60">{item.count}개</span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-saju-cream/45">{item.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
