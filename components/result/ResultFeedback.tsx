"use client";

import { useState } from "react";

type FeedbackValue = "positive" | "negative" | null;

export default function ResultFeedback() {
  const [feedback, setFeedback] = useState<FeedbackValue>(null);

  if (feedback) {
    return (
      <section className="trust-section result-feedback" aria-live="polite">
        <p className="result-feedback-thanks">
          {feedback === "positive"
            ? "소중한 의견 감사합니다! 더 나은 운명랩이 되겠습니다."
            : "아쉬운 점을 알려주셔서 감사합니다. 더 개선하겠습니다."}
        </p>
      </section>
    );
  }

  return (
    <section className="trust-section result-feedback" aria-labelledby="feedback-title">
      <h2 id="feedback-title" className="trust-section-title">
        이 분석이 도움이 되었나요?
      </h2>
      <div className="feedback-actions">
        <button
          type="button"
          className="feedback-btn feedback-btn-positive"
          onClick={() => setFeedback("positive")}
        >
          <span aria-hidden>👍</span>
          <span>도움이 되었어요</span>
        </button>
        <button
          type="button"
          className="feedback-btn feedback-btn-negative"
          onClick={() => setFeedback("negative")}
        >
          <span aria-hidden>👎</span>
          <span>아쉬웠어요</span>
        </button>
      </div>
    </section>
  );
}
