"use client";

import type { ResultMode } from "@/lib/result-modes";

interface ResultModeToggleProps {
  mode: ResultMode;
  onChange: (mode: ResultMode) => void;
}

export default function ResultModeToggle({ mode, onChange }: ResultModeToggleProps) {
  return (
    <div className="result-mode-toggle" role="tablist" aria-label="결과 보기 모드">
      <button
        type="button"
        role="tab"
        aria-selected={mode === "general"}
        className={`result-mode-btn ${mode === "general" ? "is-active" : ""}`}
        onClick={() => onChange("general")}
      >
        일반 모드
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === "expert"}
        className={`result-mode-btn ${mode === "expert" ? "is-active" : ""}`}
        onClick={() => onChange("expert")}
      >
        전문가 모드
      </button>
    </div>
  );
}
