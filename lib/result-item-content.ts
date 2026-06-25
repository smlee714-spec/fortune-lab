import type { FullAnalysis } from "@/lib/analysis/types";
import type { DailyFortune } from "@/lib/fortune-types";
import type { ResultLuckMeta } from "@/lib/luck-meta";
import type { SajuEngineResult } from "@/lib/saju-engine";
import type { ResultItemId } from "./result-modes";
import { getResultModeItem } from "./result-modes";

export interface ResultItemDetail {
  id: ResultItemId;
  title: string;
  preview: string;
  technical: string;
  easy: string;
  ai: string;
}

export interface ResultItemContext {
  itemId: ResultItemId;
  engine: SajuEngineResult;
  analysis: FullAnalysis;
  fortune: DailyFortune | null;
  luckMeta: ResultLuckMeta | null;
  questionAnswer: string | null;
}

function pillarsTechnical(engine: SajuEngineResult): string {
  const cells = [
    engine.yearPillar,
    engine.monthPillar,
    engine.dayPillar,
    engine.hourPillar,
  ];
  const labels = ["년주", "월주", "일주", "시주"];
  return cells
    .map(
      (c, i) =>
        `${labels[i]}: ${c.pillar.value} (천간 ${c.stem.value}·${c.stem.term}, 지지 ${c.branch.value})` +
        (c.naYin ? `, 납음 ${c.naYin.value}` : "")
    )
    .join("\n");
}

function pillarsEasy(engine: SajuEngineResult): string {
  return [
    engine.yearPillar.pillar.easy,
    engine.monthPillar.pillar.easy,
    engine.dayPillar.pillar.easy,
    engine.hourPillar.pillar.easy,
    engine.dayMaster.easySummary,
  ].join(" ");
}

function twelveStagesText(engine: SajuEngineResult): string {
  const cells = [
    ["년주", engine.yearPillar],
    ["월주", engine.monthPillar],
    ["일주", engine.dayPillar],
    ["시주", engine.hourPillar],
  ] as const;
  return cells
    .map(([label, c]) =>
      c.twelveStage
        ? `${label} ${c.branch.value}: ${c.twelveStage.value}(${c.twelveStage.term})`
        : `${label}: —`
    )
    .join("\n");
}

function relationsTechnical(engine: SajuEngineResult): string {
  const lines: string[] = [];
  if (engine.conflicts.items.length > 0) {
    lines.push(
      "[충]",
      ...engine.conflicts.items.map(
        (c) => `${c.label} — ${c.pillars.join(", ")}`
      )
    );
  }
  if (engine.combinations.items.length > 0) {
    lines.push(
      "[합]",
      ...engine.combinations.items.map(
        (c) => `${c.label} — ${c.pillars.join(", ")}`
      )
    );
  }
  if (engine.conflicts.pending.length > 0) {
    lines.push(`미계산: ${engine.conflicts.pending.join(", ")}`);
  }
  return lines.length > 0 ? lines.join("\n") : "검출된 합·충 없음";
}

function relationsEasy(engine: SajuEngineResult): string {
  const parts = [
    ...engine.conflicts.items.map((c) => c.easy),
    ...engine.combinations.items.map((c) => c.easy),
  ];
  return parts.length > 0
    ? parts.join(" ")
    : "사주 안에서 뚜렷한 충돌·합은 적어 비교적 안정적인 편입니다.";
}

function sinsalTechnical(engine: SajuEngineResult): string {
  const lines: string[] = [];
  if (engine.stars.calendarAuspicious?.value.length) {
    lines.push(
      `일진 길신: ${engine.stars.calendarAuspicious.value.join(", ")}`
    );
  }
  if (engine.stars.calendarInauspicious?.value.length) {
    lines.push(
      `일진 흉살: ${engine.stars.calendarInauspicious.value.join(", ")}`
    );
  }
  lines.push(`사주 신살: ${engine.stars.baziStars}`);
  return lines.join("\n");
}

function sinsalEasy(engine: SajuEngineResult): string {
  const parts: string[] = [];
  if (engine.stars.calendarAuspicious) {
    parts.push(engine.stars.calendarAuspicious.easy);
  }
  if (engine.stars.calendarInauspicious) {
    parts.push(engine.stars.calendarInauspicious.easy);
  }
  parts.push(engine.stars.note);
  return parts.join(" ");
}

function yongsinTechnical(engine: SajuEngineResult): string {
  if (engine.yongsin.yongsin === "추후 계산") {
    return engine.yongsin.note;
  }
  return `용신: ${engine.yongsin.yongsin.value}`;
}

function huisinTechnical(engine: SajuEngineResult): string {
  if (engine.yongsin.huisin === "추후 계산") {
    return engine.yongsin.note;
  }
  return `희신: ${engine.yongsin.huisin.value.join(", ")}`;
}

function fortuneAi(
  fortune: DailyFortune | null,
  key: keyof Pick<
    DailyFortune,
    "overall" | "love" | "wealth" | "career" | "health"
  >,
  fallback: string
): string {
  if (!fortune) return fallback;
  const text = fortune[key].detail?.trim();
  return text || fallback;
}

function expertAi(
  fortune: DailyFortune | null,
  topic: string,
  dataSummary: string
): string {
  const base = fortune?.overall.detail?.trim();
  if (base) {
    return `${topic} 관점에서 보면, ${dataSummary} 오늘의 전체 운세 맥락: ${base}`;
  }
  return `${topic}: ${dataSummary}`;
}

export function buildResultItemDetail(ctx: ResultItemContext): ResultItemDetail {
  const meta = getResultModeItem(ctx.itemId);
  const title = meta?.title ?? ctx.itemId;
  const guide = meta?.technicalGuide ?? "";
  const { engine, analysis, fortune, luckMeta, questionAnswer } = ctx;

  switch (ctx.itemId) {
    case "summary":
      return {
        id: ctx.itemId,
        title,
        preview: fortune?.overall.detail?.slice(0, 80) ?? "운세를 불러오는 중…",
        technical: guide,
        easy: luckMeta?.oneLiner ?? fortune?.overall.detail ?? "—",
        ai: fortuneAi(fortune, "overall", "AI 총평을 불러오지 못했습니다."),
      };
    case "love":
      return {
        id: ctx.itemId,
        title,
        preview: fortune?.love.detail?.slice(0, 60) ?? "—",
        technical: `${guide}\n\n십성 참고: ${analysis.sipsung.strong.join(", ")}`,
        easy: "인연은 서로의 기운이 맞을 때 자연스럽게 깊어집니다.",
        ai: fortuneAi(fortune, "love", "연애운 AI 해석을 불러오지 못했습니다."),
      };
    case "wealth":
      return {
        id: ctx.itemId,
        title,
        preview: fortune?.wealth.detail?.slice(0, 60) ?? "—",
        technical: `${guide}\n\n오행: ${engine.fiveElements.summary}`,
        easy: engine.fiveElements.dominant?.easy ?? engine.fiveElements.summary,
        ai: fortuneAi(fortune, "wealth", "재물운 AI 해석을 불러오지 못했습니다."),
      };
    case "career":
      return {
        id: ctx.itemId,
        title,
        preview: fortune?.career.detail?.slice(0, 60) ?? "—",
        technical: `${guide}\n\n${engine.tenGods.summary}`,
        easy: analysis.sipsung.summary,
        ai: fortuneAi(fortune, "career", "직업운 AI 해석을 불러오지 못했습니다."),
      };
    case "health":
      return {
        id: ctx.itemId,
        title,
        preview: fortune?.health.detail?.slice(0, 60) ?? "—",
        technical: `${guide}\n\n${engine.fiveElements.summary}`,
        easy: analysis.ohaeng.easyExplanation,
        ai: fortuneAi(fortune, "health", "건강운 AI 해석을 불러오지 못했습니다."),
      };
    case "advice":
      return {
        id: ctx.itemId,
        title,
        preview: questionAnswer?.slice(0, 60) ?? luckMeta?.oneLiner ?? "—",
        technical: guide,
        easy: luckMeta?.oneLiner ?? "오늘은 무리하지 않고 한 가지에 집중해 보세요.",
        ai:
          questionAnswer?.trim() ||
          fortune?.overall.detail ||
          "오늘의 조언을 불러오지 못했습니다.",
      };
    case "pillars":
      return {
        id: ctx.itemId,
        title,
        preview: `${engine.dayPillar.pillar.value} 일주 중심`,
        technical: `${guide}\n\n${pillarsTechnical(engine)}`,
        easy: pillarsEasy(engine),
        ai: expertAi(
          fortune,
          "사주팔자",
          `네 기둥 ${engine.yearPillar.pillar.value}·${engine.monthPillar.pillar.value}·${engine.dayPillar.pillar.value}·${engine.hourPillar.pillar.value}, 일간 ${engine.dayMaster.stem.value}.`
        ),
      };
    case "elements":
      return {
        id: ctx.itemId,
        title,
        preview: engine.fiveElements.dominant?.value ?? "오행",
        technical: `${guide}\n\n${engine.fiveElements.items.map((i) => `${i.element.value}: ${i.count}(${i.percent}%)`).join(", ")}`,
        easy: engine.fiveElements.dominant?.easy ?? engine.fiveElements.summary,
        ai: expertAi(fortune, "오행", engine.fiveElements.summary),
      };
    case "tengods":
      return {
        id: ctx.itemId,
        title,
        preview: engine.tenGods.summary,
        technical: `${guide}\n\n${engine.tenGods.entries.map((e) => `${e.pillar.value}: 천간 ${e.stemGod?.value ?? "—"}, 지지 ${e.branchGods?.value.join("/") ?? "—"}`).join("\n")}`,
        easy: engine.tenGods.summary,
        ai: expertAi(fortune, "십성", analysis.sipsung.summary),
      };
    case "twelve-stages":
      return {
        id: ctx.itemId,
        title,
        preview:
          engine.dayPillar.twelveStage?.value ?? "12운성",
        technical: `${guide}\n\n${twelveStagesText(engine)}`,
        easy: [
          engine.yearPillar.twelveStage?.easy,
          engine.monthPillar.twelveStage?.easy,
          engine.dayPillar.twelveStage?.easy,
          engine.hourPillar.twelveStage?.easy,
        ]
          .filter(Boolean)
          .join(" "),
        ai: expertAi(
          fortune,
          "12운성",
          engine.dayPillar.twelveStage?.easy ?? "일주 12운성을 확인하세요."
        ),
      };
    case "sinsal":
      return {
        id: ctx.itemId,
        title,
        preview: engine.stars.baziStars === "추후 계산" ? "일진 신살" : "신살",
        technical: `${guide}\n\n${sinsalTechnical(engine)}`,
        easy: sinsalEasy(engine),
        ai: expertAi(fortune, "신살", sinsalEasy(engine)),
      };
    case "relations":
      return {
        id: ctx.itemId,
        title,
        preview: engine.conflicts.summary,
        technical: `${guide}\n\n${relationsTechnical(engine)}`,
        easy: relationsEasy(engine),
        ai: expertAi(fortune, "합충", relationsEasy(engine)),
      };
    case "yongsin":
      return {
        id: ctx.itemId,
        title,
        preview: "추후 계산",
        technical: `${guide}\n\n${yongsinTechnical(engine)}`,
        easy: engine.yongsin.note,
        ai: expertAi(
          fortune,
          "용신",
          "용신은 아직 계산되지 않았습니다. 오행 균형을 먼저 참고해 주세요."
        ),
      };
    case "huisin":
      return {
        id: ctx.itemId,
        title,
        preview: "추후 계산",
        technical: `${guide}\n\n${huisinTechnical(engine)}`,
        easy: engine.yongsin.note,
        ai: expertAi(
          fortune,
          "희신",
          "희신은 용신과 함께 추후 제공될 예정입니다."
        ),
      };
    case "daeun":
      return {
        id: ctx.itemId,
        title,
        preview: engine.luckCycles.current?.pillar.value ?? engine.luckCycles.summary,
        technical: `${guide}\n\n${engine.luckCycles.direction.term} ${engine.luckCycles.direction.value}. ${engine.luckCycles.startNote}\n${engine.luckCycles.items.map((i) => `${i.startAge}-${i.endAge}세 ${i.pillar.value}`).join("\n")}`,
        easy: engine.luckCycles.summary,
        ai: expertAi(fortune, "대운", analysis.daeun.summary),
      };
    case "seun":
      return {
        id: ctx.itemId,
        title,
        preview: engine.yearLuck.current?.pillar.value ?? "세운",
        technical: `${guide}\n\n${engine.yearLuck.items.map((y) => `${y.year}년 ${y.pillar.value} (${y.age}세)`).join("\n")}`,
        easy: engine.yearLuck.summary,
        ai: expertAi(fortune, "세운", analysis.seun.summary),
      };
    case "wolun":
      return {
        id: ctx.itemId,
        title,
        preview: engine.monthLuck.current?.pillar.value ?? "월운",
        technical: `${guide}\n\n${engine.monthLuck.items.map((m) => `${m.monthLabel}월 ${m.pillar.value}`).join("\n")}`,
        easy: engine.monthLuck.summary,
        ai: expertAi(fortune, "월운", engine.monthLuck.summary),
      };
    case "ilun":
      return {
        id: ctx.itemId,
        title,
        preview: engine.dayLuck.pillar.value,
        technical: `${guide}\n\n${engine.dayLuck.date} 일진 ${engine.dayLuck.pillar.value}`,
        easy: engine.dayLuck.pillar.easy,
        ai: expertAi(fortune, "일운", engine.dayLuck.summary),
      };
    default:
      return {
        id: ctx.itemId,
        title,
        preview: "—",
        technical: guide,
        easy: "—",
        ai: "—",
      };
  }
}

export function buildResultItemPreview(
  itemId: ResultItemId,
  ctx: Omit<ResultItemContext, "itemId">
): string {
  return buildResultItemDetail({ ...ctx, itemId }).preview;
}
