export type FortuneLevel = 1 | 2 | 3 | 4 | 5;

export interface FortuneItem {
  title: string;
  level: FortuneLevel;
  summary: string;
  detail: string;
}

export interface DailyFortune {
  today: FortuneItem;
  love: FortuneItem;
  wealth: FortuneItem;
  career: FortuneItem;
  health: FortuneItem;
  overall: FortuneItem;
  luckyNumbers: number[];
  luckyColor: {
    name: string;
    hex: string;
    meaning: string;
  };
  dateLabel: string;
}

export const FORTUNE_LEVEL_LABELS: Record<FortuneLevel, string> = {
  5: "대길",
  4: "길",
  3: "평",
  2: "소",
  1: "흉",
};

export const FORTUNE_LEVEL_STARS: Record<FortuneLevel, string> = {
  5: "★★★★★",
  4: "★★★★☆",
  3: "★★★☆☆",
  2: "★★☆☆☆",
  1: "★☆☆☆☆",
};
