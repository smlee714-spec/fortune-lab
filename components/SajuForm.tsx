"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DEFAULT_BIRTH_TIME } from "@/lib/birth-time";
import { getDefaultBirthDate } from "@/lib/saju";
import type { Gender } from "@/lib/types";
import BirthDatePicker from "./BirthDatePicker";
import BirthTimePicker from "./BirthTimePicker";
import LogoMark from "./LogoMark";
import MobileShell from "./MobileShell";

export default function SajuForm() {
  const router = useRouter();
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

  return (
    <MobileShell>
      <main className="animate-fade-in responsive-page pt-10 md:pt-12">
        <header className="mb-10 text-center md:mb-12">
          <LogoMark />
          <p className="lux-caption mt-5">UNMYEONG LAB</p>
          <h1 className="mt-3 font-serif text-3xl font-light tracking-[0.14em] text-saju-cream md:text-4xl">
            운명랩
          </h1>
          <p className="mx-auto mt-4 max-w-[280px] text-sm font-light leading-relaxed text-[var(--saju-cream-dim)] md:max-w-md md:text-base">
            생년월일과 태어난 시간으로
            <br />
            나만의 사주를 확인해 보세요
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="lux-panel relative z-[1] mx-auto md:max-w-lg lg:max-w-xl"
        >
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
            사주 보기
          </button>
        </form>

        <p className="mt-10 text-center text-[0.65rem] tracking-widest text-saju-cream-dim/40">
          양력 · 입춘 기준 · 교육용 참고 사주
        </p>
      </main>
    </MobileShell>
  );
}
