import type { SajuResult } from "../types";
import type { SalGuinAnalysis, SalGuinItem } from "./types";

function getBranchSet(result: SajuResult): Set<string> {
  return new Set([
    result.year.branch,
    result.month.branch,
    result.day.branch,
    result.hour.branch,
  ]);
}

function hasAny(branches: Set<string>, targets: string[]): boolean {
  return targets.some((t) => branches.has(t));
}

function hasBranch(branches: Set<string>, target: string): boolean {
  return branches.has(target);
}

function buildItem(
  id: string,
  name: string,
  detected: boolean,
  reason: string,
  goodPoints: string,
  caution: string,
  realistic: string
): SalGuinItem {
  return { id, name, detected, reason, goodPoints, caution, realistic };
}

/** 살/귀인 감지 — 샘플 규칙 (추후 정밀 로직 교체 가능) */
export function analyzeSalGuin(result: SajuResult): SalGuinAnalysis {
  const branches = getBranchSet(result);
  const dayStem = result.day.stem;
  const monthBranch = result.month.branch;

  const items: SalGuinItem[] = [
    buildItem(
      "dohwa",
      "도화살",
      hasAny(branches, ["자", "오", "묘", "유"]),
      "자·오·묘·유 중 하나 이상이 사주 지지에 있을 때 형성됩니다.",
      "매력, 인기, 표현력이 좋아지는 기운입니다.",
      "감정 기복이나 관계에서의 오해에 주의가 필요합니다.",
      "사람을 끌어당기는 힘이 있습니다. 첫인상과 소통에서 강점을 살리세요."
    ),
    buildItem(
      "hongyeom",
      "홍염살",
      hasAny(branches, ["오", "유"]) && result.birthInfo.gender === "male" ? true : hasAny(branches, ["인", "신"]),
      "지지 조합 또는 일간·성별에 따라 홍염 기운이 강해질 수 있습니다.",
      "열정적이고 감각적인 매력이 있습니다.",
      "감정에 휩쓸리면 관계·소비에서 실수가 생길 수 있습니다.",
      "연애·예술·대인관계에서 에너지가 살아납니다. 감정을 건강하게 표현하세요."
    ),
    buildItem(
      "yeokma",
      "역마살",
      hasAny(branches, ["인", "신", "사", "해"]),
      "인·신·사·해 중 지지에 있으면 이동·변화의 기운이 강합니다.",
      "활동성, 해외·이동, 새로운 환경 적응력이 좋습니다.",
      "한곳에 정착하기 어렵거나 불안정감이 생길 수 있습니다.",
      "이직·유학·출장·창업 등 변화가 많은 삶과 잘 맞을 수 있습니다."
    ),
    buildItem(
      "hwagae",
      "화개살",
      hasAny(branches, ["진", "술", "축", "미"]),
      "진·술·축·미 중 지지에 있으면 예술·종교·학문 기운이 강해집니다.",
      "직관, 예술성, 깊은 사고에 강점이 있습니다.",
      "현실 감각이 약해지거나 고립감을 느낄 수 있습니다.",
      "창작·연구·명상 등 혼자 집중하는 분야에서 재능을 발휘하기 좋습니다."
    ),
    buildItem(
      "baekho",
      "백호살",
      hasAny(branches, ["인", "신"]) && hasAny(branches, ["오", "자"]),
      "강한 금·화 기운이 겹치거나 특정 충 조합에서 형성될 수 있습니다.",
      "결단력과 추진력이 매우 강해집니다.",
      "성급한 결정, 다툼, 부상·사고에 유의하세요.",
      "위험을 감수하는 분야(군·경찰·스포츠·수술 등)와도 연결될 수 있습니다."
    ),
    buildItem(
      "goegang",
      "괴강살",
      hasAny(branches, ["진", "술", "경", "신"]),
      "진·술과 강한 금 기운이 만날 때 형성될 수 있습니다.",
      "강한 카리스마와 돌파력이 있습니다.",
      "고집과 충돌이 잦을 수 있습니다.",
      "어려운 상황을 뚫고 나가는 힘이 있습니다. 부드러운 소통을 병행하세요."
    ),
    buildItem(
      "yangin",
      "양인살",
      ["갑", "병", "무", "경", "임"].includes(dayStem) && hasAny(branches, ["묘", "오", "유", "자"]),
      "양간 일주와 특정 지지가 만날 때 형성될 수 있습니다.",
      "강한 자존심과 독립심, 추진력이 있습니다.",
      "고집·충돌·급한 성격에 주의하세요.",
      "자기 사업·전문직에서 두각을 나타낼 수 있습니다."
    ),
    buildItem(
      "chunul",
      "천을귀인",
      hasAny(branches, getChunulBranches(dayStem)),
      `${dayStem}일간 기준 천을귀인 지지(${getChunulBranches(dayStem).join("·")})가 사주에 있을 때.`,
      "위기 때 도움을 주는 귀인, 행운의 인연이 따릅니다.",
      "귀인에만 의존하면 스스로 성장이 늦어질 수 있습니다.",
      "멘토·선배·상사와의 관계를 소중히 하면 기회가 늘어납니다."
    ),
    buildItem(
      "munchang",
      "문창귀인",
      hasAny(branches, getMunchangBranches(dayStem)),
      `${dayStem}일간 기준 문창귀인 지지가 사주에 있을 때.`,
      "학습, 시험, 글쓰기, 창작 능력이 빛납니다.",
      "완벽주의로 스트레스를 받을 수 있습니다.",
      "공부·자격증·콘텐츠 제작 분야에서 성과를 내기 좋습니다."
    ),
    buildItem(
      "cheondeok",
      "천덕귀인",
      hasBranch(branches, getCheondeokBranch(monthBranch)),
      "월지 기준 천덕귀인 지지가 사주에 있을 때.",
      "위험을 면하고 좋은 운을 불러오는 보호 기운입니다.",
      "운에만 기대면 준비가 부족해질 수 있습니다.",
      "어려운 시기에도 의외의 도움이나 해결책이 나타날 수 있습니다."
    ),
    buildItem(
      "woldeok",
      "월덕귀인",
      hasBranch(branches, getWoldeokBranch(monthBranch)),
      "월지 기준 월덕귀인 지지가 사주에 있을 때.",
      "인덕·평판·조화로운 관계를 돕는 기운입니다.",
      "타인의 평가에 지나치게 신경 쓰면 피로해질 수 있습니다.",
      "조직·공동체에서 신뢰받는 이미지를 만들기 좋습니다."
    ),
  ];

  return {
    items,
    detectedCount: items.filter((i) => i.detected).length,
  };
}

function getChunulBranches(stem: string): string[] {
  const map: Record<string, string[]> = {
    갑: ["축", "미"],
    을: ["자", "신"],
    병: ["해", "유"],
    정: ["해", "유"],
    무: ["축", "미"],
    기: ["자", "신"],
    경: ["오", "인"],
    신: ["오", "인"],
    임: ["묘", "사"],
    계: ["묘", "사"],
  };
  return map[stem] ?? [];
}

function getMunchangBranches(stem: string): string[] {
  const map: Record<string, string[]> = {
    갑: ["사"],
    을: ["오"],
    병: ["신"],
    정: ["유"],
    무: ["신"],
    기: ["유"],
    경: ["해"],
    신: ["자"],
    임: ["인"],
    계: ["묘"],
  };
  return map[stem] ?? [];
}

function getCheondeokBranch(monthBranch: string): string {
  const branchMap: Record<string, string> = {
    자: "사",
    축: "신",
    인: "병",
    묘: "임",
    진: "신",
    사: "해",
    오: "갑",
    미: "계",
    신: "인",
    유: "병",
    술: "을",
    해: "신",
  };
  return branchMap[monthBranch] ?? "자";
}

function getWoldeokBranch(monthBranch: string): string {
  const branchMap: Record<string, string> = {
    자: "신",
    축: "경",
    인: "병",
    묘: "갑",
    진: "임",
    사: "신",
    오: "기",
    미: "갑",
    신: "경",
    유: "병",
    술: "을",
    해: "계",
  };
  return branchMap[monthBranch] ?? "자";
}
