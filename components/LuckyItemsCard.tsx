interface LuckyItemsCardProps {
  numbers: number[];
  color: {
    name: string;
    hex: string;
    meaning: string;
  };
}

export default function LuckyItemsCard({ numbers, color }: LuckyItemsCardProps) {
  return (
    <article className="fortune-card fortune-card-lucky">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="mb-3 text-[0.7rem] font-semibold tracking-[0.12em] text-saju-gold/70">
            행운의 숫자
          </p>
          <div className="flex flex-wrap gap-2">
            {numbers.map((num) => (
              <span
                key={num}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-saju-gold/25 bg-saju-gold/10 font-serif text-base font-bold text-saju-gold-light"
              >
                {num}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-[0.7rem] font-semibold tracking-[0.12em] text-saju-gold/70">
            행운의 색
          </p>
          <div className="flex items-center gap-3">
            <span
              className="h-10 w-10 shrink-0 rounded-xl border border-white/10 shadow-inner"
              style={{ backgroundColor: color.hex }}
            />
            <div>
              <p className="font-serif text-sm font-semibold text-saju-cream">{color.name}</p>
              <p className="mt-0.5 text-[0.65rem] leading-snug text-saju-cream/40">
                {color.meaning}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
