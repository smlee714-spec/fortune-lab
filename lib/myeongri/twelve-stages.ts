import {
  TWELVE_STAGE_NAMES,
  YANG_STEM_JANGSEONG_BRANCH,
  YIN_STEM_JANGSEONG_BRANCH,
} from "./constants";
import type { FourPillarsResult, TwelveStageItem, TwelveStagesResult } from "./types";

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function getStageForBranch(dayStemIdx: number, branchIdx: number) {
  const isYang = dayStemIdx % 2 === 0;
  const startMap = isYang ? YANG_STEM_JANGSEONG_BRANCH : YIN_STEM_JANGSEONG_BRANCH;
  const startBranch = startMap[dayStemIdx];
  if (startBranch === undefined) return "장생" as const;

  let offset: number;
  if (isYang) {
    offset = mod(branchIdx - startBranch, 12);
  } else {
    offset = mod(startBranch - branchIdx, 12);
  }

  return TWELVE_STAGE_NAMES[offset];
}

export function computeTwelveStages(pillars: FourPillarsResult): TwelveStagesResult {
  const pillarKeys: Array<"year" | "month" | "day" | "hour"> = [
    "year",
    "month",
    "day",
    "hour",
  ];
  const cells = [pillars.year, pillars.month, pillars.day, pillars.hour];

  const items: TwelveStageItem[] = cells.map((cell, i) => ({
    pillar: pillarKeys[i],
    branch: cell.branch,
    stage: getStageForBranch(pillars.day.stemIdx, cell.branchIdx),
  }));

  const dayStage = items.find((it) => it.pillar === "day")?.stage ?? "장생";

  return {
    dayMaster: pillars.dayMaster,
    items,
    summary: `일간 ${pillars.dayMaster} 기준 일지 12운성은 ${dayStage}입니다.`,
  };
}
