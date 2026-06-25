import { ELEMENT_META } from "@/lib/saju";
import type { Element } from "@/lib/types";

interface ElementChartProps {
  counts: Record<Element, number>;
}

const ELEMENTS: Element[] = ["목", "화", "토", "금", "수"];

export default function ElementChart({ counts }: ElementChartProps) {
  const max = Math.max(...Object.values(counts), 1);

  return (
    <div className="space-y-3">
      {ELEMENTS.map((el) => {
        const count = counts[el];
        const pct = (count / max) * 100;
        const meta = ELEMENT_META[el];

        return (
          <div key={el} className="flex items-center gap-3">
            <span
              className={`w-6 shrink-0 text-center font-serif text-sm font-semibold ${meta.className}`}
            >
              {el}
            </span>
            <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className={`absolute inset-y-0 left-0 rounded-full ${meta.barClass} opacity-90 transition-all duration-700 ease-out`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-5 shrink-0 text-right text-xs tabular-nums text-saju-cream/35">
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
}
