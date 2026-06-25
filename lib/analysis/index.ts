import type { SajuResult } from "../types";
import type { FullAnalysis } from "./types";
import { generateFullAnalysisFromEngine } from "./from-engine";

/** 전체 고급 분석 — lunar-typescript 명리 엔진 기반 */
export function generateFullAnalysis(result: SajuResult): FullAnalysis {
  return generateFullAnalysisFromEngine(result.engine, result);
}

export * from "./types";
export { generateFullAnalysisFromEngine } from "./from-engine";
export { analyzeWonkuk } from "./wonkuk";
export { analyzeOhaeng } from "./ohaeng";
export { analyzeSipsung } from "./sipsung";
export { analyzeSinStrength } from "./sinStrength";
export { analyzeSalGuin } from "./salGuin";
export { analyzeHyungchung, getDetectedHyungchung } from "./hyungchung";
export { analyzeDaeun } from "./daeun";
export { analyzeSeun } from "./seun";
