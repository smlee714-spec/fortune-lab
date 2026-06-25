import type { Element } from "@/lib/types";

/** 천간·지지·십성 등 한자 → 한글 매핑 */
export const CN_STEM_TO_KR: Record<string, string> = {
  甲: "갑",
  乙: "을",
  丙: "병",
  丁: "정",
  戊: "무",
  己: "기",
  庚: "경",
  辛: "신",
  壬: "임",
  癸: "계",
};

export const CN_BRANCH_TO_KR: Record<string, string> = {
  子: "자",
  丑: "축",
  寅: "인",
  卯: "묘",
  辰: "진",
  巳: "사",
  午: "오",
  未: "미",
  申: "신",
  酉: "유",
  戌: "술",
  亥: "해",
};

export const CN_WUXING_TO_KR: Record<string, Element> = {
  木: "목",
  火: "화",
  土: "토",
  金: "금",
  水: "수",
};

export const CN_SHISHEN_TO_KR: Record<string, string> = {
  比肩: "비견",
  劫财: "겁재",
  食神: "식신",
  伤官: "상관",
  偏财: "편재",
  正财: "정재",
  偏官: "편관",
  七杀: "편관",
  正官: "정관",
  偏印: "편인",
  正印: "정인",
  日主: "일주",
};

export const CN_DISHI_TO_KR: Record<string, string> = {
  长生: "장생",
  沐浴: "목욕",
  冠带: "관대",
  临官: "건록",
  帝旺: "제왕",
  衰: "쇠",
  病: "병",
  死: "사",
  墓: "묘",
  绝: "절",
  胎: "태",
  养: "양",
};

export const KR_BRANCHES = [
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

export const CHUNG_PAIRS: [string, string][] = [
  ["자", "오"],
  ["축", "미"],
  ["인", "신"],
  ["묘", "유"],
  ["진", "술"],
  ["사", "해"],
];

export const HAP_BRANCH_PAIRS: [string, string][] = [
  ["자", "축"],
  ["인", "해"],
  ["묘", "술"],
  ["진", "유"],
  ["사", "신"],
  ["오", "미"],
];

export const HAP_STEM_PAIRS: [string, string][] = [
  ["갑", "기"],
  ["을", "경"],
  ["병", "신"],
  ["정", "임"],
  ["무", "계"],
];

export const ENGINE_VERSION = "1.0.0-lunar";

export function toKrStem(cn: string): string {
  return CN_STEM_TO_KR[cn] ?? cn;
}

export function toKrBranch(cn: string): string {
  return CN_BRANCH_TO_KR[cn] ?? cn;
}

export function toKrShiShen(cn: string): string {
  return CN_SHISHEN_TO_KR[cn] ?? cn;
}

export function toKrDiShi(cn: string): string {
  return CN_DISHI_TO_KR[cn] ?? cn;
}

export function toKrWuXing(cn: string): Element | string {
  return CN_WUXING_TO_KR[cn] ?? cn;
}

export function parseWuXingPair(wx: string): Element[] {
  const chars = [...wx];
  return chars
    .map((c) => CN_WUXING_TO_KR[c])
    .filter((e): e is Element => !!e);
}
