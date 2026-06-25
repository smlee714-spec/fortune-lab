"use client";

import { useCallback, useState } from "react";

export default function ShareButtons() {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2500);
  }, []);

  function handleKakaoShare() {
    try {
      showToast("카카오톡 공유는 곧 지원됩니다.");
    } catch {
      showToast("공유를 실행할 수 없습니다.");
    }
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("링크가 복사되었습니다.");
    } catch {
      showToast("링크 복사에 실패했습니다.");
    }
  }

  function handleXShare() {
    try {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent("운명랩에서 AI 운세 분석을 받아봤어요!");
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        "_blank",
        "noopener,noreferrer"
      );
    } catch {
      showToast("공유를 실행할 수 없습니다.");
    }
  }

  return (
    <section className="trust-section result-share" aria-labelledby="share-title">
      <h2 id="share-title" className="trust-section-title">
        공유하기
      </h2>
      <div className="share-actions">
        <button type="button" className="share-btn share-btn-kakao" onClick={handleKakaoShare}>
          <span className="share-btn-icon" aria-hidden>
            💬
          </span>
          <span>카카오톡</span>
        </button>
        <button type="button" className="share-btn" onClick={handleCopyLink}>
          <span className="share-btn-icon" aria-hidden>
            🔗
          </span>
          <span>링크 복사</span>
        </button>
        <button type="button" className="share-btn" onClick={handleXShare}>
          <span className="share-btn-icon" aria-hidden>
            𝕏
          </span>
          <span>X</span>
        </button>
      </div>
      {toast && (
        <p className="share-toast" role="status">
          {toast}
        </p>
      )}
    </section>
  );
}
