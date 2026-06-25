export interface CustomerReview {
  id: string;
  stars: number;
  text: string;
}

export interface TrustStat {
  id: string;
  label: string;
  value: string;
}

export interface WhyFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: "1",
    stars: 5,
    text: "생각보다 정말 정확해서 놀랐어요.",
  },
  {
    id: "2",
    stars: 5,
    text: "AI 상담이 실제 상담받는 느낌이었습니다.",
  },
];

export const TRUST_STATS: TrustStat[] = [
  { id: "analyses", label: "지금까지 분석한 운명", value: "127,542+" },
  { id: "consultations", label: "AI 상담", value: "52,831+" },
  { id: "satisfaction", label: "만족도", value: "98%" },
];

export const WHY_UNMYEONG_LAB: WhyFeature[] = [
  {
    id: "ai",
    icon: "✦",
    title: "AI 심층 분석",
    description: "GPT 기반 맞춤형 사주·운세 해석",
  },
  {
    id: "modern",
    icon: "◈",
    title: "현대적인 운세 분석",
    description: "전통 사주를 쉽고 세련되게",
  },
  {
    id: "mobile",
    icon: "◇",
    title: "모바일 최적화",
    description: "언제 어디서나 빠른 분석",
  },
  {
    id: "update",
    icon: "◎",
    title: "지속적인 업데이트",
    description: "더 정확한 AI 분석을 위해 개선 중",
  },
];
