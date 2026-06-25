"use client";

import { useEffect } from "react";

interface AdCompleteModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AdCompleteModal({ open, onClose }: AdCompleteModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="premium-modal-root" role="presentation" onClick={onClose}>
      <div
        className="premium-modal animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ad-complete-title"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-3xl" aria-hidden>
          ✓
        </p>
        <h2 id="ad-complete-title" className="premium-modal-title mt-4">
          광고 시청이 완료되었습니다
        </h2>
        <p className="premium-modal-desc">
          AI 심층 분석 1회 이용이 가능합니다.
        </p>
        <button type="button" className="btn-primary mt-6" onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
}
