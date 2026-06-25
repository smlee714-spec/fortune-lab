import type { Gender } from "./types";
import type { ResultItemId } from "./result-modes";

export type { ResultItemId, ResultMode } from "./result-modes";
export {
  EXPERT_MODE_ITEMS,
  GENERAL_MODE_ITEMS,
  getResultModeItem,
  isValidResultItemId,
} from "./result-modes";

/** @deprecated 레거시 상세 섹션 */
export type ResultSection =
  | "basic"
  | "elements"
  | "tengods"
  | "strength"
  | "stars"
  | "conflicts"
  | "bigluck"
  | "yearluck";

export interface AnalysisMenuItem {
  section: ResultSection;
  title: string;
  description: string;
  hook: string;
  icon: string;
  technicalTitle: string;
  termGuide: string;
}

export const ANALYSIS_MENUS: AnalysisMenuItem[] = [
  {
    section: "basic",
    title: "내 사주의 기본",
    description: "태어난 날·시간으로 읽는 나의 설계도",
    hook: "내 사주가 어떻게 생겼는지 확인해 보세요",
    icon: "命",
    technicalTitle: "사주 원국 (四柱原局)",
    termGuide:
      "사주 원국은 태어난 년·월·일·시 네 기둥(四柱)으로 이루어진 나의 기본 틀입니다.",
  },
  {
    section: "elements",
    title: "타고난 기운",
    description: "나 안에 흐르는 다섯 가지 에너지",
    hook: "목·화·토·금·수, 나에게 어떤 기운이 많을까요?",
    icon: "氣",
    technicalTitle: "오행 분석 (五行)",
    termGuide: "오행(五行)은 목·화·토·금·수 다섯 기운의 분포입니다.",
  },
  {
    section: "tengods",
    title: "성격과 재능",
    description: "나의 성향, 재능, 돈·일·관계 패턴",
    hook: "나는 어떤 타입의 사람일까요?",
    icon: "才",
    technicalTitle: "십성 분석 (十星)",
    termGuide: "십성(十星)은 일간 기준 열 가지 관계 유형입니다.",
  },
  {
    section: "strength",
    title: "나의 에너지",
    description: "에너지가 넘치는 편인지, 섬세한 편인지",
    hook: "나는 주도형일까, 협력형일까?",
    icon: "力",
    technicalTitle: "신강 · 신약 (身強 · 身弱)",
    termGuide: "신강·신약은 일간 힘의 강약을 뜻합니다.",
  },
  {
    section: "stars",
    title: "특별한 운명",
    description: "나만의 매력, 변화, 귀인의 기운",
    hook: "숨겨진 재능이나 귀인이 있을까요?",
    icon: "星",
    technicalTitle: "살 · 귀인 (殺 · 貴人)",
    termGuide: "살·귀인은 사주의 특수 기운입니다.",
  },
  {
    section: "conflicts",
    title: "조심해야 할 점",
    description: "관계·일·돈에서 미리 알아두면 좋은 것",
    hook: "갈등이나 변화가 생기기 쉬운 패턴이 있을까요?",
    icon: "慎",
    technicalTitle: "형 · 충 · 파 · 해 · 합",
    termGuide: "형충파해합은 지지·천간 간의 특수 관계입니다.",
  },
  {
    section: "bigluck",
    title: "인생의 큰 흐름",
    description: "10년마다 바뀌는 인생의 큰 물결",
    hook: "앞으로 10년, 어떤 흐름이 올까요?",
    icon: "運",
    technicalTitle: "대운 분석 (大運)",
    termGuide: "대운(大運)은 10년 단위 인생의 큰 흐름입니다.",
  },
  {
    section: "yearluck",
    title: "올해 운세",
    description: "올해·내년·후년, 3년간의 흐름",
    hook: "올해는 어떤 해가 될까요?",
    icon: "歲",
    technicalTitle: "세운 분석 (歲運)",
    termGuide: "세운(歲運)은 매년 바뀌는 한 해의 운입니다.",
  },
];

const VALID_SECTIONS = new Set<ResultSection>(ANALYSIS_MENUS.map((m) => m.section));

export function isValidSection(value: string): value is ResultSection {
  return VALID_SECTIONS.has(value as ResultSection);
}

export function isValidGender(value: string | null): value is Gender {
  return value === "male" || value === "female";
}

export interface ResultQueryParams {
  date: string;
  time: string;
  gender: Gender;
  mbti?: string;
}

export function parseResultParams(searchParams: URLSearchParams): ResultQueryParams | null {
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const gender = searchParams.get("gender");
  const mbtiRaw = searchParams.get("mbti");

  if (!date || !time || !isValidGender(gender)) return null;

  const params: ResultQueryParams = { date, time, gender };
  if (mbtiRaw?.trim()) {
    params.mbti = mbtiRaw.trim().toUpperCase();
  }
  return params;
}

export function buildResultQuery(params: ResultQueryParams): string {
  const q = new URLSearchParams({
    date: params.date,
    time: params.time,
    gender: params.gender,
  });
  if (params.mbti) {
    q.set("mbti", params.mbti);
  }
  return q.toString();
}

export function buildResultPath(
  path: "/result" | `/result/${ResultSection}`,
  params: ResultQueryParams
): string {
  return `${path}?${buildResultQuery(params)}`;
}

export function buildResultItemPath(
  itemId: ResultItemId,
  params: ResultQueryParams
): string {
  return `/result/item/${itemId}?${buildResultQuery(params)}`;
}

export function getMenuItem(section: ResultSection): AnalysisMenuItem {
  const item = ANALYSIS_MENUS.find((m) => m.section === section);
  if (!item) throw new Error(`Unknown section: ${section}`);
  return item;
}
