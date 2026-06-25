export interface AdRewardState {
  aiQuestionsRemaining: number;
  deepAnalysisRemaining: number;
  grantedAt: string;
}

const AD_REWARD_STORAGE_KEY = "unmyeong_ad_rewards";
const FREE_AI_USED_KEY = "unmyeong_free_ai_used";

export const AD_REWARD_GRANT = {
  aiQuestions: 5,
  deepAnalysis: 1,
} as const;

export const FREE_AI_QUESTIONS = 1;

export function grantAdRewards(): AdRewardState {
  const state: AdRewardState = {
    aiQuestionsRemaining: AD_REWARD_GRANT.aiQuestions,
    deepAnalysisRemaining: AD_REWARD_GRANT.deepAnalysis,
    grantedAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(AD_REWARD_STORAGE_KEY, JSON.stringify(state));
  }

  return state;
}

export function getAdRewards(): AdRewardState | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(AD_REWARD_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as AdRewardState;
    if (
      typeof parsed.aiQuestionsRemaining !== "number" ||
      typeof parsed.deepAnalysisRemaining !== "number"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function hasFreeAiQuestionAvailable(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(FREE_AI_USED_KEY) !== "true";
}

export function markFreeAiQuestionUsed(): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(FREE_AI_USED_KEY, "true");
  }
}
