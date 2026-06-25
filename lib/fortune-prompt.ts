import type { SajuEngineResult } from "@/lib/saju-engine";
import { buildGptSajuContext, GPT_SAju_RULES } from "@/lib/saju-engine";
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
    questionAnswer: {
      type: "string",
      description: "사용자 질문에 대한 맞춤 답변 (2~4문장)",
    },
  },
  required: ["summary", "love", "money", "career", "health", "questionAnswer"],
  additionalProperties: false,
} as const;

export const FORTUNE_SYSTEM_PROMPT = `${GPT_SAju_RULES}

추가 원칙:
- 한국어로 답변합니다.
- 너무 무섭거나 불안을 조장하는 표현은 사용하지 않습니다.
- 단정적인 예언처럼 말하지 않고, "~할 수 있어요", "~해보시면 좋아요"처럼 부드럽게 표현합니다.
- 재미와 참고용이라는 느낌을 유지합니다.
- 운명랩 브랜드에 맞게 고급스럽고 친절한 문체를 사용합니다.
- 각 항목은 2~3문장으로 간결하게 작성합니다.
- questionAnswer는 사용자 질문에 직접 답하며, 제공된 계산 JSON만 참고합니다.
- 의학·법률·투자에 대한 단정적 조언은 하지 않습니다.`;

export function buildFortuneUserPrompt(
  engine: SajuEngineResult,
  question: string,
  mbti?: string
): string {
  const { input } = engine;
  const genderLabel = input.gender === "male" ? "남성" : "여성";
  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const computedJson = buildGptSajuContext(engine);
  const mbtiLine = mbti?.trim()
    ? `- MBTI: ${mbti.trim()}`
    : "- MBTI: 미입력 (사주 중심으로 해석)";

  return `오늘 날짜: ${today}

사용자 기본 정보 (참고용, 사주는 아래 JSON이 정본):
- 생년월일: ${input.year}년 ${input.month}월 ${input.day}일
- 태어난 시간: ${input.hour}시 ${input.minute}분
- 성별: ${genderLabel}
${mbtiLine}

=== 프로그램이 계산한 명리 데이터 (JSON, lunar-typescript) ===
다시 계산하지 말고 이 JSON만 근거로 해석하세요.

${computedJson}

사용자 질문:
"${question}"

위 계산 결과와 질문을 바탕으로 오늘의 운세를 JSON 형식으로 작성해주세요.
summary는 오늘의 전체 총평, questionAnswer는 사용자 질문에 대한 맞춤 답변입니다.
MBTI가 입력된 경우 성향 참고용으로만 활용하고, 사주 해석이 우선입니다.`;
}

export function parseFortuneResponse(outputText: string): GptFortuneResponse {
  const parsed = JSON.parse(outputText) as GptFortuneResponse;

  const fields: (keyof GptFortuneResponse)[] = [
    "summary",
    "love",
    "money",
    "career",
    "health",
    "questionAnswer",
  ];

  for (const field of fields) {
    if (typeof parsed[field] !== "string" || !parsed[field].trim()) {
      throw new Error(`운세 응답 형식이 올바르지 않습니다: ${field}`);
    }
  }

  return parsed;
}
