import type { Element } from "@/lib/types";

export const HEAVENLY_STEMS = [
  "갑",
  "을",
  "병",
  "정",
  "무",
  "기",
  "경",
  "신",
  "임",
  "계",
] as const;

export const EARTHLY_BRANCHES = [
  "자",
  "축",
  "인",
  "묘",
  "진",
  "사",
  "오",
  "미",
  "신",
  "유",
  "술",
  "해",
] as const;

export type Stem = (typeof HEAVENLY_STEMS)[number];
export type Branch = (typeof EARTHLY_BRANCHES)[number];

export const STEM_ELEMENTS: Record<Stem, Element> = {
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

export const BRANCH_ELEMENTS: Record<Branch, Element> = {
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

/** 지장간 (본기·중기·여기) */
export const HIDDEN_STEMS: Record<Branch, Stem[]> = {
  자: ["계"],
  축: ["기", "계", "신"],
  인: ["갑", "병", "무"],
  묘: ["을"],
  진: ["무", "을", "계"],
  사: ["병", "무", "경"],
  오: ["정", "기"],
  미: ["기", "정", "을"],
  신: ["경", "임", "무"],
  유: ["신"],
  술: ["무", "신", "정"],
  해: ["임", "갑"],
};

/** 절기 기준 월지 (인월=0 in cycle from 寅) */
export const SOLAR_TERM_MONTH_BRANCH: Branch[] = [
  "인",
  "묘",
  "진",
  "사",
  "오",
  "미",
  "신",
  "유",
  "술",
  "해",
  "자",
  "축",
];

/** 절입일 근사 (월, 일) — 입춘부터 순서 */
export const SOLAR_TERMS: { month: number; day: number; name: string }[] = [
  { month: 2, day: 4, name: "입춘" },
  { month: 3, day: 6, name: "경칩" },
  { month: 4, day: 5, name: "청명" },
  { month: 5, day: 6, name: "입하" },
  { month: 6, day: 6, name: "망종" },
  { month: 7, day: 7, name: "소서" },
  { month: 8, day: 8, name: "입추" },
  { month: 9, day: 8, name: "백로" },
  { month: 10, day: 8, name: "한로" },
  { month: 11, day: 7, name: "입동" },
  { month: 12, day: 7, name: "대설" },
  { month: 1, day: 6, name: "소한" },
];

export const TWELVE_STAGE_NAMES = [
  "장생",
  "목욕",
  "관대",
  "건록",
  "제왕",
  "쇠",
  "병",
  "사",
  "묘",
  "절",
  "태",
  "양",
] as const;

/** 양간 장생 시작 지지 인덱스 */
export const YANG_STEM_JANGSEONG_BRANCH: Record<number, number> = {
  0: 11,
  2: 2,
  4: 2,
  6: 5,
  8: 8,
};

/** 음간은 역행 */
export const YIN_STEM_JANGSEONG_BRANCH: Record<number, number> = {
  1: 6,
  3: 9,
  5: 9,
  7: 0,
  9: 3,
};

export const SIPSUNG_NAMES = [
  "비견",
  "겁재",
  "식신",
  "상관",
  "편재",
  "정재",
  "편관",
  "정관",
  "편인",
  "정인",
] as const;

export type SipsungName = (typeof SIPSUNG_NAMES)[number];

export const SIPSUNG_TABLE: SipsungName[][] = [
  ["비견", "겁재", "식신", "상관", "편재", "정재", "편관", "정관", "편인", "정인"],
  ["겁재", "비견", "상관", "식신", "정재", "편재", "정관", "편관", "정인", "편인"],
  ["편인", "정인", "비견", "겁재", "식신", "상관", "편재", "정재", "편관", "정관"],
  ["정인", "편인", "겁재", "비견", "상관", "식신", "정재", "편재", "정관", "편관"],
  ["편관", "정관", "편인", "정인", "비견", "겁재", "식신", "상관", "편재", "정재"],
  ["정관", "편관", "정인", "편인", "겁재", "비견", "상관", "식신", "정재", "편재"],
  ["편재", "정재", "편관", "정관", "편인", "정인", "비견", "겁재", "식신", "상관"],
  ["정재", "편재", "정관", "편관", "정인", "편인", "겁재", "비견", "상관", "식신"],
  ["식신", "상관", "편재", "정재", "편관", "정관", "편인", "정인", "비견", "겁재"],
  ["상관", "식신", "정재", "편재", "정관", "편관", "정인", "편인", "겁재", "비견"],
];

export const ELEMENT_GENERATES: Record<Element, Element> = {
  목: "화",
  화: "토",
  토: "금",
  금: "수",
  수: "목",
};

export const ELEMENT_CONTROLS: Record<Element, Element> = {
  목: "토",
  토: "수",
  수: "화",
  화: "금",
  금: "목",
};

export const CHUNG_PAIRS: [Branch, Branch][] = [
  ["자", "오"],
  ["축", "미"],
  ["인", "신"],
  ["묘", "유"],
  ["진", "술"],
  ["사", "해"],
];

export const HAE_PAIRS: [Branch, Branch][] = [
  ["자", "미"],
  ["축", "오"],
  ["인", "사"],
  ["묘", "진"],
  ["신", "해"],
  ["유", "술"],
];

export const HAP_PAIRS: [Branch, Branch][] = [
  ["자", "축"],
  ["인", "해"],
  ["묘", "술"],
  ["진", "유"],
  ["사", "신"],
  ["오", "미"],
];

export const PA_PAIRS: [Branch, Branch][] = [
  ["자", "유"],
  ["축", "진"],
  ["인", "해"],
  ["묘", "오"],
  ["사", "신"],
  ["미", "술"],
];

export const HYEONG_GROUPS: Branch[][] = [
  ["인", "사", "신"],
  ["축", "술", "미"],
  ["자", "묘"],
];

export const ENGINE_VERSION = "1.0.0";
