import type { Element, Gender } from "./types";
import type { SajuResult } from "./types";
import type { DailyFortune, FortuneItem, FortuneLevel } from "./fortune-types";

const LUCKY_COLORS: Record<
  Element,
  { name: string; hex: string; meaning: string }[]
> = {
  목: [
    { name: "에메랄드", hex: "#2d6a4f", meaning: "성장과 새로운 시작의 기운" },
    { name: "청록", hex: "#40916c", meaning: "유연함과 조화의 기운" },
  ],
  화: [
    { name: "코랄", hex: "#e07a5f", meaning: "열정과 따뜻한 인연의 기운" },
    { name: "버건디", hex: "#9b2226", meaning: "깊은 집중력과 추진력" },
  ],
  토: [
    { name: "샌드", hex: "#c9a227", meaning: "안정과 풍요의 기운" },
    { name: "크림", hex: "#f5f0e8", meaning: "포용과 균형의 기운" },
  ],
  금: [
    { name: "실버", hex: "#a8b8c8", meaning: "결단력과 명예의 기운" },
    { name: "화이트", hex: "#e8e8e8", meaning: "정화와 새로운 전환" },
  ],
  수: [
    { name: "네이비", hex: "#1d3557", meaning: "지혜와 깊은 통찰" },
    { name: "인디고", hex: "#5a9fd4", meaning: "직관과 영감의 기운" },
  ],
};

const TODAY_TEMPLATES: string[][] = [
  [
    "오늘은 주변과의 소통이 빛을 발하는 날입니다. 가벼운 대화 하나가 좋은 기회로 이어질 수 있어요.",
    "차분하게 하루를 시작하면 오후에 뜻밖의 행운이 찾아옵니다. 서두르지 마세요.",
    "작은 결정 하나가 큰 흐름을 바꿀 수 있는 날입니다. 직감을 믿어도 좋습니다.",
  ],
  [
    "에너지가 고르게 흐르는 날입니다. 계획했던 일을 하나씩 처리하기 좋습니다.",
    "오늘은 휴식과 재충전의 기운이 강합니다. 무리하지 않는 것이 최선입니다.",
    "새로운 정보가 들어오는 날입니다. 메모해 두면 나중에 도움이 됩니다.",
  ],
  [
    "인내가 필요한 하루지만, 끝까지 가면 만족스러운 결과가 기다립니다.",
    "감정의 기복이 있을 수 있으나, 저녁 무렵 마음이 한결 가벼워집니다.",
    "예상치 못한 만남이나 소식이 찾아올 수 있는 활기찬 날입니다.",
  ],
];

const LOVE_TEMPLATES: Record<Gender, string[][]> = {
  male: [
    [
      "상대방의 마음을 존중하는 태도가 관계를 깊게 만듭니다. 진심 어린 한마디가 통합니다.",
      "새로운 인연이 스치듯 다가올 수 있습니다. 자연스러운 대화를 시작해 보세요.",
      "기존 관계에서 오해가 풀리는 기운입니다. 먼저 연락해 보는 것도 좋습니다.",
    ],
    [
      "감정 표현을 아끼지 않으면 관계가 한층 따뜻해집니다.",
      "오늘은 혼자만의 시간도 소중합니다. 자신을 돌아보며 마음을 정리해 보세요.",
      "공통 관심사를 통해 가까워질 수 있는 날입니다.",
    ],
  ],
  female: [
    [
      "섬세한 배려가 상대에게 깊은 인상을 남깁니다. 작은 선물이나 메시지도 좋습니다.",
      "마음을 열면 좋은 인연이 다가옵니다. 편안한 분위기에서 대화를 나눠 보세요.",
      "오래된 인연과의 재회, 혹은 새로운 설렘이 찾아올 수 있습니다.",
    ],
    [
      "감정을 솔직하게 나누면 관계가 더욱 단단해집니다.",
      "자신을 아끼는 마음이 더 매력적으로 보이는 날입니다.",
      "우연한 만남이 특별한 인연이 될 수 있는 기운이 있습니다.",
    ],
  ],
};

const WEALTH_TEMPLATES: string[][] = [
  [
    "지출보다 수입에 신경 쓰기 좋은 날입니다. 작은 절약이 모여 큰 여유가 됩니다.",
    "투자보다는 현재 자산을 점검하고 정리하기에 적합한 시기입니다.",
    "예상치 못한 소득이나 혜택이 생길 수 있는 길한 기운이 있습니다.",
  ],
  [
    "충동구매를 자제하면 재물운이 더욱 안정됩니다. 필요한 것만 구매하세요.",
    "재테크 관련 정보를 공부하기 좋은 날입니다. 신중한 판단이 중요합니다.",
    "주변의 조언 중 실속 있는 것을 골라 따르면 도움이 됩니다.",
  ],
];

const CAREER_TEMPLATES: string[][] = [
  [
    "업무에서 주도적으로 나서면 인정받을 수 있습니다. 자신감을 가지세요.",
    "동료와의 협업이 빛을 발하는 날입니다. 의견을 적극적으로 나눠 보세요.",
    "새로운 프로젝트나 아이디어를 제안하기 좋은 시기입니다.",
  ],
  [
    "꾸준함이 실력으로 인정받는 날입니다. 디테일에 신경 쓰면 좋습니다.",
    "상사나 선배의 조언에 귀 기울이면 방향을 잡는 데 도움이 됩니다.",
    "학습과 자기계발에 투자하면 장기적으로 큰 보상이 따릅니다.",
  ],
];

const HEALTH_TEMPLATES: string[][] = [
  [
    "가벼운 스트레칭이나 산책이 컨디션 회복에 도움이 됩니다.",
    "수분 섭취와 규칙적인 식사를 챙기면 활력이 유지됩니다.",
    "충분한 수면이 오늘의 건강운을 높이는 핵심입니다.",
  ],
  [
    "목과 어깨 긴장을 풀어 주면 하루가 편안해집니다.",
    "과로를 피하고 중간중간 휴식을 취하세요.",
    "야채와 따뜻한 음식이 몸의 균형을 맞추는 데 좋습니다.",
  ],
];

const OVERALL_TEMPLATES: string[][] = [
  [
    "전반적으로 균형 잡힌 하루입니다. 무리하지 않고 자신의 페이스를 유지하세요.",
    "작은 행운이 곳곳에 숨어 있는 날입니다. 긍정적인 마음가짐이 중요합니다.",
    "오늘의 선택이 내일의 기반이 됩니다. 신중하되 과감하게 움직여 보세요.",
  ],
  [
    "변화의 기운이 감도는 날입니다. 두려워하지 말고 한 걸음 내딛어 보세요.",
    "주변 사람들과의 관계가 하루의 키포인트입니다. 따뜻한 마음을 나누세요.",
    "내면의 힘을 믿으면 어떤 어려움도 잘 헤쳐 나갈 수 있습니다.",
  ],
];

function hashSeed(...values: number[]): number {
  let seed = 0;
  for (const v of values) {
    seed = (seed * 31 + v) >>> 0;
  }
  return seed;
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function levelFromSeed(seed: number, offset: number): FortuneLevel {
  const raw = (seed + offset * 17) % 100;
  if (raw >= 82) return 5;
  if (raw >= 62) return 4;
  if (raw >= 38) return 3;
  if (raw >= 18) return 2;
  return 1;
}

function buildItem(
  title: string,
  templates: string[],
  seed: number,
  offset: number
): FortuneItem {
  const level = levelFromSeed(seed, offset);
  const detail = pick(templates, seed + offset);
  const summaries: Record<FortuneLevel, string> = {
    5: "최고의 흐름이 함께합니다",
    4: "전반적으로 좋은 기운",
    3: "무난하고 안정적인 흐름",
    2: "조심스럽게 행동하면 무난",
    1: "신중함이 행운을 부릅니다",
  };
  return { title, level, summary: summaries[level], detail };
}

function generateLuckyNumbers(seed: number, dayStemIdx: number, dayBranchIdx: number): number[] {
  const base = [
    (seed % 9) + 1,
    ((seed >> 3) % 45) + 1,
    ((dayStemIdx * 7 + dayBranchIdx * 3 + seed) % 99) + 1,
  ];
  const unique = [...new Set(base)].slice(0, 3);
  while (unique.length < 3) {
    const next = ((seed + unique.length * 11) % 99) + 1;
    if (!unique.includes(next)) unique.push(next);
  }
  return unique.sort((a, b) => a - b);
}

export function generateDailyFortune(result: SajuResult, today = new Date()): DailyFortune {
  const { birthInfo, day, dayMaster } = result;
  const seed = hashSeed(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
    birthInfo.year,
    birthInfo.month,
    birthInfo.day,
    day.stemIdx,
    day.branchIdx,
    birthInfo.gender === "male" ? 1 : 2
  );

  const dateLabel = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const lovePool = LOVE_TEMPLATES[birthInfo.gender];
  const loveTemplates = lovePool.flat();

  const colors = LUCKY_COLORS[dayMaster.element];
  const luckyColor = pick(colors, seed);

  return {
    dateLabel,
    today: buildItem("오늘의 운세", TODAY_TEMPLATES.flat(), seed, 1),
    love: buildItem("연애운", loveTemplates, seed, 2),
    wealth: buildItem("재물운", WEALTH_TEMPLATES.flat(), seed, 3),
    career: buildItem("직업운", CAREER_TEMPLATES.flat(), seed, 4),
    health: buildItem("건강운", HEALTH_TEMPLATES.flat(), seed, 5),
    overall: buildItem("총평", OVERALL_TEMPLATES.flat(), seed, 6),
    luckyNumbers: generateLuckyNumbers(seed, day.stemIdx, day.branchIdx),
    luckyColor,
  };
}
