export interface GptFortuneResponse {
  summary: string;
  love: string;
  money: string;
  career: string;
  health: string;
  questionAnswer: string;
}

export interface FortuneApiRequest {
  date: string;
  time: string;
  gender: "male" | "female";
  mbti?: string;
  question: string;
}

export interface FortuneApiError {
  error: string;
}

export const DEFAULT_FORTUNE_QUESTION = "오늘의 운세를 전반적으로 알려주세요.";

export const MBTI_TYPES = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
] as const;

export type MbtiType = (typeof MBTI_TYPES)[number];
