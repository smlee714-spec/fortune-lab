import { NextResponse } from "next/server";
import OpenAI from "openai";
import {
  DEFAULT_FORTUNE_QUESTION,
  MBTI_TYPES,
  type FortuneApiRequest,
} from "@/lib/fortune-api-types";
import {
  FORTUNE_JSON_SCHEMA,
  FORTUNE_SYSTEM_PROMPT,
  buildFortuneUserPrompt,
  parseFortuneResponse,
} from "@/lib/fortune-prompt";
import { parseFortuneInputToEngine } from "@/lib/saju-engine-adapter";
import type { Gender } from "@/lib/types";

/** Edge에서는 process.env.OPENAI_API_KEY가 비어 있을 수 있어 Node 런타임 사용 */
export const runtime = "nodejs";

/** 빌드 시 정적으로 최적화되지 않고 요청 시점에 env를 읽도록 설정 */
export const dynamic = "force-dynamic";

const DEFAULT_MODEL = "gpt-4o";

function getOpenAIApiKey(): string | undefined {
  const value = process.env.OPENAI_API_KEY;
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function isValidGender(value: unknown): value is Gender {
  return value === "male" || value === "female";
}

function isValidDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isValidTime(value: unknown): value is string {
  return typeof value === "string" && /^\d{2}:\d{2}$/.test(value);
}

function parseQuestion(value: unknown): string {
  if (typeof value !== "string") return DEFAULT_FORTUNE_QUESTION;
  const trimmed = value.trim();
  return trimmed || DEFAULT_FORTUNE_QUESTION;
}

function parseMbti(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim().toUpperCase();
  if (!trimmed) return undefined;
  if (MBTI_TYPES.includes(trimmed as (typeof MBTI_TYPES)[number])) {
    return trimmed;
  }
  return undefined;
}

function parseRequestBody(body: unknown): FortuneApiRequest | null {
  if (!body || typeof body !== "object") return null;

  const { date, time, gender, question, mbti } = body as Record<string, unknown>;

  if (!isValidDate(date) || !isValidTime(time) || !isValidGender(gender)) {
    return null;
  }

  return {
    date,
    time,
    gender,
    mbti: parseMbti(mbti),
    question: parseQuestion(question),
  };
}

export async function POST(request: Request) {
  console.log("OPENAI_API_KEY exists:", !!process.env.OPENAI_API_KEY);

  try {
    const apiKey = getOpenAIApiKey();
    if (!apiKey) {
      return NextResponse.json(
        { error: "서버에 OpenAI API 키가 설정되지 않았습니다." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const input = parseRequestBody(body);

    if (!input) {
      return NextResponse.json(
        {
          error:
            "생년월일, 태어난 시간, 성별, 질문 정보가 올바르지 않습니다.",
        },
        { status: 400 },
      );
    }

    const engine = parseFortuneInputToEngine(input.date, input.time, input.gender);

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY?.trim() ?? apiKey,
    });
    const model = process.env.OPENAI_MODEL?.trim() || DEFAULT_MODEL;

    const response = await openai.responses.create({
      model,
      input: [
        { role: "system", content: FORTUNE_SYSTEM_PROMPT },
        {
          role: "user",
          content: buildFortuneUserPrompt(engine, input.question, input.mbti),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "unmyeong_daily_fortune",
          strict: true,
          schema: FORTUNE_JSON_SCHEMA,
        },
      },
    });

    if (response.status === "incomplete") {
      return NextResponse.json(
        { error: "운세 생성이 완료되지 않았습니다. 잠시 후 다시 시도해 주세요." },
        { status: 422 },
      );
    }

    if (!response.output_text) {
      return NextResponse.json(
        { error: "운세 응답을 받지 못했습니다." },
        { status: 502 },
      );
    }

    const fortune = parseFortuneResponse(response.output_text);
    return NextResponse.json(fortune);
  } catch (error) {
    console.error("[/api/fortune]", error);

    const message =
      error instanceof Error
        ? error.message
        : "운세를 생성하는 중 오류가 발생했습니다.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
