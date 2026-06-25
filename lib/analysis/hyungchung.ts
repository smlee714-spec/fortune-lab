import type { SajuResult } from "../types";
import type { HyungchungAnalysis, HyungchungItem, RelationType } from "./types";

interface RelationRule {
  id: string;
  type: RelationType;
  label: string;
  chars: string;
  pair: [string, string];
  conflict: string;
  relationship: string;
  work: string;
  money: string;
  health: string;
  advice: string;
}

const RELATION_RULES: RelationRule[] = [
  {
    id: "jao",
    type: "충",
    label: "자오충",
    chars: "자 ↔ 오",
    pair: ["자", "오"],
    conflict: "수와 화가 정면으로 부딪히는 기운입니다.",
    relationship: "감정의 온도 차로 오해가 생기기 쉽습니다. 말을 끝까지 듣는 것이 중요합니다.",
    work: "급한 결정·갈등이 일할 수 있습니다. 한 박자 쉬고 판단하세요.",
    money: "충동 지출·급한 투자를 피하세요.",
    health: "심장·혈압·수면 리듬에 신경 쓰세요.",
    advice: "충돌이 곧 나쁜 것은 아닙니다. 변화의 계기로 활용하되, 성급함만 줄이세요.",
  },
  {
    id: "chukmi",
    type: "충",
    label: "축미충",
    chars: "축 ↔ 미",
    pair: ["축", "미"],
    conflict: "토 기운이 서로 흔들리는 조합입니다.",
    relationship: "고집·가치관 차이로 갈등이 생길 수 있습니다.",
    work: "조직 내 입장 차이가 드러날 수 있습니다.",
    money: "부동산·저장 자산 관련 결정은 신중히.",
    health: "소화·위장 관리가 필요합니다.",
    advice: "양보와 조율이 핵심입니다. 고집보다 목표를 우선하세요.",
  },
  {
    id: "insin",
    type: "충",
    label: "인신충",
    chars: "인 ↔ 신",
    pair: ["인", "신"],
    conflict: "목과 금이 충돌하는 기운입니다.",
    relationship: "관계에서 예민함·경쟁심이 올라갈 수 있습니다.",
    work: "이동·변경·경쟁 상황이 잦을 수 있습니다.",
    money: "계획 변경으로 지출이 늘 수 있습니다.",
    health: "간·호흡기·긴장성 통증에 유의.",
    advice: "변화를 두려워하지 말되, 몸과 마음의 휴식을 병행하세요.",
  },
  {
    id: "myoyu",
    type: "충",
    label: "묘유충",
    chars: "묘 ↔ 유",
    pair: ["묘", "유"],
    conflict: "목과 금의 또 다른 충 조합입니다.",
    relationship: "섬세한 감정이 상처받기 쉬운 시기입니다.",
    work: "비판·피드백에 예민해질 수 있습니다.",
    money: "작은 지출이 모여 부담이 될 수 있습니다.",
    health: "신경성·두통·눈 피로에 주의.",
    advice: "완벽을 요구하기보다 80% 만족으로 스트레스를 줄이세요.",
  },
  {
    id: "jinsul",
    type: "충",
    label: "진술충",
    chars: "진 ↔ 술",
    pair: ["진", "술"],
    conflict: "토끼리 충돌하는 기운으로 내면 갈등이 커질 수 있습니다.",
    relationship: "표현하지 않은 불만이 쌓일 수 있습니다.",
    work: "조직·팀 내 갈등 가능성.",
    money: "재물 이동·정리가 필요한 시기.",
    health: "스트레스성 소화불량·피부 트러블.",
    advice: "속마음을 적절히 표현하면 관계가 한결 가벼워집니다.",
  },
  {
    id: "sahae",
    type: "충",
    label: "사해충",
    chars: "사 ↔ 해",
    pair: ["사", "해"],
    conflict: "화와 수가 충돌하는 기운입니다.",
    relationship: "감정 기복·연락 문제가 생길 수 있습니다.",
    work: "방향 전환이 잦거나 계획이 바뀔 수 있습니다.",
    money: "급한 돈 문제·계약 변경에 유의.",
    health: "수분·체온·순환 관리.",
    advice: "변화를 받아들이되, 중요한 결정은 하루 미루는 것도 방법입니다.",
  },
  {
    id: "yinhaeng",
    type: "형",
    label: "인사신 형",
    chars: "인·사·신",
    pair: ["인", "사"],
    conflict: "형(刑)은 마찰·긴장·책임감을 키우는 기운입니다.",
    relationship: "친한 사람과도 의견 충돌이 있을 수 있습니다.",
    work: "책임·압박이 커지는 시기.",
    money: "법적·계약적 문제를 꼼꼼히.",
    health: "긴장·어깨·허리 통증.",
    advice: "갈등을 피하기보다 규칙과 역할을 명확히 하세요.",
  },
  {
    id: "japahae",
    type: "파",
    label: "자유파",
    chars: "자 ↔ 유",
    pair: ["자", "유"],
    conflict: "파(破)는 기존 구조가 깨지고 새로 정리되는 기운입니다.",
    relationship: "관계의 리셋·재정의가 필요할 수 있습니다.",
    work: "조직 개편·이직·역할 변경.",
    money: "지출 구조를 다시 짜기 좋은 시기.",
    health: "수면 패턴 점검.",
    advice: "무너짐은 정리의 기회입니다. 새 계획을 세워보세요.",
  },
  {
    id: "insahae",
    type: "해",
    label: "인해·申해",
    chars: "인 ↔ 해 / 신 ↔ 해",
    pair: ["인", "해"],
    conflict: "해(害)는 미묘한 불편함·오해를 만드는 기운입니다.",
    relationship: "친해 보이지만 속으로는 거리감이 생길 수 있습니다.",
    work: "배후 소통·오해에 주의.",
    money: "보증·대출·공동 투자 신중.",
    health: "스트레스성 면역 저하.",
    advice: "의심보다 확인하는 습관이 관계를 지킵니다.",
  },
  {
    id: "jachuk",
    type: "합",
    label: "자축합",
    chars: "자 + 축 → 토",
    pair: ["자", "축"],
    conflict: "합(合)은 조화·연결·결합의 기운입니다.",
    relationship: "관계가 안정되고 신뢰가 쌓이기 좋습니다.",
    work: "파트너십·협업·계약 성사에 유리.",
    money: "공동 재물·저축·부동산에 긍정적.",
    health: "규칙적인 생활이 컨디션을 올립니다.",
    advice: "좋은 인연·기회를 붙잡되, 과도한 의존은 피하세요.",
  },
  {
    id: "inyeom",
    type: "합",
    label: "인亥합",
    chars: "인 + 해 → 목",
    pair: ["인", "해"],
    conflict: "목 기운으로 화합하는 조합입니다.",
    relationship: "새로운 인연이 자연스럽게 이어집니다.",
    work: "새 프로젝트·학습·창업에 도움.",
    money: "성장 투자·자기계발 지출이 유리.",
    health: "야외 활동·가벼운 운동 추천.",
    advice: "새로운 시작을 두려워하지 마세요.",
  },
];

function getBranchSet(result: SajuResult): Set<string> {
  return new Set([
    result.year.branch,
    result.month.branch,
    result.day.branch,
    result.hour.branch,
  ]);
}

function detectRelation(branches: Set<string>, pair: [string, string]): boolean {
  return branches.has(pair[0]) && branches.has(pair[1]);
}

export function analyzeHyungchung(result: SajuResult): HyungchungAnalysis {
  const branches = getBranchSet(result);

  const items: HyungchungItem[] = RELATION_RULES.map((rule) => ({
    id: rule.id,
    type: rule.type,
    label: rule.label,
    chars: rule.chars,
    detected: detectRelation(branches, rule.pair),
    conflict: rule.conflict,
    relationship: rule.relationship,
    work: rule.work,
    money: rule.money,
    health: rule.health,
    advice: rule.advice,
  }));

  return {
    items,
    detectedCount: items.filter((i) => i.detected).length,
  };
}

export function getDetectedHyungchung(items: HyungchungItem[]): HyungchungItem[] {
  return items.filter((i) => i.detected);
}

export function getUndetectedHyungchung(items: HyungchungItem[]): HyungchungItem[] {
  return items.filter((i) => !i.detected);
}
