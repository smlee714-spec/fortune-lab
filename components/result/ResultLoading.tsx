import MobileShell from "@/components/MobileShell";

export default function ResultLoading() {
  return (
    <MobileShell>
      <main className="flex min-h-dvh items-center justify-center responsive-page">
        <div className="fortune-state fortune-state-loading fortune-state-golden" role="status">
          <div className="golden-orbit" aria-hidden>
            <span className="golden-orbit-ring" />
            <span className="golden-orbit-core">命</span>
          </div>
          <p className="fortune-state-message">운명을 분석하는 중...</p>
        </div>
      </main>
    </MobileShell>
  );
}
