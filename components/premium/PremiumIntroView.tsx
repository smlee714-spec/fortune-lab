import Link from "next/link";
import MobileShell from "@/components/MobileShell";
import PremiumTierList from "./PremiumTierList";

export default function PremiumIntroView() {
  return (
    <MobileShell>
      <main className="animate-fade-in responsive-page premium-page">
        <header className="relative mb-8 pt-1 text-center md:mb-10">
          <Link href="/" className="lux-btn-ghost absolute left-0 top-1 text-xs sm:text-sm">
            <span aria-hidden>←</span>
            <span>돌아가기</span>
          </Link>

          <p className="lux-caption">PLANS</p>
          <h1 className="mt-3 font-serif text-2xl font-light tracking-[0.12em] md:text-3xl">
            나에게 맞는 플랜
          </h1>
          <p className="mt-3 text-sm font-light leading-relaxed text-[var(--saju-cream-dim)]">
            무료로 시작하고, 필요할 때만 업그레이드하세요.
            <br />
            첫 결제 부담을 줄인 단계별 구성입니다.
          </p>
        </header>

        <PremiumTierList />

        <div className="premium-intro-note">
          <p>
            심층 분석(990원)은 1회 결제로 영구 이용합니다.
            <br />
            Premium은 월 구독이며, 토스페이먼츠 테스트 키로 결제를 시뮬레이션할 수 있습니다.
          </p>
        </div>
      </main>
    </MobileShell>
  );
}
