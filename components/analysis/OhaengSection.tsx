import { ELEMENT_META } from "@/lib/saju";
import type { OhaengAnalysis } from "@/lib/analysis/types";
import type { Element } from "@/lib/types";

const ELEMENTS: Element[] = ["목", "화", "토", "금", "수"];

interface OhaengSectionProps {
  data: OhaengAnalysis;
}

export default function OhaengSection({ data }: OhaengSectionProps) {
  const max = Math.max(...ELEMENTS.map((e) => data.counts[e]), 1);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-2">
        {ELEMENTS.map((el) => (
          <div
            key={el}
            className="rounded-xl border border-white/[0.06] bg-black/20 px-1 py-3 text-center"
          >
            <p className={`font-serif text-sm font-bold ${ELEMENT_META[el].className}`}>{el}</p>
            <p className="mt-1 font-serif text-lg font-bold text-saju-cream">{data.counts[el]}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {ELEMENTS.map((el) => {
          const pct = (data.counts[el] / max) * 100;
          return (
            <div key={`bar-${el}`} className="flex items-center gap-2">
              <span className={`w-5 text-xs font-semibold ${ELEMENT_META[el].className}`}>{el}</span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className={`h-full rounded-full ${ELEMENT_META[el].barClass}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-saju-gold/10 bg-saju-gold/[0.04] p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-saju-gold/20 bg-saju-gold/10 px-2.5 py-1 text-[0.65rem] text-saju-gold-light">
            많음: {data.abundant.join(", ")}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.65rem] text-saju-cream/50">
            부족: {data.lacking.join(", ")}
          </span>
        </div>
        <p className="text-xs leading-[1.85] text-saju-cream/55">{data.easyExplanation}</p>
      </div>
    </div>
  );
}
