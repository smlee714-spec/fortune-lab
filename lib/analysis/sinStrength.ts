import { STEM_ELEMENTS } from "../saju";
import type { Element, SajuResult } from "../types";
import type { SinStrengthAnalysis, SinStrengthType } from "./types";

const PRODUCES: Record<Element, Element> = {
  목: "화",
  화: "토",
  토: "금",
  금: "수",
  수: "목",
};

const PRODUCED_BY: Record<Element, Element> = {
  목: "수",
  화: "목",
  토: "화",
  금: "토",
  수: "금",
};

function getSupportScore(counts: Record<Element, number>, dayElement: Element): number {
  const same = counts[dayElement];
  const resource = counts[PRODUCED_BY[dayElement]];
  const drain = counts[PRODUCES[dayElement]];
  const control = counts[
    (Object.entries(PRODUCED_BY).find(([, v]) => v === dayElement)?.[0] as Element) ?? "토"
  ];
  return same * 2 + resource * 1.5 - drain - control * 0.5;
}

export function analyzeSinStrength(result: SajuResult): SinStrengthAnalysis {
  const dayElement = STEM_ELEMENTS[result.day.stem];
  const score = getSupportScore(result.elementCounts, dayElement);

  let type: SinStrengthType = "중화";
  if (score >= 4) type = "신강";
  else if (score <= 1.5) type = "신약";

  const profiles: Record<
    SinStrengthType,
    Pick<SinStrengthAnalysis, "personality" | "work" | "money" | "relationship" | "summary">
  > = {
    신강: {
      personality: "자기 주관이 뚜렷하고 추진력이 강합니다. 스스로 결정하는 것을 선호합니다.",
      work: "리더십을 발휘하기 좋지만, 협업 시 타인 의견을 듣는 연습이 도움이 됩니다.",
      money: "적극적으로 기회를 잡을 수 있으나, 과욕은 지출 증가로 이어질 수 있습니다.",
      relationship: "주도적이고 솔직한 편입니다. 상대의 공간을 존중하면 관계가 더 좋아집니다.",
      summary: "일간의 힘이 충분한 편입니다. 에너지를 밖으로 펼치되, 균형을 의식하세요.",
    },
    신약: {
      personality: "섬세하고 배려심이 깊습니다. 주변의 도움과 환경의 영향을 많이 받습니다.",
      work: "협력과 보조 역할에서 빛납니다. 무리한 독립보다 멘토·팀의 지원이 유리합니다.",
      money: "안정적 수입을 선호합니다. 무리한 투자보다 꾸준한 저축이 잘 맞습니다.",
      relationship: "공감 능력이 좋아 인연이 중요합니다. 신뢰할 수 있는 사람과 함께하면 든든합니다.",
      summary: "일간의 힘이 부드러운 편입니다. 도움을 받고 환경을 잘 고르면 성장이 빠릅니다.",
    },
    중화: {
      personality: "균형 잡힌 성향으로 상황에 맞게 유연하게 대처합니다.",
      work: "리더와 서포터 역할 모두 가능합니다. 상황에 맞는 선택이 강점입니다.",
      money: "들어오고 나가는 재물의 균형을 맞추기 좋습니다. 계획적 관리가 효과적입니다.",
      relationship: "주고받는 관계에서 안정감을 줍니다. 극단적이지 않은 소통이 잘 맞습니다.",
      summary: "신강·신약 사이의 균형형입니다. 상황에 따라 전략을 바꾸면 유리합니다.",
    },
  };

  return {
    type,
    score: Math.round(score * 10) / 10,
    ...profiles[type],
  };
}
