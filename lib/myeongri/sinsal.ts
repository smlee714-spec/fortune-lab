import type { Branch } from "./constants";
import type { FourPillarsResult, SinsalItem, SinsalResult } from "./types";

const PILLAR_LABELS = ["년주", "월주", "일주", "시주"];

const DOHWA: Branch[] = ["자", "오", "묘", "유"];

/** 역마: 삼합 기준 */
const YEOKMA_BY_GROUP: Record<Branch, Branch> = {
  인: "신",
  오: "신",
  술: "신",
  신: "인",
  자: "인",
  진: "인",
  사: "해",
  유: "해",
  축: "해",
  해: "사",
  묘: "사",
  미: "사",
};

const CHEONUI: Record<string, Branch[]> = {
  갑: ["축", "미"],
  을: ["자", "신"],
  병: ["해", "유"],
  정: ["해", "유"],
  무: ["축", "미"],
  기: ["자", "신"],
  경: ["축", "미"],
  신: ["인", "오"],
  임: ["묘", "사"],
  계: ["묘", "사"],
};

const HWAGAE_BY_DAY_BRANCH: Partial<Record<Branch, Branch>> = {
  인: "술",
  오: "술",
  술: "술",
  해: "축",
  묘: "미",
  미: "축",
  신: "진",
  자: "진",
  진: "진",
  사: "축",
  유: "술",
  축: "술",
};

function hasBranch(branches: Branch[], target: Branch): boolean {
  return branches.includes(target);
}

function branchPositions(
  pillars: FourPillarsResult,
  target: Branch
): string[] {
  const cells = [pillars.year, pillars.month, pillars.day, pillars.hour];
  return cells
    .map((c, i) => (c.branch === target ? PILLAR_LABELS[i] : null))
    .filter((x): x is string => x !== null);
}

export function computeSinsal(pillars: FourPillarsResult): SinsalResult {
  const items: SinsalItem[] = [];
  const branches: Branch[] = [
    pillars.year.branch,
    pillars.month.branch,
    pillars.day.branch,
    pillars.hour.branch,
  ];
  const yearBranch = pillars.year.branch;
  const dayBranch = pillars.day.branch;
  const dayStem = pillars.dayMaster;

  for (const b of DOHWA) {
    if (hasBranch(branches, b)) {
      items.push({
        id: `dohwa-${b}`,
        name: "도화살",
        type: "인연·매력",
        basis: `지지 ${b}`,
        pillars: branchPositions(pillars, b),
        description: "인연·대인관계에서 매력이 드러나기 쉬운 기운입니다.",
      });
    }
  }

  const yeokmaTarget = YEOKMA_BY_GROUP[yearBranch];
  if (yeokmaTarget && hasBranch(branches, yeokmaTarget)) {
    items.push({
      id: "yeokma",
      name: "역마살",
      type: "이동·변화",
      basis: `년지 ${yearBranch} 기준 역마 ${yeokmaTarget}`,
      pillars: branchPositions(pillars, yeokmaTarget),
      description: "이동·변화·해외·전환의 기운이 강합니다.",
    });
  }

  const cheonuiBranches = CHEONUI[dayStem] ?? [];
  for (const cb of cheonuiBranches) {
    if (hasBranch(branches, cb)) {
      items.push({
        id: `cheonui-${cb}`,
        name: "천을귀인",
        type: "귀인·도움",
        basis: `일간 ${dayStem}`,
        pillars: branchPositions(pillars, cb),
        description: "어려울 때 도움을 주는 귀인의 기운입니다.",
      });
    }
  }

  const hwagae = HWAGAE_BY_DAY_BRANCH[dayBranch];
  if (hwagae && hasBranch(branches, hwagae)) {
    items.push({
      id: "hwagae",
      name: "화개살",
      type: "예술·고독",
      basis: `일지 ${dayBranch}`,
      pillars: branchPositions(pillars, hwagae),
      description: "예술·종교·학문에 관심이 깊어지기 쉬운 기운입니다.",
    });
  }

  const unique = items.filter(
    (item, idx, arr) => arr.findIndex((x) => x.id === item.id) === idx
  );

  return {
    items: unique,
    summary:
      unique.length > 0
        ? `${unique.map((i) => i.name).join(", ")} 등이 검출되었습니다.`
        : "두드러진 신살이 적어 안정적인 편입니다.",
  };
}
