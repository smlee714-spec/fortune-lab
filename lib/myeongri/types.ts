import type { Gender } from "@/lib/types";
import type {
  Branch,
  SipsungName,
  Stem,
} from "./constants";
import type { TWELVE_STAGE_NAMES } from "./constants";

export type TwelveStageName = (typeof TWELVE_STAGE_NAMES)[number];

export interface MyeongriInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  gender: Gender;
  isLunar?: boolean;
  timezone?: string;
}

export interface PillarCell {
  stem: Stem;
  branch: Branch;
  stemIdx: number;
  branchIdx: number;
  stemElement: string;
  branchElement: string;
}

export interface FourPillarsResult {
  year: PillarCell;
  month: PillarCell;
  day: PillarCell;
  hour: PillarCell;
  dayMaster: Stem;
  dayMasterElement: string;
}

export interface ManseryeokResult {
  solarDate: string;
  lunarNote: string;
  yearForPillar: number;
  monthBranchIdx: number;
  monthBranch: Branch;
  solarTermName: string;
  hourBranchIdx: number;
  hourBranch: Branch;
  isBeforeIpchun: boolean;
}

export interface OhaengCount {
  element: string;
  count: number;
  percent: number;
  sources: string[];
}

export interface OhaengResult {
  counts: OhaengCount[];
  dominant: string;
  lacking: string[];
  balance: string;
}

export interface SipsungItem {
  name: SipsungName;
  count: number;
  positions: string[];
}

export interface SipsungResult {
  dayMaster: Stem;
  table: Record<SipsungName, number>;
  items: SipsungItem[];
  dominant: SipsungName[];
  summary: string;
}

export interface TwelveStageItem {
  pillar: "year" | "month" | "day" | "hour";
  branch: Branch;
  stage: TwelveStageName;
}

export interface TwelveStagesResult {
  dayMaster: Stem;
  items: TwelveStageItem[];
  summary: string;
}

export interface SinsalItem {
  id: string;
  name: string;
  type: string;
  basis: string;
  pillars: string[];
  description: string;
}

export interface SinsalResult {
  items: SinsalItem[];
  summary: string;
}

export type RelationKind = "합" | "충" | "형" | "파" | "해";

export interface RelationItem {
  kind: RelationKind;
  label: string;
  participants: string[];
  pillars: string[];
  description: string;
}

export interface RelationsResult {
  items: RelationItem[];
  summary: string;
}

export interface YongsinResult {
  strength: "신강" | "신약" | "중화";
  strengthScore: number;
  yongsin: string;
  huisin: string[];
  gisin: string[];
  reasoning: string;
}

export interface DaeunPeriod {
  index: number;
  startAge: number;
  endAge: number;
  stem: Stem;
  branch: Branch;
  stemElement: string;
  branchElement: string;
}

export interface DaeunResult {
  direction: "순행" | "역행";
  startAge: number;
  periods: DaeunPeriod[];
  currentPeriodIndex: number | null;
  summary: string;
}

export interface SeunYear {
  year: number;
  age: number;
  stem: Stem;
  branch: Branch;
  pillar: string;
  stemElement: string;
  branchElement: string;
}

export interface SeunResult {
  birthYear: number;
  items: SeunYear[];
  currentYear: SeunYear;
  summary: string;
}

export interface WolunMonth {
  year: number;
  month: number;
  stem: Stem;
  branch: Branch;
  pillar: string;
  solarTerm: string;
}

export interface WolunResult {
  items: WolunMonth[];
  currentMonth: WolunMonth;
  summary: string;
}

/** 향후 타로·관상·MBTI·궁합 등 확장 슬롯 */
export interface DestinyExtensions {
  tarot?: Record<string, unknown>;
  physiognomy?: Record<string, unknown>;
  mbti?: Record<string, unknown>;
  compatibility?: Record<string, unknown>;
  [key: string]: Record<string, unknown> | undefined;
}

export interface MyeongriChart {
  version: string;
  computedAt: string;
  engine: "myeongri";
  input: MyeongriInput;
  manseryeok: ManseryeokResult;
  pillars: FourPillarsResult;
  ohaeng: OhaengResult;
  sipsung: SipsungResult;
  twelveStages: TwelveStagesResult;
  sinsal: SinsalResult;
  relations: RelationsResult;
  yongsin: YongsinResult;
  daeun: DaeunResult;
  seun: SeunResult;
  wolun: WolunResult;
  extensions: DestinyExtensions;
}

export interface DestinyProfile {
  version: string;
  computedAt: string;
  input: MyeongriInput;
  modules: {
    myeongri: MyeongriChart;
    tarot?: Record<string, unknown>;
    physiognomy?: Record<string, unknown>;
    mbti?: Record<string, unknown>;
    compatibility?: Record<string, unknown>;
  };
}
