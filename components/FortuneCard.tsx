import type { FortuneItem } from "@/lib/fortune-types";
import { FORTUNE_LEVEL_LABELS, FORTUNE_LEVEL_STARS } from "@/lib/fortune-types";

const ICONS: Record<string, string> = {
  "오늘의 운세": "☀",
  연애운: "♥",
  재물운: "◆",
  직업운: "▲",
  건강운: "●",
  총평: "✦",
};

interface FortuneCardProps {
  item: FortuneItem;
  featured?: boolean;
}

export default function FortuneCard({ item, featured = false }: FortuneCardProps) {
  const icon = ICONS[item.title] ?? "◈";

  return (
    <article
      className={`fortune-card ${featured ? "fortune-card-featured" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-saju-gold/20 bg-saju-gold/10 font-serif text-sm text-saju-gold-light">
            {icon}
          </span>
          <div>
            <h3 className="font-serif text-sm font-semibold tracking-wide text-saju-cream">
              {item.title}
            </h3>
            <p className="mt-0.5 text-[0.7rem] text-saju-gold/70">
              {FORTUNE_LEVEL_LABELS[item.level]}
            </p>
          </div>
        </div>
        <span className="shrink-0 text-[0.65rem] tracking-wider text-saju-gold/50">
          {FORTUNE_LEVEL_STARS[item.level]}
        </span>
      </div>

      <p className="mt-3 text-xs font-medium text-saju-gold-light/80">{item.summary}</p>
      <p className="mt-2 text-sm leading-[1.85] text-saju-cream/55">{item.detail}</p>

      <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-saju-gold/60 to-saju-gold transition-all duration-700"
          style={{ width: `${item.level * 20}%` }}
        />
      </div>
    </article>
  );
}
