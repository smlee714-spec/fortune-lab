import type { Element } from "@/lib/types";

export const STEM_ELEMENTS: Record<string, Element> = {
  갑: "목",
  을: "목",
  병: "화",
  정: "화",
  무: "토",
  기: "토",
  경: "금",
  신: "금",
  임: "수",
  계: "수",
};

export const BRANCH_ELEMENTS: Record<string, Element> = {
  자: "수",
  축: "토",
  인: "목",
  묘: "목",
  진: "토",
  사: "화",
  오: "화",
  미: "토",
  신: "금",
  유: "금",
  술: "토",
  해: "수",
};

export const ELEMENT_META: Record<
  Element,
  { className: string; barClass: string; advice: string }
> = {
  목: {
    className: "text-saju-wood",
    barClass: "bg-saju-wood",
    advice: "성장과 창의의 기운이 강합니다. 새로운 도전을 두려워하지 마세요.",
  },
  화: {
    className: "text-saju-fire",
    barClass: "bg-saju-fire",
    advice: "열정과 표현의 기운이 강합니다. 당신의 에너지로 주변을 밝힐 수 있습니다.",
  },
  토: {
    className: "text-saju-earth",
    barClass: "bg-saju-earth",
    advice: "안정과 신뢰의 기운이 강합니다. 든든한 중심이 되어 사람들에게 의지받습니다.",
  },
  금: {
    className: "text-saju-metal",
    barClass: "bg-saju-metal",
    advice: "결단과 원칙의 기운이 강합니다. 명확한 기준으로 올바른 선택을 합니다.",
  },
  수: {
    className: "text-saju-water",
    barClass: "bg-saju-water",
    advice: "지혜와 유연함의 기운이 강합니다. 깊은 통찰로 상황을 잘 파악합니다.",
  },
};

export const DAY_MASTER_DESC: Record<
  string,
  { element: Element; title: string; desc: string }
> = {
  갑: {
    element: "목",
    title: "큰 나무(甲木)",
    desc: "곧게 뻗어 나가는 성장형 리더십. 정의감이 강하고 새로운 일에 도전하는 기운이 있습니다.",
  },
  을: {
    element: "목",
    title: "풀과 덩굴(乙木)",
    desc: "유연하고 적응력이 뛰어납니다. 주변과 조화를 이루며 섬세한 감수성을 지닙니다.",
  },
  병: {
    element: "화",
    title: "태양(丙火)",
    desc: "밝고 열정적인 에너지. 주변을 환하게 비추며 솔직하고 활동적인 성격입니다.",
  },
  정: {
    element: "화",
    title: "촛불·등불(丁火)",
    desc: "따뜻하고 섬세한 불꽃. 내면의 깊이와 예술적 감각, 배려심이 돋보입니다.",
  },
  무: {
    element: "토",
    title: "큰 산(戊土)",
    desc: "든든하고 신뢰감 있는 중심. 포용력이 크고 현실적이며 책임감이 강합니다.",
  },
  기: {
    element: "토",
    title: "밭·흙(己土)",
    desc: "부드럽고 수용적인 성격. 세심하게 주변을 돌보며 실용적인 지혜를 지닙니다.",
  },
  경: {
    element: "금",
    title: "쇠·바위(庚金)",
    desc: "강인하고 결단력 있는 기운. 원칙을 중시하며 정의롭고 의리 있는 성향입니다.",
  },
  신: {
    element: "금",
    title: "보석·금속(辛金)",
    desc: "섬세하고 예민한 감각. 완벽주의적이며 고급스러운 미적 감각을 가집니다.",
  },
  임: {
    element: "수",
    title: "큰 바다(壬水)",
    desc: "지혜롭고 포용력 있는 기운. 넓은 시야와 유연한 사고, 큰 그림을 그립니다.",
  },
  계: {
    element: "수",
    title: "이슬·비(癸水)",
    desc: "섬세하고 직관적인 감각. 조용하지만 깊은 내면과 창의력을 지닙니다.",
  },
};

export function getInterpretation(
  dayStem: string,
  gender: "male" | "female",
  elementCounts: Record<Element, number>
): string {
  const desc = DAY_MASTER_DESC[dayStem];
  const genderText = gender === "male" ? "남성" : "여성";
  const sorted = (Object.entries(elementCounts) as [Element, number][]).sort(
    (a, b) => b[1] - a[1]
  );
  const strongest = sorted[0][0];
  const weakest = sorted[sorted.length - 1][0];
  const weakestCount = sorted[sorted.length - 1][1];

  const balanceHints: Record<Element, string> = {
    목: "새로운 학습",
    화: "활동적",
    토: "안정감",
    금: "결단력",
    수: "휴식과 성찰",
  };

  let balanceNote = "";
  if (weakestCount === 0) {
    balanceNote = ` ${weakest} 기운이 부족하니, ${balanceHints[weakest]}을 의식적으로 채워 보세요.`;
  }

  return `${genderText}으로 태어난 ${desc.title}의 기운을 지녔습니다. ${desc.desc} 사주 전체에서 ${strongest} 기운이 두드러집니다. ${ELEMENT_META[strongest].advice}${balanceNote}`;
}
