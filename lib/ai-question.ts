export const AI_EXAMPLE_QUESTIONS = [
  "올해 창업해도 될까요?",
  "연애운은 어떤가요?",
  "돈은 언제 좋아질까요?",
  "이직해도 될까요?",
] as const;

export type AIExampleQuestion = (typeof AI_EXAMPLE_QUESTIONS)[number];

const SAMPLE_ANSWERS: Record<AIExampleQuestion, string> = {
  "올해 창업해도 될까요?":
    "올해는 새로운 시작에 대한 에너지가 감도는 시기로 보입니다. 다만 한 번에 크게 벌리기보다, 소규모로 검증하고 차근차근 키워가는 편이 안정적일 수 있어요. 재무 여유와 일정을 미리 점검해 보시면 좋겠습니다. 참고용 조언이니, 최종 결정은 본인의 상황을 함께 고려해 주세요.",
  "연애운은 어떤가요?":
    "연애운에는 따뜻한 소통의 기운이 스며들어 있는 편입니다. 상대와의 대화에서 진심을 나누면 관계가 한층 가까워질 수 있어요. 급하게 결론 내리기보다, 서로의 속도를 존중하는 것이 도움이 될 것 같습니다. 재미와 참고용으로 읽어 주세요.",
  "돈은 언제 좋아질까요?":
    "재물운은 서서히 회복되는 흐름으로 읽힙니다. 당장 큰 변화보다는 작은 수입이나 절약 습관이 차곡차곡 쌓이면서 체감이 커질 수 있어요. 하반기로 갈수록 기회가 열릴 가능성도 보입니다. 투자나 큰 지출은 신중하게 검토해 보시길 바랍니다.",
  "이직해도 될까요?":
    "이직에 대한 기운은 '준비된 변화'에 유리한 쪽으로 보입니다. 스스로의 역량과 시장 상황을 함께 살보면 타이밍을 잡기 수월할 수 있어요. 무리한 도전보다는 정보 수집과 네트워크를 먼저 챙기는 것도 좋은 선택입니다. 참고용 안내이니, 실제 결정은 충분히 고민해 보세요.",
};

const DEFAULT_ANSWER =
  "질문해 주신 내용을 바탕으로 보면, 지금은 차분히 상황을 정리하고 한 걸음씩 나아가면 좋을 흐름으로 읽힙니다. 급한 결정보다는 정보를 모으고 마음의 여유를 갖는 것이 도움이 될 수 있어요. 이 답변은 참고용 샘플이며, 더 깊은 분석은 Premium에서 만나보실 수 있습니다.";

export function getSampleAIAnswer(question: string): string {
  const trimmed = question.trim();
  const exact = SAMPLE_ANSWERS[trimmed as AIExampleQuestion];
  if (exact) return exact;

  if (trimmed.includes("창업") || trimmed.includes("사업")) {
    return SAMPLE_ANSWERS["올해 창업해도 될까요?"];
  }
  if (trimmed.includes("연애") || trimmed.includes("썸") || trimmed.includes("결혼")) {
    return SAMPLE_ANSWERS["연애운은 어떤가요?"];
  }
  if (trimmed.includes("돈") || trimmed.includes("재물") || trimmed.includes("수입")) {
    return SAMPLE_ANSWERS["돈은 언제 좋아질까요?"];
  }
  if (trimmed.includes("이직") || trimmed.includes("직장") || trimmed.includes("취업")) {
    return SAMPLE_ANSWERS["이직해도 될까요?"];
  }

  return DEFAULT_ANSWER;
}

export const AI_LOADING_MESSAGE = "운명을 분석하는 중...";
export const AI_LOADING_DURATION_MS = 2000;
