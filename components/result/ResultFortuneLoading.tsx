export default function ResultFortuneLoading() {
  return (
    <div className="fortune-state fortune-state-loading fortune-state-golden" role="status" aria-live="polite">
      <div className="golden-orbit" aria-hidden>
        <span className="golden-orbit-ring" />
        <span className="golden-orbit-core">命</span>
      </div>
      <p className="fortune-state-message">운명을 분석하는 중...</p>
      <p className="fortune-state-sub">AI가 당신의 사주를 읽고 있습니다</p>
    </div>
  );
}
