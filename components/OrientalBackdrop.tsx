/** 화면 배경 장식 — 은은한 동양풍 요소 (명품 브랜드 톤) */
export default function OrientalBackdrop() {
  return (
    <div className="oriental-backdrop pointer-events-none fixed inset-x-0 top-0 z-0 mx-auto h-full">
      {/* 한지 + 먹물 번짐 */}
      <div className="app-shell-bg bg-hanji absolute inset-x-0 top-0 mx-auto h-full" />
      <div className="app-shell-bg bg-ink-wash absolute inset-x-0 top-0 mx-auto h-full" />

      {/* 구름 */}
      <svg
        className="app-shell-bg absolute inset-x-0 top-0 mx-auto h-48 w-full text-saju-gold opacity-[0.035]"
        viewBox="0 0 400 120"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0 80 Q60 40 120 70 T240 60 T400 75 V120 H0 Z"
        />
        <path
          fill="currentColor"
          opacity="0.6"
          d="M40 95 Q100 55 180 85 T320 70 T400 90 V120 H40 Z"
        />
      </svg>

      {/* 북두칠성 */}
      <svg
        className="absolute right-[8%] top-[6%] h-28 w-28 opacity-[0.14] md:right-[12%]"
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

      {/* 작은 별자리 */}
      <svg
        className="absolute left-[10%] top-[22%] h-16 w-16 opacity-[0.08]"
        viewBox="0 0 60 60"
        aria-hidden
      >
        <circle cx="10" cy="15" r="1" fill="#d4a853" />
        <circle cx="28" cy="8" r="0.8" fill="#d4a853" />
        <circle cx="45" cy="20" r="1.2" fill="#e8c872" />
        <circle cx="35" cy="35" r="0.7" fill="#d4a853" />
        <path d="M10 15 L28 8 L45 20 L35 35" stroke="#d4a853" strokeWidth="0.4" fill="none" opacity="0.4" />
      </svg>

      {/* 음양 — 좌하단 포인트 */}
      <svg
        className="absolute bottom-[18%] left-[6%] h-8 w-8 opacity-[0.07]"
        viewBox="0 0 32 32"
        aria-hidden
      >
        <circle cx="16" cy="16" r="15" fill="none" stroke="#d4a853" strokeWidth="0.5" />
        <path
          d="M16 1 A15 15 0 0 1 16 31 A7.5 7.5 0 0 0 16 16 A7.5 7.5 0 0 1 16 1Z"
          fill="#d4a853"
        />
        <circle cx="16" cy="8.5" r="1.2" fill="#0c0c16" />
        <circle cx="16" cy="23.5" r="1.2" fill="#d4a853" />
      </svg>

      {/* 음양 — 우상단 포인트 */}
      <svg
        className="absolute right-[7%] top-[38%] h-5 w-5 opacity-[0.05]"
        viewBox="0 0 32 32"
        aria-hidden
      >
        <circle cx="16" cy="16" r="15" fill="none" stroke="#d4a853" strokeWidth="0.5" />
        <path
          d="M16 1 A15 15 0 0 1 16 31 A7.5 7.5 0 0 0 16 16 A7.5 7.5 0 0 1 16 1Z"
          fill="#d4a853"
        />
      </svg>
    </div>
  );
}
