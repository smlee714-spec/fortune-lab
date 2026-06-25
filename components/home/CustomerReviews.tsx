import { CUSTOMER_REVIEWS } from "@/lib/trust-content";

function renderStars(count: number) {
  return "★".repeat(count) + "☆".repeat(5 - count);
}

export default function CustomerReviews() {
  return (
    <section className="trust-section" aria-labelledby="reviews-title">
      <h2 id="reviews-title" className="trust-section-title">
        고객 후기
      </h2>
      <div className="review-list">
        {CUSTOMER_REVIEWS.map((review) => (
          <article key={review.id} className="review-card">
            <p className="review-stars" aria-label={`${review.stars}점 만점`}>
              {renderStars(review.stars)}
            </p>
            <p className="review-text">&ldquo;{review.text}&rdquo;</p>
          </article>
        ))}
      </div>
      <p className="trust-sample-note">예시 후기 · 실제 사용자 피드백 반영 예정</p>
    </section>
  );
}
