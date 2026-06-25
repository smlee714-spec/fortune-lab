import { ENGINE_VERSION } from "./constants";
import { computeDaeun } from "./daeun";
import { computeManseryeok } from "./manseryeok";
import { computeOhaeng } from "./ohaeng";
import { computeFourPillars } from "./pillars";
import { computeRelations } from "./relations";
import { computeSeun } from "./seun";
import { computeSinsal } from "./sinsal";
import { computeSipsung } from "./sipsung";
import { computeTwelveStages } from "./twelve-stages";
import type { DestinyProfile, MyeongriChart, MyeongriInput } from "./types";
import { computeWolun } from "./wolun";
import { computeYongsin } from "./yongsin";

export function computeMyeongriChart(input: MyeongriInput): MyeongriChart {
  const { year, month, day, hour, minute, gender, isLunar, timezone } = input;

  const manseryeok = computeManseryeok(
    year,
    month,
    day,
    hour,
    minute,
    isLunar
  );
  const pillars = computeFourPillars(input);
  const ohaeng = computeOhaeng(pillars);
  const sipsung = computeSipsung(pillars);
  const twelveStages = computeTwelveStages(pillars);
  const sinsal = computeSinsal(pillars);
  const relations = computeRelations(pillars);
  const yongsin = computeYongsin(pillars, ohaeng);
  const daeun = computeDaeun(input, pillars);
  const seun = computeSeun(year);
  const wolun = computeWolun();

  return {
    version: ENGINE_VERSION,
    computedAt: new Date().toISOString(),
    engine: "myeongri",
    input: { year, month, day, hour, minute, gender, isLunar, timezone },
    manseryeok,
    pillars,
    ohaeng,
    sipsung,
    twelveStages,
    sinsal,
    relations,
    yongsin,
    daeun,
    seun,
    wolun,
    extensions: {},
  };
}

export function computeDestinyProfile(input: MyeongriInput): DestinyProfile {
  const myeongri = computeMyeongriChart(input);
  return {
    version: ENGINE_VERSION,
    computedAt: myeongri.computedAt,
    input: myeongri.input,
    modules: {
      myeongri,
    },
  };
}

export function chartToJson(chart: MyeongriChart): string {
  return JSON.stringify(chart, null, 2);
}

export function profileToJson(profile: DestinyProfile): string {
  return JSON.stringify(profile, null, 2);
}
