export type ResultMode = "general" | "expert";

export type GeneralItemId =
  | "summary"
  | "love"
  | "wealth"
  | "career"
  | "health"
  | "advice";

export type ExpertItemId =
  | "pillars"
  | "elements"
  | "tengods"
  | "twelve-stages"
  | "sinsal"
  | "relations"
  | "yongsin"
  | "huisin"
  | "daeun"
  | "seun"
  | "wolun"
  | "ilun";

export type ResultItemId = GeneralItemId | ExpertItemId;

export interface ResultModeItem {
  id: ResultItemId;
  mode: ResultMode;
  title: string;
  icon: string;
  hook: string;
  /** 명리학·학문적 설명 (교육용) */
  technicalGuide: string;
}

export const GENERAL_MODE_ITEMS: ResultModeItem[] = [
  {
    id: "summary",
    mode: "general",
    title: "총평",
    icon: "✦",
    hook: "오늘 하루의 전체 흐름",
    technicalGuide:
      "총평은 사주 원국·대운·세운·일운 등 계산된 명리 데이터와 오늘 날짜를 바탕으로, 하루 전반의 기운을 요약한 것입니다. 단정적 예언이 아니라 참고용 해석입니다.",
  },
  {
    id: "love",
    mode: "general",
    title: "연애운",
    icon: "❤️",
    hook: "인연·관계의 흐름",
    technicalGuide:
      "연애운은 일간·십성 중 정재·편재·도화 기운과 세운·일운의 합충 등을 참고해 관계 에너지를 읽습니다. 프로그램이 계산한 명리 JSON을 AI가 해석합니다.",
  },
  {
    id: "wealth",
    mode: "general",
    title: "재물운",
    icon: "💰",
    hook: "돈·재정의 흐름",
    technicalGuide:
      "재물운은 십성 중 재성(편재·정재)과 오행의 생극, 대운·세운의 재물 관련 기운을 종합해 봅니다.",
  },
  {
    id: "career",
    mode: "general",
    title: "직업운",
    icon: "💼",
    hook: "일·커리어의 방향",
    technicalGuide:
      "직업운은 관성(편관·정관)·식상·인성과 월주·대운의 흐름을 참고해 일과 성장의 기운을 해석합니다.",
  },
  {
    id: "health",
    mode: "general",
    title: "건강운",
    icon: "🏥",
    hook: "컨디션·에너지 관리",
    technicalGuide:
      "건강운은 오행의 균형(목·화·토·금·수)과 일운의 과다·부족 기운을 참고합니다. 의학적 진단을 대체하지 않습니다.",
  },
  {
    id: "advice",
    mode: "general",
    title: "오늘의 조언",
    icon: "💡",
    hook: "오늘 실천하면 좋은 한마디",
    technicalGuide:
      "오늘의 조언은 계산된 사주 데이터와 사용자 질문 맥락을 반영한 실용적 가이드입니다.",
  },
];

export const EXPERT_MODE_ITEMS: ResultModeItem[] = [
  {
    id: "pillars",
    mode: "expert",
    title: "사주팔자",
    icon: "命",
    hook: "년·월·일·시 네 기둥",
    technicalGuide:
      "사주팔자(四柱八字)는 태어난 년·월·일·시의 천간(天干)·지지(地支) 여덟 글자입니다. 입춘·절기 기준으로 월주가 정해지며, 일간(日干)이 나 자신을 뜻합니다.",
  },
  {
    id: "elements",
    mode: "expert",
    title: "오행",
    icon: "氣",
    hook: "목·화·토·금·수 분포",
    technicalGuide:
      "오행(五行)은 사주 여덟 글자에 실린 목·화·토·금·수 기운의 개수와 비율입니다. 생(生)·극(剋)·제화(制化)로 균형을 봅니다.",
  },
  {
    id: "tengods",
    mode: "expert",
    title: "십성",
    icon: "才",
    hook: "열 가지 관계 유형",
    technicalGuide:
      "십성(十星)은 일간을 기준으로 다른 글자와의 오행 관계를 비견·겁재·식신·상관·편재·정재·편관·정관·편인·정인으로 분류한 것입니다.",
  },
  {
    id: "twelve-stages",
    mode: "expert",
    title: "12운성",
    icon: "運",
    hook: "장생·목욕·제왕…",
    technicalGuide:
      "12운성(十二運星)은 일간이 각 지지에서 받는 기운의 강약을 장생·목욕·관대·건록·제왕·쇠·병·사·묘·절·태·양으로 표현합니다.",
  },
  {
    id: "sinsal",
    mode: "expert",
    title: "신살",
    icon: "星",
    hook: "도화·역마·귀인 등",
    technicalGuide:
      "신살(神殺)은 사주에 따라 붙는 특수 기호입니다. 길흉을 단정하기보다 성향·테마를 읽는 데 씁니다. 사주 전용 신살은 엔진 확장 예정입니다.",
  },
  {
    id: "relations",
    mode: "expert",
    title: "합충형파해",
    icon: "慎",
    hook: "지지·천간의 관계",
    technicalGuide:
      "합(合)·충(沖)·형(刑)·파(破)·해(害)는 지지·천간 간의 특수 관계입니다. 변화·갈등·결합의 테마를 읽습니다.",
  },
  {
    id: "yongsin",
    mode: "expert",
    title: "용신",
    icon: "用",
    hook: "균형을 맞추는 핵심 기운",
    technicalGuide:
      "용신(用神)은 사주의 균형을 위해 가장 필요한 오행·십성을 가리킵니다. 신강·신약과 계절·통근을 종합해 판단합니다.",
  },
  {
    id: "huisin",
    mode: "expert",
    title: "희신",
    icon: "喜",
    hook: "도움이 되는 기운",
    technicalGuide:
      "희신(喜神)은 용신을 돕거나 길한 방향으로 기운을 보태는 요소입니다. 용신과 함께 대운·세운 해석에 쓰입니다.",
  },
  {
    id: "daeun",
    mode: "expert",
    title: "대운",
    icon: "大",
    hook: "10년 단위 인생 흐름",
    technicalGuide:
      "대운(大運)은 월주에서 순·역행하며 약 10년마다 바뀌는 큰 운의 흐름입니다. 시작 나이는 절기 거리로 산출합니다.",
  },
  {
    id: "seun",
    mode: "expert",
    title: "세운",
    icon: "歲",
    hook: "해단위 운",
    technicalGuide:
      "세운(歲運)은 그해의 간지가 사주에 미치는 영향입니다. 대운과 겹쳐 올해·내년의 테마를 봅니다.",
  },
  {
    id: "wolun",
    mode: "expert",
    title: "월운",
    icon: "月",
    hook: "이달의 흐름",
    technicalGuide:
      "월운(月運)은 절기 기준 월간지가 만드는 한 달의 기운입니다. 세운 안에서 더 짧은 주기를 봅니다.",
  },
  {
    id: "ilun",
    mode: "expert",
    title: "일운",
    icon: "日",
    hook: "오늘 하루의 간지",
    technicalGuide:
      "일운(日運)은 오늘 날짜의 일진(日辰) 간지입니다. 세운·월운 아래에서 하루 단위의 세밀한 흐름을 참고합니다.",
  },
];

const ALL_ITEMS = [...GENERAL_MODE_ITEMS, ...EXPERT_MODE_ITEMS];
const ITEM_MAP = new Map(ALL_ITEMS.map((i) => [i.id, i]));

export function getResultModeItem(id: string): ResultModeItem | null {
  return ITEM_MAP.get(id as ResultItemId) ?? null;
}

export function isValidResultItemId(id: string): id is ResultItemId {
  return ITEM_MAP.has(id as ResultItemId);
}
