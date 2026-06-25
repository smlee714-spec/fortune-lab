import type { DayMasterInfo, Element, Gender, Pillar, SajuInput, SajuResult } from "./types";

const HEAVENLY_STEMS = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"] as const;
const EARTHLY_BRANCHES = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"] as const;

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

const DAY_MASTER_DESC: Record<string, DayMasterInfo> = {
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

function getSajuYear(year: number, month: number, day: number): number {
  if (month < 2 || (month === 2 && day < 4)) return year - 1;
  return year;
}

function getYearPillar(year: number, month: number, day: number): Pillar {
  const sajuYear = getSajuYear(year, month, day);
  const stemIdx = (sajuYear - 4) % 10;
  const branchIdx = (sajuYear - 4) % 12;
  return {
    stem: HEAVENLY_STEMS[stemIdx],
    branch: EARTHLY_BRANCHES[branchIdx],
    stemIdx,
    branchIdx,
  };
}

function getMonthBranchIndex(month: number, day: number): number {
  const branchMap = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0];
  if (month === 1) return 1;
  if (month === 2 && day < 4) return 1;
  return branchMap[month - 1];
}

function getMonthStemStart(yearStemIdx: number): number {
  const map: Record<number, number> = {
    0: 2,
    5: 2,
    1: 4,
    6: 4,
    2: 6,
    7: 6,
    3: 8,
    8: 8,
    4: 0,
    9: 0,
  };
  return map[yearStemIdx];
}

function getMonthPillar(
  year: number,
  month: number,
  day: number,
  yearStemIdx: number
): Pillar {
  const branchIdx = getMonthBranchIndex(month, day);
  const monthOffset = (branchIdx - 2 + 12) % 12;
  const stemStart = getMonthStemStart(yearStemIdx);
  const stemIdx = (stemStart + monthOffset) % 10;
  return {
    stem: HEAVENLY_STEMS[stemIdx],
    branch: EARTHLY_BRANCHES[branchIdx],
    stemIdx,
    branchIdx,
  };
}

function getDayPillar(year: number, month: number, day: number): Pillar {
  const base = new Date(1900, 0, 31);
  const target = new Date(year, month - 1, day);
  const diffDays = Math.round((target.getTime() - base.getTime()) / 86400000);
  const stemIdx = ((diffDays % 10) + 10) % 10;
  const branchIdx = ((diffDays % 12) + 10) % 12;
  return {
    stem: HEAVENLY_STEMS[stemIdx],
    branch: EARTHLY_BRANCHES[branchIdx],
    stemIdx,
    branchIdx,
  };
}

function getHourBranchIndex(hour: number): number {
  if (hour === 23) return 0;
  return Math.floor((hour + 1) / 2) % 12;
}

function getHourStemStart(dayStemIdx: number): number {
  const map: Record<number, number> = {
    0: 0,
    5: 0,
    1: 2,
    6: 2,
    2: 4,
    7: 4,
    3: 6,
    8: 6,
    4: 8,
    9: 8,
  };
  return map[dayStemIdx];
}

function getHourPillar(hour: number, dayStemIdx: number): Pillar {
  const branchIdx = getHourBranchIndex(hour);
  const stemStart = getHourStemStart(dayStemIdx);
  const stemIdx = (stemStart + branchIdx) % 10;
  return {
    stem: HEAVENLY_STEMS[stemIdx],
    branch: EARTHLY_BRANCHES[branchIdx],
    stemIdx,
    branchIdx,
  };
}

function countElements(pillars: Pillar[]): Record<Element, number> {
  const counts: Record<Element, number> = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };
  for (const p of pillars) {
    counts[STEM_ELEMENTS[p.stem]]++;
    counts[BRANCH_ELEMENTS[p.branch]]++;
  }
  return counts;
}

function getInterpretation(
  dayStem: string,
  gender: Gender,
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

export function calculateSaju(input: SajuInput): SajuResult {
  const [year, month, day] = input.birthDate.split("-").map(Number);
  const [hour] = input.birthTime.split(":").map(Number);

  const yearPillar = getYearPillar(year, month, day);
  const dayPillar = getDayPillar(year, month, day);
  const monthPillar = getMonthPillar(year, month, day, yearPillar.stemIdx);
  const hourPillar = getHourPillar(hour, dayPillar.stemIdx);

  const pillars = [hourPillar, dayPillar, monthPillar, yearPillar];
  const elementCounts = countElements(pillars);

  return {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    hour: hourPillar,
    elementCounts,
    dayMaster: DAY_MASTER_DESC[dayPillar.stem],
    interpretation: getInterpretation(dayPillar.stem, input.gender, elementCounts),
    birthInfo: { year, month, day, hour, gender: input.gender },
  };
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
