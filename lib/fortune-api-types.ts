export interface GptFortuneResponse {
  summary: string;
  love: string;
  money: string;
  career: string;
  health: string;
  premiumPreview: string;
}

export interface FortuneApiRequest {
  date: string;
  time: string;
  gender: "male" | "female";
}

export interface FortuneApiError {
  error: string;
}
