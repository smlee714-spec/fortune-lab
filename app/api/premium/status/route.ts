import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  getDeepAnalysisCookieName,
  getPremiumCookieName,
  parseDeepAnalysisCookie,
  parsePremiumCookie,
} from "@/lib/premium/session";
import type { PremiumStatusResponse } from "@/lib/premium/types";

export async function GET() {
  const cookieStore = await cookies();
  const subscription = parsePremiumCookie(cookieStore.get(getPremiumCookieName())?.value);
  const deepAnalysis = parseDeepAnalysisCookie(
    cookieStore.get(getDeepAnalysisCookieName())?.value,
  );

  const response: PremiumStatusResponse = {
    isPremium: subscription !== null,
    hasDeepAnalysis: deepAnalysis !== null || subscription !== null,
    subscription,
    deepAnalysis,
  };

  return NextResponse.json(response);
}
