import { engineToSajuResult, sajuInputToEngine } from "@/lib/saju-engine-adapter";
import type { SajuInput, SajuResult } from "./types";

export {
  BRANCH_ELEMENTS,
  DAY_MASTER_DESC,
  ELEMENT_META,
  STEM_ELEMENTS,
} from "./saju-meta";

export function calculateSaju(input: SajuInput): SajuResult {
  const engine = sajuInputToEngine(input);
  return engineToSajuResult(engine);
}

export function formatBirthInfo(info: SajuResult["birthInfo"]): string {
  const gender = info.gender === "male" ? "남" : "여";
  const hourStr = String(info.hour).padStart(2, "0");
  return `${info.year}년 ${info.month}월 ${info.day}일 ${hourStr}시 · ${gender}`;
}

export function getDefaultBirthDate(): string {
  const today = new Date();
  const y = today.getFullYear() - 25;
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
