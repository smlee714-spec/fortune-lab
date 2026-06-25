import {
  BRANCH_ELEMENTS,
  EARTHLY_BRANCHES,
  HEAVENLY_STEMS,
  STEM_ELEMENTS,
} from "./constants";
import type { Branch, Stem } from "./constants";
import { computeManseryeok, getHourBranchIdx } from "./manseryeok";
import type { FourPillarsResult, MyeongriInput, PillarCell } from "./types";

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function buildPillar(stemIdx: number, branchIdx: number): PillarCell {
  const stem = HEAVENLY_STEMS[stemIdx];
  const branch = EARTHLY_BRANCHES[branchIdx];
  return {
    stem,
    branch,
    stemIdx,
    branchIdx,
    stemElement: STEM_ELEMENTS[stem],
    branchElement: BRANCH_ELEMENTS[branch],
  };
}

/** 년주: 입춘 기준 년간지 */
function yearPillar(yearForPillar: number): PillarCell {
  const stemIdx = mod(yearForPillar - 4, 10);
  const branchIdx = mod(yearForPillar - 4, 12);
  return buildPillar(stemIdx, branchIdx);
}

/** 월주: 년간에 따른 월간 공식 + 절기 월지 */
function monthPillar(yearStemIdx: number, monthBranchIdx: number): PillarCell {
  const branchIdx = mod(monthBranchIdx + 2, 12);
  const baseStem = mod((yearStemIdx % 5) * 2 + 2, 10);
  const stemIdx = mod(baseStem + monthBranchIdx, 10);
  return buildPillar(stemIdx, branchIdx);
}

/** 일주: 기준일(1900-01-01 = 갑술) 오프셋 */
function dayPillar(year: number, month: number, day: number): PillarCell {
  const base = new Date(1900, 0, 1);
  const target = new Date(year, month - 1, day);
  const diffDays = Math.floor(
    (target.getTime() - base.getTime()) / 86400000
  );
  const stemIdx = mod(0 + diffDays, 10);
  const branchIdx = mod(10 + diffDays, 12);
  return buildPillar(stemIdx, branchIdx);
}

/** 시주: 일간 기준 시간 천간 */
function hourPillar(dayStemIdx: number, hour: number): PillarCell {
  const branchIdx = getHourBranchIdx(hour);
  const baseStem = mod((dayStemIdx % 5) * 2, 10);
  const stemIdx = mod(baseStem + branchIdx, 10);
  return buildPillar(stemIdx, branchIdx);
}

export function computeFourPillars(input: MyeongriInput): FourPillarsResult {
  const { year, month, day, hour, minute, isLunar } = input;
  const ms = computeManseryeok(year, month, day, hour, minute, isLunar);

  const yearCell = yearPillar(ms.yearForPillar);
  const monthCell = monthPillar(yearCell.stemIdx, ms.monthBranchIdx);
  const dayCell = dayPillar(year, month, day);
  const hourCell = hourPillar(dayCell.stemIdx, hour);

  return {
    year: yearCell,
    month: monthCell,
    day: dayCell,
    hour: hourCell,
    dayMaster: dayCell.stem as Stem,
    dayMasterElement: STEM_ELEMENTS[dayCell.stem as Stem],
  };
}

export function pillarToString(cell: PillarCell): string {
  return `${cell.stem}${cell.branch}`;
}

export function getAllBranches(pillars: FourPillarsResult): Branch[] {
  return [
    pillars.year.branch,
    pillars.month.branch,
    pillars.day.branch,
    pillars.hour.branch,
  ];
}

export function getAllStems(pillars: FourPillarsResult): Stem[] {
  return [
    pillars.year.stem,
    pillars.month.stem,
    pillars.day.stem,
    pillars.hour.stem,
  ];
}
