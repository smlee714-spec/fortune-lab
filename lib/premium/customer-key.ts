const STORAGE_KEY = "unmyeong_customer_key";

export function getOrCreateCustomerKey(): string {
  if (typeof window === "undefined") {
    return "";
  }

  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const customerKey = `cust_${crypto.randomUUID()}`;
  localStorage.setItem(STORAGE_KEY, customerKey);
  return customerKey;
}
