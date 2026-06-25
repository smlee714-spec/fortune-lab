import { createHmac, timingSafeEqual } from "crypto";
import type {
  DeepAnalysisPurchase,
  PremiumPlanId,
  PremiumSubscription,
} from "./types";

const PREMIUM_COOKIE_NAME = "unmyeong_premium";
const DEEP_ANALYSIS_COOKIE_NAME = "unmyeong_deep_analysis";
const SESSION_VERSION = 1;

interface SignedPremiumSession {
  v: number;
  planId: "premium_monthly";
  customerKey: string;
  status: PremiumSubscription["status"];
  currentPeriodStart: string;
  currentPeriodEnd: string;
  paymentKey?: string;
  billingKey?: string;
}

interface SignedDeepAnalysisSession {
  v: number;
  planId: "deep_analysis";
  customerKey: string;
  purchasedAt: string;
  paymentKey?: string;
}

function getSessionSecret(): string {
  const secret =
    process.env.PREMIUM_SESSION_SECRET ??
    process.env.TOSS_SECRET_KEY ??
    "dev-only-premium-session-secret";

  if (
    process.env.NODE_ENV === "production" &&
    secret === "dev-only-premium-session-secret"
  ) {
    throw new Error("PREMIUM_SESSION_SECRET or TOSS_SECRET_KEY must be set in production");
  }

  return secret;
}

function signPayload(payload: string): string {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
}

function encodeSignedSession<T extends object>(session: T): string {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  const signature = signPayload(payload);
  return `${payload}.${signature}`;
}

function decodeSignedSession<T extends { v: number }>(token: string): T | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = signPayload(payload);
  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);

  if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as T;

    if (parsed.v !== SESSION_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function subscriptionToSession(subscription: PremiumSubscription): string {
  return encodeSignedSession({
    v: SESSION_VERSION,
    planId: subscription.planId,
    customerKey: subscription.customerKey,
    status: subscription.status,
    currentPeriodStart: subscription.currentPeriodStart,
    currentPeriodEnd: subscription.currentPeriodEnd,
    paymentKey: subscription.paymentKey,
    billingKey: subscription.billingKey,
  });
}

export function deepAnalysisToSession(purchase: DeepAnalysisPurchase): string {
  return encodeSignedSession({
    v: SESSION_VERSION,
    planId: purchase.planId,
    customerKey: purchase.customerKey,
    purchasedAt: purchase.purchasedAt,
    paymentKey: purchase.paymentKey,
  });
}

export function parsePremiumCookie(cookieValue: string | undefined): PremiumSubscription | null {
  if (!cookieValue) return null;

  const session = decodeSignedSession<SignedPremiumSession>(cookieValue);
  if (!session || session.status !== "active") return null;

  const periodEnd = new Date(session.currentPeriodEnd).getTime();
  if (Number.isNaN(periodEnd) || periodEnd <= Date.now()) return null;

  return {
    planId: session.planId,
    customerKey: session.customerKey,
    status: session.status,
    currentPeriodStart: session.currentPeriodStart,
    currentPeriodEnd: session.currentPeriodEnd,
    paymentKey: session.paymentKey,
    billingKey: session.billingKey,
  };
}

export function parseDeepAnalysisCookie(
  cookieValue: string | undefined,
): DeepAnalysisPurchase | null {
  if (!cookieValue) return null;

  const session = decodeSignedSession<SignedDeepAnalysisSession>(cookieValue);
  if (!session) return null;

  return {
    planId: session.planId,
    customerKey: session.customerKey,
    purchasedAt: session.purchasedAt,
    paymentKey: session.paymentKey,
  };
}

export function getPremiumCookieName(): string {
  return PREMIUM_COOKIE_NAME;
}

export function getDeepAnalysisCookieName(): string {
  return DEEP_ANALYSIS_COOKIE_NAME;
}

export function buildPremiumCookieOptions(expiresAt: Date) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    expires: expiresAt,
  };
}

export function buildDeepAnalysisCookieOptions() {
  const expiresAt = new Date();
  expiresAt.setFullYear(expiresAt.getFullYear() + 10);

  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    expires: expiresAt,
  };
}

export function createMonthlySubscription(params: {
  planId: Extract<PremiumPlanId, "premium_monthly">;
  customerKey: string;
  paymentKey: string;
}): PremiumSubscription {
  const now = new Date();
  const periodEnd = new Date(now);
  periodEnd.setMonth(periodEnd.getMonth() + 1);

  return {
    planId: params.planId,
    customerKey: params.customerKey,
    status: "active",
    currentPeriodStart: now.toISOString(),
    currentPeriodEnd: periodEnd.toISOString(),
    paymentKey: params.paymentKey,
  };
}

export function createDeepAnalysisPurchase(params: {
  customerKey: string;
  paymentKey: string;
}): DeepAnalysisPurchase {
  return {
    planId: "deep_analysis",
    customerKey: params.customerKey,
    purchasedAt: new Date().toISOString(),
    paymentKey: params.paymentKey,
  };
}
