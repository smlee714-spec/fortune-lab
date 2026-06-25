export const PAYMENT_SUCCESS_PATH = "/payment/success";
export const PAYMENT_FAIL_PATH = "/payment/fail";

export function getPaymentSuccessUrl(origin: string): string {
  return `${origin}${PAYMENT_SUCCESS_PATH}`;
}

export function getPaymentFailUrl(origin: string): string {
  return `${origin}${PAYMENT_FAIL_PATH}`;
}
