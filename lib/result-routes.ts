import type { Gender } from "./types";

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
  /** 메뉴에 표시되는 쉬운 제목 */
  title: string;
  /** 메뉴 한 줄 설명 (전문 용어 없이) */
  description: string;
  /** 클릭을 유도하는 짧은 문구 */
  hook: string;
  icon: string;
  /** 상세 페이지 부제 — 전문 용어 */
  technicalTitle: string;
  /** 상세 페이지 용어 설명 */
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
      "사주 원국은 태어난 년·월·일·시 네 기둥(四柱)으로 이루어진 나의 기본 틀입니다. 각 기둥은 천간(하늘의 기운)과 지지(땅의 기운) 두 글자로 구성되며, 합쳐서 여덟 글자를 사주팔자(八字)라고 합니다. 이 여덟 글자가 나의 성향·재능·운의 바탕이 됩니다.",
  },
  {
    section: "elements",
    title: "타고난 기운",
    description: "나 안에 흐르는 다섯 가지 에너지",
    hook: "목·화·토·금·수, 나에게 어떤 기운이 많을까요?",
    icon: "氣",
    technicalTitle: "오행 분석 (五行)",
    termGuide:
      "오행(五行)은 목(木)·화(火)·토(土)·금(金)·수(水) 다섯 가지 기운으로 우주와 인간을 설명하는 틀입니다. 사주 여덟 글자에 각 기운이 몇 번 나오는지 세어, 어떤 성향이 강하고 부족한지 봅니다. 예를 들어 화(火)가 많으면 열정적이고, 수(水)가 많으면 지혜롭고 유연한 편으로 해석합니다.",
  },
  {
    section: "tengods",
    title: "성격과 재능",
    description: "나의 성향, 재능, 돈·일·관계 패턴",
    hook: "나는 어떤 타입의 사람일까요?",
    icon: "才",
    technicalTitle: "십성 분석 (十星)",
    termGuide:
      "십성(十星)은 나(일간)를 기준으로 다른 글자와의 관계를 열 가지 유형으로 나눈 것입니다. 비견·겁재는 자아와 경쟁, 식신·상관은 표현과 재능, 편재·정재는 돈과 재물, 편관·정관은 일과 책임, 편인·정인은 학습과 보호를 의미합니다. 어떤 십성이 많은지에 따라 성격과 적성이 달라집니다.",
  },
  {
    section: "strength",
    title: "나의 에너지",
    description: "에너지가 넘치는 편인지, 섬세한 편인지",
    hook: "나는 주도형일까, 협력형일까?",
    icon: "力",
    technicalTitle: "신강 · 신약 (身強 · 身弱)",
    termGuide:
      "신강(身強)은 일간(나)의 힘이 충분히 강한 상태이고, 신약(身弱)은 상대적으로 부드럽고 주변의 영향을 많이 받는 상태입니다. 신강이면 추진력·자립심이 강하고, 신약이면 섬세함·공감력이 뛰어납니다. 좋고 나쁨이 아니라 에너지를 쓰는 방식의 차이입니다.",
  },
  {
    section: "stars",
    title: "특별한 운명",
    description: "나만의 매력, 변화, 귀인의 기운",
    hook: "숨겨진 재능이나 귀인이 있을까요?",
    icon: "星",
    technicalTitle: "살 · 귀인 (殺 · 貴人)",
    termGuide:
      "살(殺)은 사주에 특별한 기운이 모인 것으로, 도화살(매력·인기), 역마살(이동·변화), 화개살(예술·직관) 등이 있습니다. 귀인(貴人)은 어려울 때 도움을 주는 좋은 기운으로, 천을귀인·문창귀인·천덕귀인 등이 있습니다. 살은 주의점과 강점이 함께 있고, 귀인은 기회와 도움을 뜻합니다.",
  },
  {
    section: "conflicts",
    title: "조심해야 할 점",
    description: "관계·일·돈에서 미리 알아두면 좋은 것",
    hook: "갈등이나 변화가 생기기 쉬운 패턴이 있을까요?",
    icon: "慎",
    technicalTitle: "형 · 충 · 파 · 해 · 합",
    termGuide:
      "사주 지지(땅의 기운)끼리 특별한 관계가 생기면 형충파해(刑沖破害合)로 봅니다. 충(衝)은 부딪힘과 변화, 형(刑)은 마찰과 긴장, 파(破)는 기존 것이 깨짐, 해(害)는 미묘한 불편함, 합(合)은 조화와 결합을 의미합니다. 나쁜 것만은 아니며, 변화의 시기를 미리 알아두면 대비하기 좋습니다.",
  },
  {
    section: "bigluck",
    title: "인생의 큰 흐름",
    description: "10년마다 바뀌는 인생의 큰 물결",
    hook: "앞으로 10년, 어떤 흐름이 올까요?",
    icon: "運",
    technicalTitle: "대운 분석 (大運)",
    termGuide:
      "대운(大運)은 약 10년 단위로 바뀌는 인생의 큰 흐름입니다. 언제 성장기가 오고, 언제 정리·휴식기가 오는지 큰 그림을 보여 줍니다. 직업·이사·결혼·창업처럼 인생의 중요한 선택을 할 때 참고하면 도움이 됩니다.",
  },
  {
    section: "yearluck",
    title: "올해 운세",
    description: "올해·내년·후년, 3년간의 흐름",
    hook: "올해는 어떤 해가 될까요?",
    icon: "歲",
    technicalTitle: "세운 분석 (歲運)",
    termGuide:
      "세운(歲運)은 매년 바뀌는 한 해의 운입니다. 대운이 큰 물결이라면, 세운은 그해의 날씨와 같습니다. 올해 돈·연애·직업·건강 중 어디에 기운이 모이는지, 내년과 비교해 어떤 차이가 있는지 살펴볼 수 있습니다.",
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
}

export function parseResultParams(searchParams: URLSearchParams): ResultQueryParams | null {
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const gender = searchParams.get("gender");

  if (!date || !time || !isValidGender(gender)) return null;
  return { date, time, gender };
}

export function buildResultQuery(params: ResultQueryParams): string {
  const q = new URLSearchParams({
    date: params.date,
    time: params.time,
    gender: params.gender,
  });
  return q.toString();
}

export function buildResultPath(
  path: "/result" | `/result/${ResultSection}`,
  params: ResultQueryParams
): string {
  return `${path}?${buildResultQuery(params)}`;
}

export function getMenuItem(section: ResultSection): AnalysisMenuItem {
  const item = ANALYSIS_MENUS.find((m) => m.section === section);
  if (!item) throw new Error(`Unknown section: ${section}`);
  return item;
}
