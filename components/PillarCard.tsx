import { BRANCH_ELEMENTS, STEM_ELEMENTS, ELEMENT_META } from "@/lib/saju";
import type { Pillar } from "@/lib/types";

interface PillarCardProps {
  label: string;
  pillar: Pillar;
  highlight?: boolean;
}

export default function PillarCard({ label, pillar, highlight = false }: PillarCardProps) {
  const stemEl = STEM_ELEMENTS[pillar.stem];
  const branchEl = BRANCH_ELEMENTS[pillar.branch];

  return (
    <div className="text-center">
      <span className="mb-2.5 block text-[0.65rem] font-medium tracking-[0.12em] text-saju-cream/35">
        {label}
      </span>
      <div
        className={`relative overflow-hidden rounded-2xl border px-1 py-4 ${
          highlight
            ? "border-saju-gold/50 bg-gradient-to-b from-saju-gold/10 to-transparent shadow-[0_0_30px_rgba(212,168,83,0.12)]"
            : "border-white/[0.08] bg-white/[0.03]"
        }`}
      >
        {highlight && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-saju-gold/60 to-transparent" />
        )}
        <span
          className={`block font-serif text-2xl font-bold leading-none ${ELEMENT_META[stemEl].className}`}
        >
          {pillar.stem}
        </span>
        <span className="my-1.5 block text-[0.6rem] text-saju-cream/20">·</span>
        <span
          className={`block font-serif text-lg leading-none ${ELEMENT_META[branchEl].className}`}
        >
          {pillar.branch}
        </span>
      </div>
    </div>
  );
}
