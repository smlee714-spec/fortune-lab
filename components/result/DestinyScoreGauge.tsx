interface DestinyScoreGaugeProps {
  score: number;
  starCount: number;
}

export default function DestinyScoreGauge({ score, starCount }: DestinyScoreGaugeProps) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(100, Math.max(0, score)) / 100;
  const dashOffset = circumference * (1 - progress);
  const stars = "★".repeat(starCount) + "☆".repeat(5 - starCount);

  return (
    <div className="destiny-gauge" aria-label={`운명 점수 ${score}점`}>
      <div className="destiny-gauge-ring">
        <svg viewBox="0 0 128 128" className="destiny-gauge-svg" aria-hidden>
          <circle
            cx="64"
            cy="64"
            r={radius}
            className="destiny-gauge-track"
            fill="none"
            strokeWidth="6"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            className="destiny-gauge-progress"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 64 64)"
          />
        </svg>
        <div className="destiny-gauge-center">
          <p className="destiny-gauge-label">운명 점수</p>
          <p className="destiny-gauge-score">{score}</p>
          <p className="destiny-gauge-unit">점</p>
        </div>
      </div>
      <p className="destiny-gauge-stars" aria-label={`${starCount}점 만점 중 ${starCount}개 별`}>
        {stars}
      </p>
    </div>
  );
}
