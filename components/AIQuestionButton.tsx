"use client";

import { useState } from "react";
import { AI_SAMPLE_QUESTIONS } from "@/lib/analysis/types";

export default function AIQuestionButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function handleQuestion(question: string) {
    setMessage(`"${question}" — AI 분석 기능은 준비 중입니다. 곧 만나보실 수 있어요!`);
  }

  return (
    <div className="space-y-3">
      <button type="button" onClick={() => setOpen((v) => !v)} className="btn-ai-question">
        <span className="font-serif text-[0.95rem] font-medium tracking-[0.1em] text-saju-gold-light">
          AI에게 질문하기
        </span>
        <span className="mt-1.5 block text-[0.65rem] font-light text-saju-cream-dim/70">
          사주 기반 맞춤 상담
        </span>
      </button>

      {open && (
        <div className="lux-card relative z-[1] animate-fade-in p-5">
          <p className="lux-caption mb-4 text-center">SELECT</p>
          <div className="flex flex-col gap-2">
            {AI_SAMPLE_QUESTIONS.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => handleQuestion(question)}
                className="rounded-sm border border-saju-gold/10 bg-saju-ink/50 px-4 py-3.5 text-left text-sm font-light text-saju-cream-dim transition-colors duration-lux hover:border-saju-gold/20 hover:text-saju-cream"
              >
                {question}
              </button>
            ))}
          </div>
          {message && (
            <p className="mt-4 border border-saju-gold/15 bg-saju-gold/[0.05] px-4 py-3 text-center text-xs font-light leading-relaxed text-saju-gold-light">
              {message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
