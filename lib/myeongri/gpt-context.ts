import type { MyeongriChart } from "./types";

/** GPT에 전달할 계산 결과만 압축 (재계산 금지 지시와 함께 사용) */
export function buildGptMyeongriContext(chart: MyeongriChart): string {
  const compact = {
    engine: chart.engine,
    version: chart.version,
    birth: {
      solar: chart.manseryeok.solarDate,
      gender: chart.input.gender,
      solarTerm: chart.manseryeok.solarTermName,
    },
    pillars: {
      year: `${chart.pillars.year.stem}${chart.pillars.year.branch}`,
      month: `${chart.pillars.month.stem}${chart.pillars.month.branch}`,
      day: `${chart.pillars.day.stem}${chart.pillars.day.branch}`,
      hour: `${chart.pillars.hour.stem}${chart.pillars.hour.branch}`,
      dayMaster: chart.pillars.dayMaster,
    },
    ohaeng: chart.ohaeng.counts.map((c) => ({
      element: c.element,
      percent: c.percent,
    })),
    sipsung: chart.sipsung.items
      .filter((i) => i.count > 0)
      .map((i) => ({ name: i.name, count: i.count })),
    twelveStages: chart.twelveStages.items.map((i) => ({
      pillar: i.pillar,
      stage: i.stage,
    })),
    sinsal: chart.sinsal.items.map((i) => i.name),
    relations: chart.relations.items.map((i) => ({
      kind: i.kind,
      label: i.label,
      pillars: i.pillars,
    })),
    yongsin: {
      strength: chart.yongsin.strength,
      yongsin: chart.yongsin.yongsin,
      huisin: chart.yongsin.huisin,
      gisin: chart.yongsin.gisin,
    },
    daeun: {
      direction: chart.daeun.direction,
      startAge: chart.daeun.startAge,
      current: chart.daeun.currentPeriodIndex !== null
        ? chart.daeun.periods[chart.daeun.currentPeriodIndex]
        : null,
      periods: chart.daeun.periods.map((p) => ({
        ages: `${p.startAge}-${p.endAge}`,
        pillar: `${p.stem}${p.branch}`,
      })),
    },
    seun: chart.seun.items.map((s) => ({
      year: s.year,
      pillar: s.pillar,
    })),
    wolun: {
      current: chart.wolun.currentMonth.pillar,
      term: chart.wolun.currentMonth.solarTerm,
    },
  };

  return JSON.stringify(compact, null, 2);
}

export const GPT_INTERPRETATION_RULES = `당신은 운명랩(Unmyeong Lab)의 사주 해석 전문가입니다.

중요: 사주·오행·십성·12운성·신살·합충형파해·용신·대운·세운·월운은 이미 프로그램이 계산했습니다.
절대 천간지지·오행·십성·대운 등을 다시 계산하거나 변경하지 마세요.
제공된 JSON 계산 결과만 근거로 해석·조언하세요.

톤: 따뜻하고 구체적이며 실용적인 한국어.`;
