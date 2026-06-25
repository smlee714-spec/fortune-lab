import { TRUST_STATS } from "@/lib/trust-content";

export default function TrustStats() {
  return (
    <section className="trust-section" aria-labelledby="stats-title">
      <h2 id="stats-title" className="sr-only">
        운명랩 통계
      </h2>
      <div className="stats-grid">
        {TRUST_STATS.map((stat) => (
          <div key={stat.id} className="stat-card">
            <p className="stat-value">{stat.value}</p>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
      <p className="trust-sample-note">예시 통계 데이터</p>
    </section>
  );
}
