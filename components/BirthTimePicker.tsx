"use client";

import { useMemo, useState } from "react";
import {
  BIRTH_MINUTE_OPTIONS,
  DEFAULT_BIRTH_TIME,
  formatBirthTime,
  getHourOptions,
  parseBirthTime,
  type BirthMinute,
  type TimePeriod,
} from "@/lib/birth-time";

interface BirthTimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BirthTimePicker({ value, onChange }: BirthTimePickerProps) {
  const parsed = parseBirthTime(value);
  const [unknown, setUnknown] = useState(false);

  const hours = useMemo(() => getHourOptions(), []);

  function update(period: TimePeriod, hour: number, minute: BirthMinute) {
    onChange(formatBirthTime(period, hour, minute));
  }

  function handlePeriodChange(period: TimePeriod) {
    if (unknown) return;
    update(period, parsed.hour, parsed.minute);
  }

  function handleHourChange(hour: number) {
    if (unknown) return;
    update(parsed.period, hour, parsed.minute);
  }

  function handleMinuteChange(minute: BirthMinute) {
    if (unknown) return;
    update(parsed.period, parsed.hour, minute);
  }

  function handleUnknownChange(checked: boolean) {
    setUnknown(checked);
    if (checked) {
      onChange(DEFAULT_BIRTH_TIME);
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={`space-y-3 transition-opacity duration-200 ${unknown ? "time-picker-disabled" : ""}`}
        role="group"
        aria-label="태어난 시간 선택"
        aria-disabled={unknown}
      >
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              { value: "am" as const, label: "오전" },
              { value: "pm" as const, label: "오후" },
            ] as const
          ).map(({ value: periodValue, label }) => (
            <button
              key={periodValue}
              type="button"
              disabled={unknown}
              onClick={() => handlePeriodChange(periodValue)}
              className={`period-btn ${parsed.period === periodValue ? "period-btn-active" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="birth-time-grid">
          <div>
            <label htmlFor="birth-hour" className="sr-only">
              시
            </label>
            <select
              id="birth-hour"
              value={parsed.hour}
              disabled={unknown}
              onChange={(e) => handleHourChange(Number(e.target.value))}
              className="field-select"
            >
              {hours.map((h) => (
                <option key={h} value={h}>
                  {h}시
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="birth-minute" className="sr-only">
              분
            </label>
            <select
              id="birth-minute"
              value={parsed.minute}
              disabled={unknown}
              onChange={(e) => handleMinuteChange(Number(e.target.value) as BirthMinute)}
              className="field-select"
            >
              {BIRTH_MINUTE_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {String(m).padStart(2, "0")}분
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-3 rounded-sm border border-saju-gold/10 bg-saju-ink/40 px-4 py-3.5">
        <input
          type="checkbox"
          checked={unknown}
          onChange={(e) => handleUnknownChange(e.target.checked)}
          className="field-checkbox"
        />
        <span className="text-sm font-light text-saju-cream-dim">태어난 시간을 모름</span>
      </label>
    </div>
  );
}
