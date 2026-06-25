export interface TossPaymentConfirmResult {
  paymentKey: string;
  orderId: string;
  status: string;
  totalAmount: number;
  method?: string;
  approvedAt?: string;
}

function getTossSecretKey(): string {
  const secretKey = process.env.TOSS_SECRET_KEY;
  if (!secretKey) {
    throw new Error("TOSS_SECRET_KEY is not configured");
  }
  return secretKey;
}

export function getTossClientKey(): string {
  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
  if (!clientKey) {
    throw new Error("NEXT_PUBLIC_TOSS_CLIENT_KEY is not configured");
  }
  return clientKey;
}

function getAuthorizationHeader(): string {
  const encoded = Buffer.from(`${getTossSecretKey()}:`).toString("base64");
  return `Basic ${encoded}`;
}

/** 토스 결제 승인 API — https://docs.tosspayments.com/reference#결제-승인 */
export async function confirmTossPayment(params: {
  paymentKey: string;
  orderId: string;
  amount: number;
}): Promise<TossPaymentConfirmResult> {
  const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      Authorization: getAuthorizationHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      paymentKey: params.paymentKey,
      orderId: params.orderId,
      amount: params.amount,
    }),
  });

  const data = (await response.json()) as TossPaymentConfirmResult & {
    code?: string;
    message?: string;
  };

  if (!response.ok) {
    throw new Error(data.message ?? `Toss confirm failed (${response.status})`);
  }

  return data;
}

/**
 * 정기결제 확장 시 사용할 빌링키 발급 API 스텁.
 * customerKey + authKey로 billingKey를 발급받아 구독 갱신에 사용합니다.
 */
export async function issueBillingKey(params: {
  customerKey: string;
  authKey: string;
}): Promise<{ billingKey: string }> {
  void params;
  throw new Error("Billing key issuance is not implemented yet. Use one-time payment for now.");
}
