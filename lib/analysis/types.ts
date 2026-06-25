import type { Element } from "../types";

export interface WonkukCell {
  char: string;
  element: Element;
}

export interface WonkukPillar {
  label: string;
  stem: WonkukCell;
  branch: WonkukCell;
}

export interface WonkukAnalysis {
  pillars: WonkukPillar[];
}

export interface OhaengAnalysis {
  counts: Record<Element, number>;
  abundant: Element[];
  lacking: Element[];
  summary: string;
  easyExplanation: string;
}

export type SipsungName =
  | "비견"
  | "겁재"
  | "식신"
  | "상관"
  | "편재"
  | "정재"
  | "편관"
  | "정관"
  | "편인"
  | "정인";

export interface SipsungItem {
  name: SipsungName;
  count: number;
  meaning: string;
  present: boolean;
}

export interface SipsungAnalysis {
  items: SipsungItem[];
  strong: SipsungName[];
  weak: SipsungName[];
  summary: string;
}

export type SinStrengthType = "신강" | "신약" | "중화";

export interface SinStrengthAnalysis {
  type: SinStrengthType;
  score: number;
  personality: string;
  work: string;
  money: string;
  relationship: string;
  summary: string;
}

export interface SalGuinItem {
  id: string;
  name: string;
  detected: boolean;
  reason: string;
  goodPoints: string;
  caution: string;
  realistic: string;
}

export interface SalGuinAnalysis {
  items: SalGuinItem[];
  detectedCount: number;
}

export type RelationType = "충" | "형" | "파" | "해" | "합";

export interface HyungchungItem {
  id: string;
  type: RelationType;
  label: string;
  chars: string;
  detected: boolean;
  conflict: string;
  relationship: string;
  work: string;
  money: string;
  health: string;
  advice: string;
}

export interface HyungchungAnalysis {
  items: HyungchungItem[];
  detectedCount: number;
}

export interface DaeunPeriod {
  startAge: number;
  endAge: number;
  stem: string;
  branch: string;
  keyword: string;
  money: string;
  career: string;
  love: string;
  health: string;
}

export interface DaeunAnalysis {
  direction: string;
  periods: DaeunPeriod[];
  summary: string;
}

export interface SeunYearItem {
  year: number;
  label: string;
  keyword: string;
  overall: string;
  money: string;
  love: string;
  career: string;
  health: string;
}

export interface SeunAnalysis {
  years: SeunYearItem[];
  summary: string;
}

export interface FullAnalysis {
  wonkuk: WonkukAnalysis;
  ohaeng: OhaengAnalysis;
  sipsung: SipsungAnalysis;
  sinStrength: SinStrengthAnalysis;
  salGuin: SalGuinAnalysis;
  hyungchung: HyungchungAnalysis;
  daeun: DaeunAnalysis;
  seun: SeunAnalysis;
}

export const SIPSUNG_MEANINGS: Record<SipsungName, string> = {
  비견: "나와 같은 기운. 자립심, 동료, 경쟁을 상징합니다.",
  겁재: "비견과 비슷하나 더 강한 경쟁·분산의 기운입니다.",
  식신: "표현, 창의, 여유, 재능 발휘를 의미합니다.",
  상관: "재치, 변화, 도전. 때로는 예민함과 충돌도 동반합니다.",
  편재: "큰 재물, 사업, 활동적인 수입을 뜻합니다.",
  정재: "안정적 수입, 꾸준한 재물, 계획적 소비를 뜻합니다.",
  편관: "도전, 압박, 변화 속 성장의 기운입니다.",
  정관: "명예, 질서, 책임감, 조직 생활과 잘 맞습니다.",
  편인: "직관, 학습, 독특한 재능과 깊은 사고를 의미합니다.",
  정인: "학문, 보호, 안정적 성장과 귀인의 도움을 의미합니다.",
};

export const AI_SAMPLE_QUESTIONS = [
  "올해 사업해도 될까요?",
  "이직해도 될까요?",
  "연애운은 어떤가요?",
  "돈은 언제 좋아지나요?",
  "창업운이 있나요?",
] as const;
