/** 화면 배경 장식 — 은은한 동양풍 + 별빛 */
export default function OrientalBackdrop() {
  const stars = [
    [12, 8, 1.2, 0.35],
    [28, 14, 0.8, 0.25],
    [45, 6, 1, 0.3],
    [62, 18, 0.7, 0.2],
    [78, 10, 1.1, 0.28],
    [88, 24, 0.6, 0.22],
    [18, 32, 0.9, 0.18],
    [55, 28, 0.8, 0.24],
    [72, 36, 1, 0.2],
    [35, 42, 0.7, 0.16],
    [8, 55, 0.8, 0.14],
    [92, 48, 0.9, 0.18],
  ] as const;

  return (
    <div className="oriental-backdrop pointer-events-none fixed inset-x-0 top-0 z-0 mx-auto h-full">
      <div className="app-shell-bg bg-hanji absolute inset-x-0 top-0 mx-auto h-full" />
      <div className="app-shell-bg bg-ink-wash absolute inset-x-0 top-0 mx-auto h-full" />

      {/* 은은한 별빛 */}
      <svg
        className="app-shell-bg absolute inset-x-0 top-0 mx-auto h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        {stars.map(([cx, cy, r, opacity], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="#e8c872"
            opacity={opacity}
            style={{ animation: `starTwinkle ${2.5 + (i % 3)}s ease-in-out ${i * 0.3}s infinite` }}
          />
        ))}
      </svg>

      <svg
        className="app-shell-bg absolute inset-x-0 top-0 mx-auto h-48 w-full text-saju-gold opacity-[0.035]"
        viewBox="0 0 400 120"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <path fill="currentColor" d="M0 80 Q60 40 120 70 T240 60 T400 75 V120 H0 Z" />
        <path
          fill="currentColor"
          opacity="0.6"
          d="M40 95 Q100 55 180 85 T320 70 T400 90 V120 H40 Z"
        />
      </svg>

      <svg
        className="absolute right-[8%] top-[6%] h-28 w-28 opacity-[0.16] md:right-[12%]"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <g stroke="#d4a853" strokeWidth="0.6" fill="none" opacity="0.5">
          <path d="M20 25 L35 40 L50 35 L65 50 L80 30" />
        </g>
        {[
          [20, 25],
          [35, 40],
          [50, 35],
          [65, 50],
          [80, 30],
          [72, 18],
          [88, 42],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={i === 4 ? 2.2 : 1.6}
            fill="#e8c872"
            opacity={i === 4 ? 0.9 : 0.55}
          />
        ))}
      </svg>

      <svg
        className="absolute left-[10%] top-[22%] h-16 w-16 opacity-[0.1]"
        viewBox="0 0 60 60"
        aria-hidden
      >
        <circle cx="10" cy="15" r="1" fill="#d4a853" />
        <circle cx="28" cy="8" r="0.8" fill="#d4a853" />
        <circle cx="45" cy="20" r="1.2" fill="#e8c872" />
        <circle cx="35" cy="35" r="0.7" fill="#d4a853" />
        <path
          d="M10 15 L28 8 L45 20 L35 35"
          stroke="#d4a853"
          strokeWidth="0.4"
          fill="none"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}
