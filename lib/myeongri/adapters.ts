import type { Gender, SajuInput, SajuResult } from "@/lib/types";
import {
  engineToSajuResult,
  parseFortuneInputToEngine,
  sajuInputToEngine,
} from "@/lib/saju-engine-adapter";
import type { SajuEngineInput } from "@/lib/saju-engine";

/** @deprecated lunar-typescript 엔진으로 대체됨 — sajuInputToEngine 사용 */
export type MyeongriInput = SajuEngineInput;

export function sajuInputToMyeongri(input: SajuInput): SajuEngineInput {
  const [year, month, day] = input.birthDate.split("-").map(Number);
  const timeParts = input.birthTime.split(":").map(Number);
  return {
    year,
    month,
    day,
    hour: timeParts[0] ?? 0,
    minute: timeParts[1] ?? 0,
    gender: input.gender,
  };
}

export function parseFortuneInputToMyeongri(
  date: string,
  time: string,
  gender: Gender
) {
  return parseFortuneInputToEngine(date, time, gender).input;
}

/** @deprecated engineToSajuResult 사용 */
export function chartToSajuResult(engine: SajuResult["engine"]): SajuResult {
  return engineToSajuResult(engine);
}

export function computeFromInput(input: SajuInput): SajuResult {
  return engineToSajuResult(sajuInputToEngine(input));
}
