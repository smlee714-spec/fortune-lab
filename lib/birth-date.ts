export const MIN_BIRTH_YEAR = 1940;
export const MAX_BIRTH_YEAR = 2026;

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDaysInMonth(year: number, month: number): number {
  if (month === 2) return isLeapYear(year) ? 29 : 28;
  if ([4, 6, 9, 11].includes(month)) return 30;
  return 31;
}

export function parseBirthDate(dateStr: string): { year: number; month: number; day: number } {
  const [year, month, day] = dateStr.split("-").map(Number);
  return { year, month, day };
}

export function formatBirthDate(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function getYearOptions(): number[] {
  const years: number[] = [];
  for (let y = MAX_BIRTH_YEAR; y >= MIN_BIRTH_YEAR; y--) {
    years.push(y);
  }
  return years;
}

export function getMonthOptions(): number[] {
  return Array.from({ length: 12 }, (_, i) => i + 1);
}

export function getDayOptions(year: number, month: number): number[] {
  const max = getDaysInMonth(year, month);
  return Array.from({ length: max }, (_, i) => i + 1);
}

export function clampBirthDate(year: number, month: number, day: number): string {
  const maxDay = getDaysInMonth(year, month);
  const safeDay = Math.min(day, maxDay);
  return formatBirthDate(year, month, safeDay);
}
