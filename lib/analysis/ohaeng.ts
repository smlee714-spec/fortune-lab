import type { Element, SajuResult } from "../types";
import type { OhaengAnalysis } from "./types";

const ELEMENTS: Element[] = ["목", "화", "토", "금", "수"];

const EXPLANATIONS: Record<Element, string> = {
  목: "성장, 창의, 시작의 기운",
  화: "열정, 표현, 활동의 기운",
  토: "안정, 중재, 신뢰의 기운",
  금: "결단, 원칙, 정리의 기운",
  수: "지혜, 유연, 깊이의 기운",
};

export function analyzeOhaeng(result: SajuResult): OhaengAnalysis {
  const counts = { ...result.elementCounts };
  const max = Math.max(...ELEMENTS.map((e) => counts[e]));
  const min = Math.min(...ELEMENTS.map((e) => counts[e]));

  const abundant = ELEMENTS.filter((e) => counts[e] === max && max > 0);
  const lacking = ELEMENTS.filter((e) => counts[e] === min);

  const abundantText = abundant.map((e) => `${e}(${counts[e]}개)`).join(", ");
  const lackingText = lacking.map((e) => `${e}(${counts[e]}개)`).join(", ");

  return {
    counts,
    abundant,
    lacking,
    summary: `많은 오행: ${abundantText} · 부족한 오행: ${lackingText}`,
    easyExplanation: `사주 전체 8글자 기준으로 오행을 세었습니다. ${abundant.map((e) => EXPLANATIONS[e]).join(" ")} 기운이 두드러지고, ${lacking.length > 0 ? `${lacking.join(", ")} 기운을 보완하면 균형이 좋아집니다.` : "전반적으로 고르게 분포되어 있습니다."}`,
  };
}
