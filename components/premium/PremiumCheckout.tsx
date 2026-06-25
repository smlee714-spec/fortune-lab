"use client";

import PremiumPaymentButton from "./PremiumPaymentButton";
import { usePremium } from "@/hooks/usePremium";
import type { PremiumPlanId } from "@/lib/premium/types";

interface PremiumCheckoutProps {
  planId: PremiumPlanId;
  label?: string;
}

export default function PremiumCheckout({
  planId,
  label = "💎 Premium 시작하기",
}: PremiumCheckoutProps) {
  const { isPremium, loading } = usePremium();

  if (loading) {
    return (
      <button type="button" className="btn-primary w-full" disabled>
        확인 중...
      </button>
    );
  }

  if (isPremium) {
    return (
      <p className="premium-active-badge" role="status">
        ✦ Premium 이용 중
      </p>
    );
  }

  return <PremiumPaymentButton planId={planId}>{label}</PremiumPaymentButton>;
}
