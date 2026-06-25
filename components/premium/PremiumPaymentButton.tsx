"use client";

import { useState } from "react";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { getOrCreateCustomerKey } from "@/lib/premium/customer-key";
import type { PremiumPlanId, PreparePaymentResponse } from "@/lib/premium/types";

interface PremiumPaymentButtonProps {
  planId: PremiumPlanId;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  variant?: "default" | "card";
  cardTone?: "deep" | "premium";
}

export default function PremiumPaymentButton({
  planId,
  className = "btn-primary w-full",
  children,
  disabled = false,
  variant = "default",
  cardTone = "deep",
}: PremiumPaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cardClassName =
    cardTone === "premium"
      ? "upgrade-card upgrade-card--premium"
      : "upgrade-card upgrade-card--deep";

  async function handlePayment() {
    if (disabled || loading) return;

    setLoading(true);
    setError(null);

    try {
      const customerKey = getOrCreateCustomerKey();

      const prepareResponse = await fetch("/api/payments/prepare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, customerKey }),
      });

      const prepareData = (await prepareResponse.json()) as PreparePaymentResponse & {
        error?: string;
      };

      if (!prepareResponse.ok) {
        throw new Error(prepareData.error ?? "결제 준비에 실패했습니다.");
      }

      const tossPayments = await loadTossPayments(prepareData.clientKey);
      const payment = tossPayments.payment({ customerKey: prepareData.customerKey });

      await payment.requestPayment({
        method: "CARD",
        amount: {
          currency: "KRW",
          value: prepareData.amount,
        },
        orderId: prepareData.orderId,
        orderName: prepareData.orderName,
        successUrl: `${window.location.origin}/premium/success`,
        failUrl: `${window.location.origin}/premium/fail`,
        customerName: "운명랩 회원",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "결제 요청 중 오류가 발생했습니다.";
      if (!message.includes("USER_CANCEL") && !message.includes("취소")) {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  }

  if (variant === "card") {
    return (
      <div className="premium-payment-action">
        <button
          type="button"
          className={cardClassName}
          onClick={() => void handlePayment()}
          disabled={disabled || loading}
          aria-busy={loading}
        >
          {loading ? (
            <span className="upgrade-card-body">
              <span className="upgrade-card-title">결제창 여는 중...</span>
            </span>
          ) : (
            children
          )}
        </button>
        {error && (
          <p className="premium-payment-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="premium-payment-action">
      <button
        type="button"
        className={className}
        onClick={() => void handlePayment()}
        disabled={disabled || loading}
        aria-busy={loading}
      >
        {loading ? "결제창 여는 중..." : children}
      </button>
      {error && (
        <p className="premium-payment-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
