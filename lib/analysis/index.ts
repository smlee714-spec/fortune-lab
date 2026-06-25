import type { SajuResult } from "../types";
import type { FullAnalysis } from "./types";
import { analyzeDaeun } from "./daeun";
import { analyzeHyungchung } from "./hyungchung";
import { analyzeOhaeng } from "./ohaeng";
import { analyzeSalGuin } from "./salGuin";
import { analyzeSeun } from "./seun";
import { analyzeSinStrength } from "./sinStrength";
import { analyzeSipsung } from "./sipsung";
import { analyzeWonkuk } from "./wonkuk";

/** 전체 고급 분석 생성 — 각 모듈 독립 교체 가능 */
export function generateFullAnalysis(result: SajuResult): FullAnalysis {
  return {
    wonkuk: analyzeWonkuk(result),
    ohaeng: analyzeOhaeng(result),
    sipsung: analyzeSipsung(result),
    sinStrength: analyzeSinStrength(result),
    salGuin: analyzeSalGuin(result),
    hyungchung: analyzeHyungchung(result),
    daeun: analyzeDaeun(result),
    seun: analyzeSeun(result),
  };
}

export * from "./types";
export { analyzeWonkuk } from "./wonkuk";
export { analyzeOhaeng } from "./ohaeng";
export { analyzeSipsung } from "./sipsung";
export { analyzeSinStrength } from "./sinStrength";
export { analyzeSalGuin } from "./salGuin";
export { analyzeHyungchung, getDetectedHyungchung } from "./hyungchung";
export { analyzeDaeun } from "./daeun";
export { analyzeSeun } from "./seun";
