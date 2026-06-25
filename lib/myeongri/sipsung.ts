import { HEAVENLY_STEMS, HIDDEN_STEMS, SIPSUNG_TABLE } from "./constants";
import type { SipsungName } from "./constants";
import type { FourPillarsResult, SipsungResult } from "./types";

const PILLAR_LABELS = ["년주", "월주", "일주", "시주"];

export function computeSipsung(pillars: FourPillarsResult): SipsungResult {
  const dayStemIdx = pillars.day.stemIdx;
  const table = SIPSUNG_TABLE[dayStemIdx];

  const counts: Record<SipsungName, number> = {
    비견: 0,
    겁재: 0,
    식신: 0,
    상관: 0,
    편재: 0,
    정재: 0,
    편관: 0,
    정관: 0,
    편인: 0,
    정인: 0,
  };

  const positions: Record<SipsungName, string[]> = {
    비견: [],
    겁재: [],
    식신: [],
    상관: [],
    편재: [],
    정재: [],
    편관: [],
    정관: [],
    편인: [],
    정인: [],
  };

  const cells = [pillars.year, pillars.month, pillars.day, pillars.hour];

  cells.forEach((cell, i) => {
    const name = table[cell.stemIdx];
    counts[name]++;
    positions[name].push(`${PILLAR_LABELS[i]} 천간 ${cell.stem}`);
  });

  cells.forEach((cell, i) => {
    const hidden = HIDDEN_STEMS[cell.branch];
    hidden.forEach((hs) => {
      const stemIdx = HEAVENLY_STEMS.indexOf(hs);
      if (stemIdx < 0) return;
      const name = table[stemIdx];
      counts[name] += 0.5;
      positions[name].push(`${PILLAR_LABELS[i]} 지장간 ${hs}`);
    });
  });

  const items = (Object.keys(counts) as SipsungName[]).map((name) => ({
    name,
    count: Math.round(counts[name] * 10) / 10,
    positions: positions[name],
  }));

  const dominant = items
    .filter((it) => it.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
    .map((it) => it.name);

  const summary =
    dominant.length > 0
      ? `일간 ${pillars.dayMaster} 기준 십성은 ${dominant.join(", ")}이 두드러집니다.`
      : `일간 ${pillars.dayMaster} 기준 십성 분포를 확인하세요.`;

  return {
    dayMaster: pillars.dayMaster,
    table: counts,
    items,
    dominant,
    summary,
  };
}
