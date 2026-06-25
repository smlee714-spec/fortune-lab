interface FortuneEmojiCardProps {
  emoji: string;
  title: string;
  content: string;
}

export default function FortuneEmojiCard({ emoji, title, content }: FortuneEmojiCardProps) {
  return (
    <article className="fortune-emoji-card">
      <div className="fortune-emoji-card-head">
        <span className="fortune-emoji-card-icon" aria-hidden>
          {emoji}
        </span>
        <h3 className="fortune-emoji-card-title">{title}</h3>
      </div>
      <p className="fortune-emoji-card-body">{content}</p>
    </article>
  );
}
