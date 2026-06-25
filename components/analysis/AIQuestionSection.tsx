"use client";

import { useState } from "react";
import { AI_SAMPLE_QUESTIONS } from "@/lib/analysis/types";

export default function AIQuestionSection() {
  const [message, setMessage] = useState<string | null>(null);

  function handleQuestion(question: string) {
    setMessage(`"${question}" — AI 분석 기능은 준비 중입니다. 곧 만나보실 수 있어요!`);
  }

  return (
    <section className="analysis-card border-saju-gold/15 bg-gradient-to-br from-black/40 to-saju-gold/[0.05]">
      <div className="mb-4 text-center">
        <p className="text-[0.65rem] font-medium tracking-[0.2em] text-saju-gold/60">AI CONSULT</p>
        <h3 className="mt-1 font-serif text-base font-bold text-saju-cream">
          내 사주로 AI에게 질문하기
        </h3>
        <p className="mt-2 text-xs text-saju-cream/40">
          사주 결과를 바탕으로 AI가 맞춤 답변을 드립니다
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {AI_SAMPLE_QUESTIONS.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => handleQuestion(question)}
            className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-left text-xs text-saju-cream/60 transition active:border-saju-gold/30 active:bg-saju-gold/10 active:text-saju-gold-light"
          >
            {question}
          </button>
        ))}
      </div>

      {message && (
        <div className="mt-4 rounded-xl border border-saju-gold/20 bg-saju-gold/[0.08] px-4 py-3 text-center text-xs leading-relaxed text-saju-gold-light">
          {message}
        </div>
      )}
    </section>
  );
}
