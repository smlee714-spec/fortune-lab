import { generateDailyFortune } from "./fortune";
import type { SajuResult } from "./types";

export interface ResultLuckMeta {
  destinyScore: number;
  starCount: number;
  oneLiner: string;
  luckyNumbers: number[];
  luckyColor: { name: string; hex: string; meaning: string };
  luckyDirection: string;
  luckyTime: string;
}

const DIRECTIONS = ["동쪽", "서쪽", "남쪽", "북쪽", "동남쪽", "서남쪽", "북동쪽", "북서쪽"] as const;

const LUCKY_TIMES = [
  "오전 7시~9시",
  "오전 9시~11시",
  "오후 1시~3시",
  "오후 3시~5시",
  "오후 5시~7시",
  "저녁 7시~9시",
] as const;

function hashSeed(...values: number[]): number {
  let seed = 0;
  for (const v of values) {
    seed = (seed * 31 + v) >>> 0;
  }
  return seed;
}

function firstSentence(text: string): string {
  const trimmed = text.trim();
  const match = trimmed.match(/^[^.!?。]+[.!?。]?/);
  return (match?.[0] ?? trimmed).trim();
}

export function buildResultLuckMeta(
  result: SajuResult,
  summary: string,
  today = new Date()
): ResultLuckMeta {
  const { birthInfo, day } = result;
  const seed = hashSeed(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
    birthInfo.year,
    birthInfo.month,
    birthInfo.day,
    day.stemIdx,
    day.branchIdx
  );

  const localFortune = generateDailyFortune(result, today);
  const destinyScore = 72 + (seed % 24);
  const starCount = Math.min(5, Math.max(3, Math.round(destinyScore / 20)));

  return {
    destinyScore,
    starCount,
    oneLiner: firstSentence(summary),
    luckyNumbers: localFortune.luckyNumbers,
    luckyColor: localFortune.luckyColor,
    luckyDirection: DIRECTIONS[seed % DIRECTIONS.length],
    luckyTime: LUCKY_TIMES[seed % LUCKY_TIMES.length],
  };
}
