"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { generateFullAnalysis } from "@/lib/analysis";
import { generateDailyFortune } from "@/lib/fortune";
import { parseResultParams, type ResultQueryParams } from "@/lib/result-routes";
import { calculateSaju } from "@/lib/saju";
import type { SajuResult } from "@/lib/types";
import type { DailyFortune } from "@/lib/fortune-types";
import type { FullAnalysis } from "@/lib/analysis/types";

interface UseSajuResultReturn {
  params: ResultQueryParams | null;
  result: SajuResult | null;
  fortune: DailyFortune | null;
  analysis: FullAnalysis | null;
  isReady: boolean;
}

export function useSajuResult(): UseSajuResultReturn {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = useMemo(() => parseResultParams(searchParams), [searchParams]);

  const result = useMemo(() => {
    if (!params) return null;
    return calculateSaju({
      birthDate: params.date,
      birthTime: params.time,
      gender: params.gender,
    });
  }, [params]);

  const fortune = useMemo(() => {
    if (!result) return null;
    return generateDailyFortune(result);
  }, [result]);

  const analysis = useMemo(() => {
    if (!result) return null;
    return generateFullAnalysis(result);
  }, [result]);

  useEffect(() => {
    if (!params) router.replace("/");
  }, [params, router]);

  return {
    params,
    result,
    fortune,
    analysis,
    isReady: !!(params && result && fortune && analysis),
  };
}
