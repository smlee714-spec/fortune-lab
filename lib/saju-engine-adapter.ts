import type { Element, Gender, SajuInput, SajuResult } from "@/lib/types";
import { DAY_MASTER_DESC, getInterpretation } from "@/lib/saju-meta";
import {
  computeSajuEngine,
  parseSajuEngineInput,
  type SajuEngineResult,
} from "@/lib/saju-engine";

const STEMS = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
const BRANCHES = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];

function idxOf(list: string[], value: string): number {
  const i = list.indexOf(value);
  return i >= 0 ? i : 0;
}

export function engineToSajuResult(engine: SajuEngineResult): SajuResult {
  const { input } = engine;
  const dayStem = engine.dayMaster.stem.value;

  const elementCounts: Record<Element, number> = {
    목: 0,
    화: 0,
    토: 0,
    금: 0,
    수: 0,
  };

  for (const item of engine.fiveElements.items) {
    elementCounts[item.element.value as Element] = item.count;
  }

  const toPillar = (cell: SajuEngineResult["yearPillar"]) => ({
    stem: cell.stem.value,
    branch: cell.branch.value,
    stemIdx: idxOf(STEMS, cell.stem.value),
    branchIdx: idxOf(BRANCHES, cell.branch.value),
  });

  const birthInfo = {
    year: input.year,
    month: input.month,
    day: input.day,
    hour: input.hour,
    gender: input.gender,
  };

  return {
    year: toPillar(engine.yearPillar),
    month: toPillar(engine.monthPillar),
    day: toPillar(engine.dayPillar),
    hour: toPillar(engine.hourPillar),
    elementCounts,
    dayMaster: DAY_MASTER_DESC[dayStem] ?? {
      element: engine.dayMaster.element.value as Element,
      title: engine.dayMaster.title?.value ?? dayStem,
      desc: engine.dayMaster.easySummary,
    },
    interpretation: getInterpretation(
      dayStem,
      input.gender,
      elementCounts
    ),
    birthInfo,
    engine,
  };
}

export function sajuInputToEngine(input: SajuInput): SajuEngineResult {
  return computeSajuEngine(parseSajuEngineInput(
    input.birthDate,
    input.birthTime,
    input.gender
  ));
}

export function parseFortuneInputToEngine(
  date: string,
  time: string,
  gender: Gender
): SajuEngineResult {
  return computeSajuEngine(parseSajuEngineInput(date, time, gender));
}
