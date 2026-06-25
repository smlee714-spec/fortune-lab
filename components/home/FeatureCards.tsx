"use client";

export interface HomeFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
  available: boolean;
}

const FEATURES: HomeFeature[] = [
  { id: "saju", icon: "命", title: "사주", description: "AI 사주 분석", available: true },
  { id: "tarot", icon: "卜", title: "타로", description: "카드 운세", available: false },
  { id: "face", icon: "相", title: "관상", description: "얼굴 운명", available: false },
  { id: "palm", icon: "掌", title: "손금", description: "손바닥 운명", available: false },
  { id: "match", icon: "合", title: "궁합", description: "두 사람 운명", available: false },
];

interface FeatureCardsProps {
  onSelectSaju: () => void;
}

export default function FeatureCards({ onSelectSaju }: FeatureCardsProps) {
  return (
    <div className="feature-grid">
      {FEATURES.map((feature) => {
        const isSaju = feature.id === "saju";

        if (isSaju && feature.available) {
          return (
            <button
              key={feature.id}
              type="button"
              className="feature-card feature-card-active"
              onClick={onSelectSaju}
            >
              <span className="feature-card-icon">{feature.icon}</span>
              <span className="feature-card-title">{feature.title}</span>
              <span className="feature-card-desc">{feature.description}</span>
            </button>
          );
        }

        return (
          <div key={feature.id} className="feature-card feature-card-soon" aria-disabled>
            <span className="feature-card-badge">준비중</span>
            <span className="feature-card-icon">{feature.icon}</span>
            <span className="feature-card-title">{feature.title}</span>
            <span className="feature-card-desc">{feature.description}</span>
          </div>
        );
      })}
    </div>
  );
}
