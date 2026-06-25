"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DEFAULT_BIRTH_TIME } from "@/lib/birth-time";
import { getDefaultBirthDate } from "@/lib/saju";
import type { Gender } from "@/lib/types";
import CustomerReviews from "@/components/home/CustomerReviews";
import FeatureCards from "@/components/home/FeatureCards";
import TrustStats from "@/components/home/TrustStats";
import WhyUnmyeongLab from "@/components/home/WhyUnmyeongLab";
import AskAIPanel from "@/components/ai/AskAIPanel";
import BirthDatePicker from "./BirthDatePicker";
import BirthTimePicker from "./BirthTimePicker";
import LogoMark from "./LogoMark";
import MobileShell from "./MobileShell";

export default function SajuForm() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [birthDate, setBirthDate] = useState(getDefaultBirthDate);
  const [birthTime, setBirthTime] = useState(DEFAULT_BIRTH_TIME);
  const [gender, setGender] = useState<Gender>("male");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      date: birthDate,
      time: birthTime,
      gender,
    });
    router.push(`/result?${params.toString()}`);
  }

  function openForm() {
    setShowForm(true);
  }

  return (
    <MobileShell>
      <main className="animate-fade-in responsive-page home-page">
        {!showForm && (
          <>
            <CustomerReviews />

            <header className="home-hero">
              <LogoMark />
              <p className="home-brand-mark">UNMYEONG LAB</p>
              <h1 className="home-title">운명랩</h1>
              <p className="home-slogan">AI가 읽어주는 당신의 운명</p>

              <button type="button" className="btn-hero" onClick={openForm}>
                운명 분석 시작하기
              </button>
            </header>

            <TrustStats />
            <WhyUnmyeongLab />

            <section className="home-features" aria-label="분석 서비스">
              <h2 className="trust-section-title home-features-title">분석 서비스</h2>
              <FeatureCards onSelectSaju={openForm} />
            </section>

            <AskAIPanel className="home-ask-ai" />
          </>
        )}

        {showForm && (
          <section className="home-form-section animate-fade-in">
            <button
              type="button"
              className="home-form-back"
              onClick={() => setShowForm(false)}
            >
              ← 돌아가기
            </button>

            <form onSubmit={handleSubmit} className="lux-panel home-form-panel">
              <h2 className="home-form-title">사주 정보 입력</h2>
              <p className="home-form-desc">
                생년월일과 태어난 시간을 입력하면 AI가 운명을 분석합니다.
              </p>

              <div className="mb-7">
                <span className="field-label">생년월일</span>
                <BirthDatePicker value={birthDate} onChange={setBirthDate} />
              </div>

              <div className="mb-7">
                <span className="field-label">태어난 시간</span>
                <BirthTimePicker value={birthTime} onChange={setBirthTime} />
              </div>

              <div className="mb-9">
                <span className="field-label">성별</span>
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {(
                    [
                      { value: "male" as const, label: "남성" },
                      { value: "female" as const, label: "여성" },
                    ] as const
                  ).map(({ value, label }) => (
                    <label key={value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={value}
                        checked={gender === value}
                        onChange={() => setGender(value)}
                        className="peer sr-only"
                      />
                      <span className="period-btn block py-3.5 text-sm peer-checked:period-btn-active">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-primary">
                운명 분석 시작하기
              </button>
            </form>
          </section>
        )}

        <p className="home-footer-note">
          양력 · 입춘 기준 · 재미와 참고용 운세
        </p>
      </main>
    </MobileShell>
  );
}
