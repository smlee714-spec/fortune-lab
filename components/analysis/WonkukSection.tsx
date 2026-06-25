import { ELEMENT_META } from "@/lib/saju";
import type { WonkukAnalysis } from "@/lib/analysis/types";

interface WonkukSectionProps {
  data: WonkukAnalysis;
}

export default function WonkukSection({ data }: WonkukSectionProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-black/25">
      <table className="w-full min-w-[320px] border-collapse text-center text-sm">
        <thead>
          <tr className="border-b border-white/[0.08]">
            <th className="px-2 py-3 text-[0.65rem] font-medium text-saju-cream/35">구분</th>
            {data.pillars.map((p) => (
              <th
                key={p.label}
                className={`px-2 py-3 font-serif text-xs font-semibold ${
                  p.label === "일주" ? "text-saju-gold-light" : "text-saju-cream/70"
                }`}
              >
                {p.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-white/[0.06]">
            <td className="px-2 py-3 text-[0.65rem] text-saju-gold/60">천간</td>
            {data.pillars.map((p) => (
              <td key={`stem-${p.label}`} className="px-2 py-3">
                <span className={`font-serif text-xl font-bold ${ELEMENT_META[p.stem.element].className}`}>
                  {p.stem.char}
                </span>
                <span className="mt-1 block text-[0.6rem] text-saju-cream/35">{p.stem.element}</span>
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-2 py-3 text-[0.65rem] text-saju-gold/60">지지</td>
            {data.pillars.map((p) => (
              <td key={`branch-${p.label}`} className="px-2 py-3">
                <span className={`font-serif text-lg font-semibold ${ELEMENT_META[p.branch.element].className}`}>
                  {p.branch.char}
                </span>
                <span className="mt-1 block text-[0.6rem] text-saju-cream/35">{p.branch.element}</span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
