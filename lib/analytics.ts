/** Google Analytics 4 측정 ID */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-GT086ED3GB";

export const isGoogleAnalyticsEnabled =
  process.env.NODE_ENV === "production" && Boolean(GA_MEASUREMENT_ID);
