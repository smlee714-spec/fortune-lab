"use client";

import { useMemo } from "react";
import {
  clampBirthDate,
  getDayOptions,
  getMonthOptions,
  getYearOptions,
  parseBirthDate,
} from "@/lib/birth-date";

interface BirthDatePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BirthDatePicker({ value, onChange }: BirthDatePickerProps) {
  const { year, month, day } = parseBirthDate(value);

  const years = useMemo(() => getYearOptions(), []);
  const months = useMemo(() => getMonthOptions(), []);
  const days = useMemo(() => getDayOptions(year, month), [year, month]);

  function handleYearChange(newYear: number) {
    onChange(clampBirthDate(newYear, month, day));
  }

  function handleMonthChange(newMonth: number) {
    onChange(clampBirthDate(year, newMonth, day));
  }

  function handleDayChange(newDay: number) {
    onChange(clampBirthDate(year, month, newDay));
  }

  return (
    <div className="birth-date-grid" role="group" aria-label="생년월일 선택">
      <div>
        <label htmlFor="birth-year" className="sr-only">
          년도
        </label>
        <select
          id="birth-year"
          value={year}
          onChange={(e) => handleYearChange(Number(e.target.value))}
          className="field-select"
          required
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}년
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="birth-month" className="sr-only">
          월
        </label>
        <select
          id="birth-month"
          value={month}
          onChange={(e) => handleMonthChange(Number(e.target.value))}
          className="field-select"
          required
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {m}월
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="birth-day" className="sr-only">
          일
        </label>
        <select
          id="birth-day"
          value={day}
          onChange={(e) => handleDayChange(Number(e.target.value))}
          className="field-select"
          required
        >
          {days.map((d) => (
            <option key={d} value={d}>
              {d}일
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
