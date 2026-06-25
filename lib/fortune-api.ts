import type { DailyFortune, FortuneItem } from "./fortune-types";
import type { FortuneApiRequest, GptFortuneResponse } from "./fortune-api-types";

function toFortuneItem(title: string, detail: string): FortuneItem {
  return {
    title,
    level: 3,
    summary: "",
    detail,
  };
}

function getDateLabel(today = new Date()): string {
  return today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
}

export function mapGptFortuneToDaily(
  data: GptFortuneResponse,
  today = new Date()
): DailyFortune {
  return {
    dateLabel: getDateLabel(today),
    overall: toFortuneItem("총평", data.summary),
    love: toFortuneItem("연애운", data.love),
    wealth: toFortuneItem("재물운", data.money),
    career: toFortuneItem("직업운", data.career),
    health: toFortuneItem("건강운", data.health),
    today: toFortuneItem("오늘의 운세", data.summary),
    luckyNumbers: [],
    luckyColor: { name: "", hex: "#c9a227", meaning: "" },
  };
}

export async function fetchGptFortune(
  request: FortuneApiRequest
): Promise<GptFortuneResponse> {
  console.log("AI request start");

  let response: Response;
  try {
    response = await fetch("/api/fortune", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
  } catch {
    console.log("AI request failed");
    throw new Error("운세를 불러오는 중 네트워크 오류가 발생했습니다.");
  }

  const payload = (await response.json()) as GptFortuneResponse | { error?: string };

  if (!response.ok) {
    console.log("AI request failed");
    const message =
      typeof payload === "object" && payload && "error" in payload && payload.error
        ? payload.error
        : "운세를 불러오지 못했습니다.";
    throw new Error(message);
  }

  console.log("AI request success");
  return payload as GptFortuneResponse;
}
