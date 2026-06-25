import type { ResultLuckMeta } from "@/lib/luck-meta";

interface TodayLuckPanelProps {
  luck: ResultLuckMeta;
}

export default function TodayLuckPanel({ luck }: TodayLuckPanelProps) {
  const items = [
    {
      label: "행운색",
      value: luck.luckyColor.name,
      extra: (
        <span
          className="luck-color-dot"
          style={{ backgroundColor: luck.luckyColor.hex }}
          aria-hidden
        />
      ),
    },
    {
      label: "행운숫자",
      value: luck.luckyNumbers.join(", "),
    },
    {
      label: "행운방향",
      value: luck.luckyDirection,
    },
    {
      label: "행운시간",
      value: luck.luckyTime,
    },
  ];

  return (
    <section className="today-luck-panel" aria-labelledby="today-luck-title">
      <h2 id="today-luck-title" className="section-title-sm">
        오늘의 행운
      </h2>
      <div className="today-luck-grid">
        {items.map((item) => (
          <div key={item.label} className="today-luck-item">
            <p className="today-luck-label">{item.label}</p>
            <p className="today-luck-value">
              {item.extra}
              <span>{item.value}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
