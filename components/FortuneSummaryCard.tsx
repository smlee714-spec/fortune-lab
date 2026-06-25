import type { FortuneItem } from "@/lib/fortune-types";
import { FORTUNE_LEVEL_LABELS } from "@/lib/fortune-types";

const ICONS: Record<string, string> = {
  "오늘의 총평": "✦",
  총평: "✦",
  연애운: "♥",
  재물운: "◆",
  직업운: "▲",
  건강운: "●",
};

interface FortuneSummaryCardProps {
  item: FortuneItem;
  displayTitle?: string;
  featured?: boolean;
}

export default function FortuneSummaryCard({
  item,
  displayTitle,
  featured = false,
}: FortuneSummaryCardProps) {
  const title = displayTitle ?? item.title;
  const icon = ICONS[title] ?? ICONS[item.title] ?? "◈";

  return (
    <article
      className={`lux-card relative z-[1] ${featured ? "lux-card-featured" : ""}`}
    >
      <div className="relative flex items-start gap-3.5">
        <span className="lux-chip h-9 w-9 text-xs">{icon}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-serif text-sm font-medium tracking-wide text-saju-cream">
              {title}
            </h3>
            <span className="shrink-0 text-[0.62rem] tracking-wider text-saju-gold/60">
              {FORTUNE_LEVEL_LABELS[item.level]}
            </span>
          </div>
          <p className="mt-2 text-xs leading-[1.85] text-saju-cream-dim/80">{item.detail}</p>
        </div>
      </div>
    </article>
  );
}
