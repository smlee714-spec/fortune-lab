import Link from "next/link";
import MobileShell from "@/components/MobileShell";
import DeepAnalysisCheckout from "./DeepAnalysisCheckout";
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

          <p className="lux-caption">PAYMENT</p>
          <h1 className="mt-3 font-serif text-2xl font-light tracking-[0.12em] md:text-3xl">
            AI 심층 분석
          </h1>
          <p className="mt-3 text-sm font-light leading-relaxed text-[var(--saju-cream-dim)]">
            990원 1회 결제로 대운·세운·용신·신살 AI 분석을 열 수 있습니다.
            <br />
            토스페이먼츠 테스트 키로 결제를 시뮬레이션할 수 있습니다.
          </p>
        </header>

        <DeepAnalysisCheckout />

        <div className="premium-section-divider" aria-hidden />

        <p className="lux-caption text-center">ALL PLANS</p>
        <h2 className="mt-2 text-center font-serif text-lg font-light tracking-wide">
          전체 플랜 비교
        </h2>

        <PremiumTierList />

        <div className="premium-intro-note">
          <p>
            AI 심층 분석(990원)은 1회 결제로 영구 이용합니다.
            <br />
            Client Key는 브라우저에서만, Secret Key는 서버 API에서만 사용됩니다.
          </p>
        </div>
      </main>
    </MobileShell>
  );
}
