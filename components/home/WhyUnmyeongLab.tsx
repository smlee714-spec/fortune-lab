import { WHY_UNMYEONG_LAB } from "@/lib/trust-content";

export default function WhyUnmyeongLab() {
  return (
    <section className="trust-section" aria-labelledby="why-title">
      <h2 id="why-title" className="trust-section-title">
        왜 운명랩인가?
      </h2>
      <ul className="why-list">
        {WHY_UNMYEONG_LAB.map((item) => (
          <li key={item.id} className="why-card">
            <span className="why-card-icon" aria-hidden>
              {item.icon}
            </span>
            <div>
              <p className="why-card-title">{item.title}</p>
              <p className="why-card-desc">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
