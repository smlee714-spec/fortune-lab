export type TimePeriod = "am" | "pm";

export const BIRTH_MINUTE_OPTIONS = [0, 10, 20, 30, 40, 50] as const;
export type BirthMinute = (typeof BIRTH_MINUTE_OPTIONS)[number];

export const DEFAULT_BIRTH_TIME = "12:00";

export function getHourOptions(): number[] {
  return Array.from({ length: 12 }, (_, i) => i + 1);
}

export function parseBirthTime(time24: string): {
  period: TimePeriod;
  hour: number;
  minute: BirthMinute;
} {
  const [hRaw, mRaw] = time24.split(":").map(Number);
  const h = Number.isFinite(hRaw) ? hRaw : 12;
  const m = Number.isFinite(mRaw) ? mRaw : 0;

  let period: TimePeriod;
  let hour12: number;

  if (h === 0) {
    period = "am";
    hour12 = 12;
  } else if (h < 12) {
    period = "am";
    hour12 = h;
  } else if (h === 12) {
    period = "pm";
    hour12 = 12;
  } else {
    period = "pm";
    hour12 = h - 12;
  }

  const minute = snapMinute(m);

  return { period, hour: hour12, minute };
}

export function snapMinute(minute: number): BirthMinute {
  if (BIRTH_MINUTE_OPTIONS.includes(minute as BirthMinute)) {
    return minute as BirthMinute;
  }
  return 0;
}

export function formatBirthTime(
  period: TimePeriod,
  hour: number,
  minute: BirthMinute
): string {
  let h24: number;

  if (period === "am") {
    h24 = hour === 12 ? 0 : hour;
  } else {
    h24 = hour === 12 ? 12 : hour + 12;
  }

  return `${String(h24).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}
