import type { SinStrengthAnalysis } from "@/lib/analysis/types";

interface SinStrengthSectionProps {
  data: SinStrengthAnalysis;
}

const TYPE_STYLE: Record<string, string> = {
  신강: "border-saju-fire/30 bg-saju-fire/10 text-saju-fire",
  신약: "border-saju-water/30 bg-saju-water/10 text-saju-water",
  중화: "border-saju-gold/30 bg-saju-gold/10 text-saju-gold-light",
};

export default function SinStrengthSection({ data }: SinStrengthSectionProps) {
  const areas = [
    { label: "성격", value: data.personality },
    { label: "일·직업", value: data.work },
    { label: "돈·재물", value: data.money },
    { label: "인간관계", value: data.relationship },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-3">
        <span
          className={`rounded-2xl border px-6 py-3 font-serif text-xl font-bold ${TYPE_STYLE[data.type]}`}
        >
          {data.type}
        </span>
      </div>
      <p className="text-center text-xs text-saju-cream/45">{data.summary}</p>

      <div className="grid gap-2">
        {areas.map((area) => (
          <div
            key={area.label}
            className="rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3"
          >
            <p className="mb-1 text-[0.65rem] font-semibold text-saju-gold/70">{area.label}</p>
            <p className="text-xs leading-[1.8] text-saju-cream/55">{area.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
