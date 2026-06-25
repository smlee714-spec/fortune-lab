import type { Branch } from "./constants";
import {
  CHUNG_PAIRS,
  HAE_PAIRS,
  HAP_PAIRS,
  HYEONG_GROUPS,
  PA_PAIRS,
} from "./constants";
import type { FourPillarsResult, RelationItem, RelationsResult } from "./types";

const PILLAR_LABELS = ["년주", "월주", "일주", "시주"];

function findPairs(
  branches: Branch[],
  pairs: [Branch, Branch][]
): { pair: [Branch, Branch]; indices: number[] }[] {
  const found: { pair: [Branch, Branch]; indices: number[] }[] = [];

  for (const [a, b] of pairs) {
    const indices: number[] = [];
    branches.forEach((br, i) => {
      if (br === a || br === b) indices.push(i);
    });
    const hasA = branches.includes(a);
    const hasB = branches.includes(b);
    if (hasA && hasB) {
      found.push({ pair: [a, b], indices });
    }
  }

  return found;
}

function findHyeong(branches: Branch[]): { group: Branch[]; indices: number[] }[] {
  const results: { group: Branch[]; indices: number[] }[] = [];

  for (const group of HYEONG_GROUPS) {
    const indices = branches
      .map((b, i) => (group.includes(b) ? i : -1))
      .filter((i) => i >= 0);

    if (group.length === 2 && indices.length >= 2) {
      results.push({ group, indices });
    }
    if (group.length === 3) {
      const matched = group.filter((g) => branches.includes(g));
      if (matched.length >= 2) {
        results.push({ group, indices });
      }
    }
  }

  return results;
}

export function computeRelations(pillars: FourPillarsResult): RelationsResult {
  const branches: Branch[] = [
    pillars.year.branch,
    pillars.month.branch,
    pillars.day.branch,
    pillars.hour.branch,
  ];

  const items: RelationItem[] = [];

  for (const { pair, indices } of findPairs(branches, HAP_PAIRS)) {
    items.push({
      kind: "합",
      label: `${pair[0]}${pair[1]}합`,
      participants: [pair[0], pair[1]],
      pillars: indices.map((i) => PILLAR_LABELS[i]),
      description: "지지가 합하여 조화·결합의 기운이 생깁니다.",
    });
  }

  for (const { pair, indices } of findPairs(branches, CHUNG_PAIRS)) {
    items.push({
      kind: "충",
      label: `${pair[0]}${pair[1]}충`,
      participants: [pair[0], pair[1]],
      pillars: indices.map((i) => PILLAR_LABELS[i]),
      description: "지지가 충하여 변화·갈등·이동의 기운이 강해집니다.",
    });
  }

  for (const { pair, indices } of findPairs(branches, HAE_PAIRS)) {
    items.push({
      kind: "해",
      label: `${pair[0]}${pair[1]}해`,
      participants: [pair[0], pair[1]],
      pillars: indices.map((i) => PILLAR_LABELS[i]),
      description: "지지가 해하여 관계·건강에서 미묘한 마찰이 생길 수 있습니다.",
    });
  }

  for (const { pair, indices } of findPairs(branches, PA_PAIRS)) {
    items.push({
      kind: "파",
      label: `${pair[0]}${pair[1]}파`,
      participants: [pair[0], pair[1]],
      pillars: indices.map((i) => PILLAR_LABELS[i]),
      description: "지지가 파하여 기존 구조가 흔들리거나 재정비가 필요합니다.",
    });
  }

  for (const { group, indices } of findHyeong(branches)) {
    items.push({
      kind: "형",
      label: `${group.join("")}형`,
      participants: [...group],
      pillars: indices.map((i) => PILLAR_LABELS[i]),
      description: "형(刑)에 해당하여 긴장·시비·자기갈등에 유의합니다.",
    });
  }

  const summary =
    items.length > 0
      ? `합·충·형·파·해 중 ${items.length}건이 검출되었습니다.`
      : "사주 내 지지 간 강한 충형파해가 적어 비교적 안정적입니다.";

  return { items, summary };
}
