import OpenAI from "openai";
import type { Gender } from "@/lib/types";
import type { FortuneApiRequest } from "@/lib/fortune-api-types";
import {
  FORTUNE_JSON_SCHEMA,
  FORTUNE_SYSTEM_PROMPT,
  buildFortuneUserPrompt,
  parseFortuneResponse,
} from "@/lib/fortune-prompt";
import { calculateSaju } from "@/lib/saju";

const DEFAULT_MODEL = "gpt-5.5";

function isValidGender(value: unknown): value is Gender {
  return value === "male" || value === "female";
}

function isValidDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isValidTime(value: unknown): value is string {
  return typeof value === "string" && /^\d{2}:\d{2}$/.test(value);
}

function parseRequestBody(body: unknown): FortuneApiRequest | null {
  if (!body || typeof body !== "object") return null;

  const { date, time, gender } = body as Record<string, unknown>;

  if (!isValidDate(date) || !isValidTime(time) || !isValidGender(gender)) {
    return null;
  }

  return { date, time, gender };
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "서버에 OpenAI API 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const input = parseRequestBody(body);

    if (!input) {
      return Response.json(
        { error: "생년월일, 태어난 시간, 성별 정보가 올바르지 않습니다." },
        { status: 400 }
      );
    }

    const saju = calculateSaju({
      birthDate: input.date,
      birthTime: input.time,
      gender: input.gender,
    });

    const openai = new OpenAI({ apiKey });
    const model = process.env.OPENAI_MODEL ?? DEFAULT_MODEL;

    const response = await openai.responses.create({
      model,
      input: [
        { role: "system", content: FORTUNE_SYSTEM_PROMPT },
        { role: "user", content: buildFortuneUserPrompt(saju) },
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
      return Response.json(
        { error: "운세 생성이 완료되지 않았습니다. 잠시 후 다시 시도해 주세요." },
        { status: 422 }
      );
    }

    if (!response.output_text) {
      return Response.json(
        { error: "운세 응답을 받지 못했습니다." },
        { status: 502 }
      );
    }

    const fortune = parseFortuneResponse(response.output_text);
    return Response.json(fortune);
  } catch (error) {
    console.error("[/api/fortune]", error);

    const message =
      error instanceof Error
        ? error.message
        : "운세를 생성하는 중 오류가 발생했습니다.";

    return Response.json({ error: message }, { status: 500 });
  }
}
