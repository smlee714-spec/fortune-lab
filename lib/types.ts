export type Element = "목" | "화" | "토" | "금" | "수";
export type Gender = "male" | "female";

export interface Pillar {
  stem: string;
  branch: string;
  stemIdx: number;
  branchIdx: number;
}

export interface DayMasterInfo {
  element: Element;
  title: string;
  desc: string;
}

export interface SajuResult {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar;
  elementCounts: Record<Element, number>;
  dayMaster: DayMasterInfo;
  interpretation: string;
  birthInfo: {
    year: number;
    month: number;
    day: number;
    hour: number;
    gender: Gender;
  };
}

export interface SajuInput {
  birthDate: string;
  birthTime: string;
  gender: Gender;
}
