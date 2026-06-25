import type { SajuResult } from "./types";
import type { GptFortuneResponse } from "./fortune-api-types";

export const FORTUNE_JSON_SCHEMA = {
  type: "object",
  properties: {
    summary: {
      type: "string",
      description: "오늘의 전체 총평 (2~3문장)",
    },
    love: {
      type: "string",
      description: "연애운 (2~3문장)",
    },
    money: {
      type: "string",
      description: "재물운 (2~3문장)",
    },
    career: {
      type: "string",
      description: "직업운 (2~3문장)",
    },
    health: {
      type: "string",
      description: "건강운 (2~3문장)",
    },
    premiumPreview: {
      type: "string",
      description: "프리미엄 심층 분석 미리보기 (2~3문장, 흥미를 유발)",
    },
  },
  required: ["summary", "love", "money", "career", "health", "premiumPreview"],
  additionalProperties: false,
} as const;

export const FORTUNE_SYSTEM_PROMPT = `당신은 운명랩(UNMYEONG LAB)의 사주·운세 AI 상담사입니다.

다음 원칙을 반드시 지켜주세요:
- 한국어로 답변합니다.
- 너무 무섭거나 불안을 조장하는 표현은 사용하지 않습니다.
- 단정적인 예언처럼 말하지 않고, "~할 수 있어요", "~해보시면 좋아요"처럼 부드럽게 표현합니다.
- 재미와 참고용이라는 느낌을 유지합니다.
- 운명랩 브랜드에 맞게 고급스럽고 친절한 문체를 사용합니다.
- 각 항목은 2~3문장으로 간결하게 작성합니다.
- 의학·법률·투자에 대한 단정적 조언은 하지 않습니다.`;

export function buildFortuneUserPrompt(result: SajuResult): string {
  const { birthInfo, year, month, day, hour, dayMaster } = result;
  const genderLabel = birthInfo.gender === "male" ? "남성" : "여성";
  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return `오늘 날짜: ${today}

사용자 정보:
- 생년월일: ${birthInfo.year}년 ${birthInfo.month}월 ${birthInfo.day}일
- 태어난 시간: ${birthInfo.hour}시
- 성별: ${genderLabel}

사주팔자:
- 년주: ${year.stem}${year.branch}
- 월주: ${month.stem}${month.branch}
- 일주: ${day.stem}${day.branch}
- 시주: ${hour.stem}${hour.branch}
- 일간(日干): ${dayMaster.title} (${dayMaster.element})

위 정보를 바탕으로 오늘의 운세를 JSON 형식으로 작성해주세요.
summary는 오늘의 전체 총평, premiumPreview는 프리미엄 심층 분석에서 다룰 수 있는 흥미로운 미리보기입니다.`;
}

export function parseFortuneResponse(outputText: string): GptFortuneResponse {
  const parsed = JSON.parse(outputText) as GptFortuneResponse;

  const fields: (keyof GptFortuneResponse)[] = [
    "summary",
    "love",
    "money",
    "career",
    "health",
    "premiumPreview",
  ];

  for (const field of fields) {
    if (typeof parsed[field] !== "string" || !parsed[field].trim()) {
      throw new Error(`운세 응답 형식이 올바르지 않습니다: ${field}`);
    }
  }

  return parsed;
}
