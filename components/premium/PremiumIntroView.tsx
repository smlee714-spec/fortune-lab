import Link from "next/link";
import { PREMIUM_BENEFITS, PREMIUM_PRICE } from "@/lib/premium";
import MobileShell from "@/components/MobileShell";

export default function PremiumIntroView() {
  return (
    <MobileShell>
      <main className="animate-fade-in responsive-page">
        <header className="relative mb-10 pt-1 text-center md:mb-12">
          <Link href="/" className="lux-btn-ghost absolute left-0 top-1 text-xs sm:text-sm">
            <span aria-hidden>←</span>
            <span>돌아가기</span>
          </Link>

          <p className="lux-caption">PREMIUM</p>
          <h1 className="mt-3 font-serif text-2xl font-light tracking-[0.12em] md:text-3xl">
            운명랩 Premium
          </h1>
          <p className="mt-2 text-sm text-[var(--saju-gold-light)]">AI가 읽어주는 당신의 운명</p>
          <p className="mt-4 font-serif text-2xl font-medium text-[var(--saju-gold-light)] md:text-3xl">
            {PREMIUM_PRICE}
          </p>
          <p className="mt-3 text-sm font-light leading-relaxed text-[var(--saju-cream-dim)]">
            광고 없이, AI가 사주·타로·관상·손금을
            <br />
            종합 분석해 드립니다.
          </p>
        </header>

        <section className="premium-intro-card" aria-labelledby="premium-benefits-title">
          <h2
            id="premium-benefits-title"
            className="font-serif text-base font-medium tracking-wide text-[var(--saju-cream)]"
          >
            포함 혜택
          </h2>
          <ul className="premium-intro-benefits">
            {PREMIUM_BENEFITS.map((benefit) => (
              <li key={benefit}>
                <span className="premium-intro-check" aria-hidden>
                  ✦
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="premium-intro-note">
          <p>
            프리미엄 구독은 곧 출시됩니다.
            <br />
            실제 결제 연동 전, 혜택과 가격을 미리 확인하실 수 있습니다.
          </p>
        </div>

        <Link href="/" className="btn-primary mt-8 block text-center">
          운명랩 시작하기
        </Link>
      </main>
    </MobileShell>
  );
}
