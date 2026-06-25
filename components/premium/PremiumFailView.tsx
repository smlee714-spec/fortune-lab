"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import MobileShell from "@/components/MobileShell";

export default function PremiumFailView() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const message = searchParams.get("message");
  const orderId = searchParams.get("orderId");

  return (
    <MobileShell>
      <main className="animate-fade-in responsive-page premium-result-page">
        <div className="premium-result-card premium-result-fail">
          <p className="premium-result-icon" aria-hidden>
            ✕
          </p>
          <p className="lux-caption">PAYMENT FAILED</p>
          <h1 className="mt-4 font-serif text-2xl font-light">결제에 실패했습니다</h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--saju-cream-dim)]">
            {message ?? "결제가 완료되지 않았습니다. 다시 시도해 주세요."}
          </p>
          {(code || orderId) && (
            <dl className="premium-fail-meta">
              {code && (
                <>
                  <dt>오류 코드</dt>
                  <dd>{code}</dd>
                </>
              )}
              {orderId && (
                <>
                  <dt>주문 번호</dt>
                  <dd>{orderId}</dd>
                </>
              )}
            </dl>
          )}
          <div className="premium-fail-actions">
            <Link href="/premium" className="btn-primary block text-center">
              다시 결제하기
            </Link>
            <Link href="/" className="lux-btn-ghost mt-4 block text-center">
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </main>
    </MobileShell>
  );
}
