"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { generateFullAnalysis } from "@/lib/analysis";
import { fetchGptFortune, mapGptFortuneToDaily } from "@/lib/fortune-api";
import { buildResultLuckMeta, type ResultLuckMeta } from "@/lib/luck-meta";
import { parseResultParams, type ResultQueryParams } from "@/lib/result-routes";
import { calculateSaju } from "@/lib/saju";
import type { DailyFortune } from "@/lib/fortune-types";
import type { FullAnalysis } from "@/lib/analysis/types";

interface SajuResultContextValue {
  params: ResultQueryParams | null;
  result: ReturnType<typeof calculateSaju> | null;
  fortune: DailyFortune | null;
  luckMeta: ResultLuckMeta | null;
  questionAnswer: string | null;
  activeQuestion: string | null;
  analysis: FullAnalysis | null;
  isReady: boolean;
  questionLoading: boolean;
  askQuestion: (question: string) => Promise<void>;
}

const SajuResultContext = createContext<SajuResultContextValue | null>(null);

export function SajuResultProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestIdRef = useRef(0);

  const [fortune, setFortune] = useState<DailyFortune | null>(null);
  const [luckMeta, setLuckMeta] = useState<ResultLuckMeta | null>(null);
  const [questionAnswer, setQuestionAnswer] = useState<string | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [questionLoading, setQuestionLoading] = useState(false);

  const params = useMemo(() => parseResultParams(searchParams), [searchParams]);

  const result = useMemo(() => {
    if (!params) return null;
    return calculateSaju({
      birthDate: params.date,
      birthTime: params.time,
      gender: params.gender,
    });
  }, [params]);

  const analysis = useMemo(() => {
    if (!result) return null;
    return generateFullAnalysis(result);
  }, [result]);

  const askQuestion = useCallback(
    async (question: string) => {
      if (!params || !result) {
        throw new Error("사주 정보가 없어 AI 요청을 보낼 수 없습니다.");
      }

      const requestId = ++requestIdRef.current;
      setQuestionLoading(true);

      try {
        const data = await fetchGptFortune({
          date: params.date,
          time: params.time,
          gender: params.gender,
          mbti: params.mbti,
          question,
        });

        if (requestId !== requestIdRef.current) return;

        setFortune(mapGptFortuneToDaily(data));
        setLuckMeta(buildResultLuckMeta(result, data.summary));
        setQuestionAnswer(data.questionAnswer);
        setActiveQuestion(question);
      } catch (error) {
        if (requestId !== requestIdRef.current) return;

        const message =
          error instanceof Error
            ? error.message
            : "운세를 불러오는 중 오류가 발생했습니다.";
        throw new Error(message);
      } finally {
        if (requestId !== requestIdRef.current) return;
        setQuestionLoading(false);
      }
    },
    [params, result]
  );

  useEffect(() => {
    if (!params) router.replace("/");
  }, [params, router]);

  const value = useMemo<SajuResultContextValue>(
    () => ({
      params,
      result,
      fortune,
      luckMeta,
      questionAnswer,
      activeQuestion,
      analysis,
      isReady: !!(params && result && analysis),
      questionLoading,
      askQuestion,
    }),
    [
      params,
      result,
      fortune,
      luckMeta,
      questionAnswer,
      activeQuestion,
      analysis,
      questionLoading,
      askQuestion,
    ]
  );

  return (
    <SajuResultContext.Provider value={value}>{children}</SajuResultContext.Provider>
  );
}

export function useSajuResult(): SajuResultContextValue {
  const context = useContext(SajuResultContext);
  if (!context) {
    throw new Error("useSajuResult must be used within SajuResultProvider");
  }
  return context;
}
