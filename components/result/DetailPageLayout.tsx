import Link from "next/link";
import type { ReactNode } from "react";
import { buildResultPath } from "@/lib/result-routes";
import type { ResultQueryParams } from "@/lib/result-routes";
import MobileShell from "@/components/MobileShell";

interface DetailPageLayoutProps {
  title: string;
  technicalTitle?: string;
  termGuide?: string;
  params: ResultQueryParams;
  children: ReactNode;
}

export default function DetailPageLayout({
  title,
  technicalTitle,
  termGuide,
  params,
  children,
}: DetailPageLayoutProps) {
  const backHref = buildResultPath("/result", params);

  return (
    <MobileShell>
      <main className="animate-fade-in responsive-page">
        <header className="relative mb-8 pt-1 md:mb-10">
          <Link href={backHref} className="lux-btn-ghost mb-8">
            <span aria-hidden>←</span>
            <span>결과로 돌아가기</span>
          </Link>
          <h1 className="font-serif text-2xl font-light tracking-wide text-saju-cream md:text-3xl">
            {title}
          </h1>
          {technicalTitle && (
            <p className="mt-2 text-xs font-medium tracking-wide text-saju-gold/60">
              {technicalTitle}
            </p>
          )}
        </header>

        {termGuide && <TermGuideCard>{termGuide}</TermGuideCard>}

        {children}
      </main>
    </MobileShell>
  );
}

interface TermGuideCardProps {
  children: ReactNode;
}

export function TermGuideCard({ children }: TermGuideCardProps) {
  return (
    <div className="lux-card relative z-[1] mb-6 md:p-6">
      <p className="lux-caption mb-3">용어 설명</p>
      <p className="text-sm font-light leading-[1.95] text-saju-cream-dim md:text-[0.95rem]">
        {children}
      </p>
    </div>
  );
}

interface DetailSummaryCardProps {
  children: ReactNode;
}

export function DetailSummaryCard({ children }: DetailSummaryCardProps) {
  return (
    <div className="lux-card lux-card-featured relative z-[1] mb-6 md:p-6">
      <p className="lux-caption mb-3">나의 결과 요약</p>
      <p className="text-sm font-light leading-[1.9] text-saju-cream md:text-base">{children}</p>
    </div>
  );
}

interface DetailContentCardProps {
  title?: string;
  children: ReactNode;
}

export function DetailContentCard({ title, children }: DetailContentCardProps) {
  return (
    <div className="lux-card relative z-[1] md:p-6">
      {title && (
        <h2 className="relative z-[1] mb-5 font-serif text-sm font-medium tracking-[0.12em] text-saju-gold/80">
          {title}
        </h2>
      )}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
