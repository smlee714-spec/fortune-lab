"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AI_EXAMPLE_QUESTIONS,
  AI_LOADING_DURATION_MS,
  AI_LOADING_MESSAGE,
  getSampleAIAnswer,
} from "@/lib/ai-question";

interface AskAIPanelProps {
  className?: string;
}

export default function AskAIPanel({ className = "" }: AskAIPanelProps) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [askedQuestion, setAskedQuestion] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function resetAnswer() {
    setAnswer(null);
    setAskedQuestion(null);
  }

  function askAI(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    try {
      setQuestion(trimmed);
      setIsLoading(true);
      resetAnswer();

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        try {
          setAnswer(getSampleAIAnswer(trimmed));
          setAskedQuestion(trimmed);
        } catch (error) {
          console.error("AI 답변 생성 중 오류:", error);
          setAnswer(
            "잠시 후 다시 시도해 주세요. 참고용 샘플 답변을 준비 중입니다."
          );
        } finally {
          setIsLoading(false);
          timerRef.current = null;
        }
      }, AI_LOADING_DURATION_MS);
    } catch (error) {
      console.error("AI 질문 처리 중 오류:", error);
      setIsLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    askAI(question);
  }

  function handleExampleClick(example: string) {
    setQuestion(example);
    askAI(example);
  }

  function handleToggle() {
    setOpen((prev) => {
      if (prev) {
        setIsLoading(false);
        resetAnswer();
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      }
      return !prev;
    });
  }

  return (
    <section className={`ask-ai-section ${className}`.trim()} aria-label="AI에게 질문하기">
      {!open ? (
        <button type="button" className="btn-ask-ai" onClick={handleToggle}>
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
            <button type="button" className="ask-ai-close" onClick={handleToggle} aria-label="닫기">
              ✕
            </button>
          </div>

          <p className="ask-ai-panel-desc">
            궁금한 점을 입력하거나 예시 질문을 선택해 보세요.
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
              onChange={(e) => {
                setQuestion(e.target.value);
                if (answer) resetAnswer();
              }}
              disabled={isLoading}
            />
            <button type="submit" className="btn-primary ask-ai-submit" disabled={isLoading || !question.trim()}>
              질문하기
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

          {!isLoading && answer && (
            <div className="ask-ai-answer animate-fade-in">
              {askedQuestion && (
                <p className="ask-ai-answer-question">&ldquo;{askedQuestion}&rdquo;</p>
              )}
              <p className="ask-ai-answer-body">{answer}</p>
              <p className="ask-ai-answer-note">※ 참고용 샘플 답변입니다.</p>
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
