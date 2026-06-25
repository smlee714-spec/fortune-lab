"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { generateFullAnalysis } from "@/lib/analysis";
import { fetchGptFortune, mapGptFortuneToDaily } from "@/lib/fortune-api";
import { buildResultLuckMeta, type ResultLuckMeta } from "@/lib/luck-meta";
import { parseResultParams, type ResultQueryParams } from "@/lib/result-routes";
import { calculateSaju } from "@/lib/saju";
import type { DailyFortune } from "@/lib/fortune-types";
import type { FullAnalysis } from "@/lib/analysis/types";

interface UseSajuResultReturn {
  params: ResultQueryParams | null;
  result: ReturnType<typeof calculateSaju> | null;
  fortune: DailyFortune | null;
  luckMeta: ResultLuckMeta | null;
  premiumPreview: string | null;
  analysis: FullAnalysis | null;
  isReady: boolean;
  fortuneLoading: boolean;
  fortuneError: string | null;
  refetchFortune: () => void;
}

export function useSajuResult(): UseSajuResultReturn {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [fortune, setFortune] = useState<DailyFortune | null>(null);
  const [luckMeta, setLuckMeta] = useState<ResultLuckMeta | null>(null);
  const [premiumPreview, setPremiumPreview] = useState<string | null>(null);
  const [fortuneLoading, setFortuneLoading] = useState(false);
  const [fortuneError, setFortuneError] = useState<string | null>(null);
  const [fetchKey, setFetchKey] = useState(0);

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

  const refetchFortune = useCallback(() => {
    setFetchKey((key) => key + 1);
  }, []);

  useEffect(() => {
    if (!params) router.replace("/");
  }, [params, router]);

  useEffect(() => {
    if (!params || !result) return;

    const requestParams = params;
    const sajuResult = result;
    let cancelled = false;

    async function loadFortune() {
      setFortuneLoading(true);
      setFortuneError(null);
      setFortune(null);
      setLuckMeta(null);
      setPremiumPreview(null);

      try {
        const data = await fetchGptFortune({
          date: requestParams.date,
          time: requestParams.time,
          gender: requestParams.gender,
        });

        if (cancelled) return;

        setFortune(mapGptFortuneToDaily(data));
        setLuckMeta(buildResultLuckMeta(sajuResult, data.summary));
        setPremiumPreview(data.premiumPreview);
      } catch (error) {
        if (cancelled) return;

        const message =
          error instanceof Error
            ? error.message
            : "운세를 불러오는 중 오류가 발생했습니다.";
        setFortuneError(message);
      } finally {
        if (!cancelled) {
          setFortuneLoading(false);
        }
      }
    }

    void loadFortune();

    return () => {
      cancelled = true;
    };
  }, [params, result, fetchKey]);

  return {
    params,
    result,
    fortune,
    luckMeta,
    premiumPreview,
    analysis,
    isReady: !!(params && result && analysis),
    fortuneLoading,
    fortuneError,
    refetchFortune,
  };
}
