"use client";

import { useCallback, useEffect, useState } from "react";
import { getAdRewards } from "@/lib/premium/entitlements-client";
import type { AdRewardState } from "@/lib/premium/entitlements-client";
import type { PremiumStatusResponse } from "@/lib/premium/types";

const defaultStatus: PremiumStatusResponse = {
  isPremium: false,
  hasDeepAnalysis: false,
  subscription: null,
  deepAnalysis: null,
};

export function usePremium() {
  const entitlements = useEntitlements();
  return {
    isPremium: entitlements.isPremium,
    subscription: entitlements.subscription,
    loading: entitlements.loading,
    refresh: entitlements.refresh,
  };
}

export function useEntitlements() {
  const [status, setStatus] = useState<PremiumStatusResponse>(defaultStatus);
  const [adRewards, setAdRewards] = useState<AdRewardState | null>(null);
  const [loading, setLoading] = useState(true);

  const syncAdRewards = useCallback(() => {
    setAdRewards(getAdRewards());
  }, []);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/premium/status", { cache: "no-store" });
      if (!response.ok) {
        setStatus(defaultStatus);
      } else {
        const data = (await response.json()) as PremiumStatusResponse;
        setStatus(data);
      }
    } catch {
      setStatus(defaultStatus);
    } finally {
      syncAdRewards();
      setLoading(false);
    }
  }, [syncAdRewards]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    isPremium: status.isPremium,
    hasDeepAnalysis: status.hasDeepAnalysis,
    hasPaidDeepAnalysis: status.deepAnalysis !== null,
    subscription: status.subscription,
    deepAnalysis: status.deepAnalysis,
    adRewards,
    loading,
    refresh,
    syncAdRewards,
  };
}
