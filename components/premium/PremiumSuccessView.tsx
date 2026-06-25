"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MobileShell from "@/components/MobileShell";
import { getPremiumPlan } from "@/lib/premium/plans";
import type { ConfirmPaymentResponse } from "@/lib/premium/types";

type ConfirmState = "loading" | "success" | "error";

export default function PremiumSuccessView() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<ConfirmState>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successTitle, setSuccessTitle] = useState("결제가 완료되었습니다");
  const [successMessage, setSuccessMessage] = useState(
    "구매하신 혜택을 바로 이용하실 수 있습니다.",
  );

  useEffect(() => {
    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amountParam = searchParams.get("amount");

    if (!paymentKey || !orderId || !amountParam) {
      setState("error");
      setErrorMessage("결제 정보가 누락되었습니다.");
      return;
    }

    const amount = Number(amountParam);
    if (!Number.isFinite(amount)) {
      setState("error");
      setErrorMessage("결제 금액이 올바르지 않습니다.");
      return;
    }

    async function confirmPayment() {
      try {
        const response = await fetch("/api/payments/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentKey, orderId, amount }),
        });

        const data = (await response.json()) as ConfirmPaymentResponse & {
          error?: string;
        };

        if (!response.ok) {
          throw new Error(data.error ?? "결제 승인에 실패했습니다.");
        }

        const plan = getPremiumPlan(data.planId);

        if (data.planType === "subscription") {
          setSuccessTitle("Premium이 활성화되었습니다");
          setSuccessMessage(
            `${plan.priceLabel} 구독이 시작되었습니다. AI 질문 무제한·광고 제거·모든 분석을 이용하세요.`,
          );
        } else {
          setSuccessTitle("심층 분석이 열렸습니다");
          setSuccessMessage(
            `${plan.priceLabel} 결제가 완료되었습니다. 대운·세운·용신·신살 AI 종합 분석을 확인하세요.`,
          );
        }

        setState("success");
      } catch (error) {
        setState("error");
        setErrorMessage(
          error instanceof Error ? error.message : "결제 승인 중 오류가 발생했습니다.",
        );
      }
    }

    void confirmPayment();
  }, [searchParams]);

  return (
    <MobileShell>
      <main className="animate-fade-in responsive-page premium-result-page">
        {state === "loading" && (
          <div className="premium-result-card">
            <p className="lux-caption">PAYMENT</p>
            <h1 className="mt-4 font-serif text-2xl font-light">결제 확인 중</h1>
            <p className="mt-3 text-sm text-[var(--saju-cream-dim)]">
              토스페이먼츠 승인을 처리하고 있습니다. 잠시만 기다려 주세요.
            </p>
          </div>
        )}

        {state === "success" && (
          <div className="premium-result-card premium-result-success">
            <p className="premium-result-icon" aria-hidden>
              ✦
            </p>
            <p className="lux-caption">PAYMENT SUCCESS</p>
            <h1 className="mt-4 font-serif text-2xl font-light text-[var(--saju-gold-light)]">
              {successTitle}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[var(--saju-cream-dim)]">
              {successMessage}
            </p>
            <Link href="/result" className="btn-primary mt-8 block text-center">
              결과 화면으로 돌아가기
            </Link>
          </div>
        )}

        {state === "error" && (
          <div className="premium-result-card premium-result-fail">
            <p className="premium-result-icon" aria-hidden>
              ✕
            </p>
            <p className="lux-caption">CONFIRM FAILED</p>
            <h1 className="mt-4 font-serif text-2xl font-light">결제 승인 실패</h1>
            <p className="mt-3 text-sm leading-relaxed text-[var(--saju-cream-dim)]">
              {errorMessage}
            </p>
            <Link href="/premium/fail" className="btn-primary mt-8 block text-center">
              실패 안내 보기
            </Link>
          </div>
        )}
      </main>
    </MobileShell>
  );
}
