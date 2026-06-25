"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AI_EXAMPLE_QUESTIONS, AI_LOADING_MESSAGE } from "@/lib/ai-question";
import type { FortuneApiRequest } from "@/lib/fortune-api-types";

/** 결과 페이지 전용 — Home에서는 사용하지 않습니다. */
interface ResultAskAIPanelProps {
  className?: string;
  fortuneParams: Pick<FortuneApiRequest, "date" | "time" | "gender" | "mbti">;
  onAskQuestion: (question: string) => Promise<void>;
  questionLoading?: boolean;
  initialAnswer?: string | null;
  initialQuestion?: string | null;
}

export default function ResultAskAIPanel({
  className = "",
  fortuneParams,
  onAskQuestion,
  questionLoading = false,
  initialAnswer = null,
  initialQuestion = null,
}: ResultAskAIPanelProps) {
  void fortuneParams;
  const [isAiModalOpen, setIsAiModalOpen] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(initialAnswer);
  const [askedQuestion, setAskedQuestion] = useState<string | null>(initialQuestion);
  const [error, setError] = useState<string | null>(null);
  const prevInitialAnswer = useRef(initialAnswer);
  const prevInitialQuestion = useRef(initialQuestion);

  const isLoading = questionLoading;

  useEffect(() => {
    if (initialAnswer !== prevInitialAnswer.current) {
      setAnswer(initialAnswer);
      prevInitialAnswer.current = initialAnswer;
      setError(null);
    }
    if (initialQuestion !== prevInitialQuestion.current) {
      setAskedQuestion(initialQuestion);
      prevInitialQuestion.current = initialQuestion;
    }
  }, [initialAnswer, initialQuestion]);

  async function askAI(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setQuestion(trimmed);
    setAskedQuestion(trimmed);
    setError(null);

    try {
      await onAskQuestion(trimmed);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "질문 처리 중 오류가 발생했습니다.";
      setError(message);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void askAI(question);
  }

  function handleExampleClick(example: string) {
    setQuestion(example);
    setError(null);
  }

  return (
    <section
      className={`ask-ai-section ${className}`.trim()}
      aria-label="AI 운세 질문"
    >
      {!isAiModalOpen ? (
        <button
          type="button"
          className="btn-ask-ai"
          onClick={() => setIsAiModalOpen(true)}
        >
          <span className="btn-ask-ai-icon" aria-hidden>
            ✦
          </span>
          <span className="btn-ask-ai-text">
            <span className="btn-ask-ai-label">AI에게 질문하기</span>
            <span className="btn-ask-ai-desc">사주 기반 맞춤 AI 상담</span>
          </span>
        </button>
      ) : (
        <div className="ask-ai-panel animate-fade-in">
          <div className="ask-ai-panel-head">
            <h2 className="ask-ai-panel-title">AI에게 질문하기</h2>
            <button
              type="button"
              className="ask-ai-close"
              onClick={() => setIsAiModalOpen(false)}
              aria-label="닫기"
            >
              ✕
            </button>
          </div>

          <p className="ask-ai-panel-desc">
            궁금한 점을 입력하고 질문하기를 눌러 주세요.
          </p>

          <form onSubmit={handleSubmit} className="ask-ai-form">
            <label htmlFor="ai-question-input" className="sr-only">
              질문 입력
            </label>
            <textarea
              id="ai-question-input"
              className="ask-ai-input"
              rows={3}
              placeholder="예: 올해 이직해도 괜찮을까요?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="btn-primary ask-ai-submit"
              disabled={isLoading || !question.trim()}
            >
              {isLoading ? "분석 중..." : "질문하기"}
            </button>
          </form>

          <div className="ask-ai-examples">
            <p className="ask-ai-examples-label">예시 질문</p>
            <div className="ask-ai-example-list">
              {AI_EXAMPLE_QUESTIONS.map((example) => (
                <button
                  key={example}
                  type="button"
                  className="ask-ai-example-btn"
                  onClick={() => handleExampleClick(example)}
                  disabled={isLoading}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {isLoading && (
            <div className="ask-ai-loading" role="status" aria-live="polite">
              <div className="golden-orbit ask-ai-loading-orbit" aria-hidden>
                <span className="golden-orbit-ring" />
                <span className="golden-orbit-core">命</span>
              </div>
              <p className="ask-ai-loading-text">{AI_LOADING_MESSAGE}</p>
            </div>
          )}

          {!isLoading && error && (
            <p className="ask-ai-error" role="alert">
              {error}
            </p>
          )}

          {!isLoading && !error && (answer ?? initialAnswer) && (
            <div className="ask-ai-answer animate-fade-in">
              {(askedQuestion ?? initialQuestion) && (
                <p className="ask-ai-answer-question">
                  &ldquo;{askedQuestion ?? initialQuestion}&rdquo;
                </p>
              )}
              <p className="ask-ai-answer-body">{answer ?? initialAnswer}</p>
              <Link href="/premium" className="ask-ai-premium-cta">
                더 깊은 AI 상담은 Premium에서 이용할 수 있어요
              </Link>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
