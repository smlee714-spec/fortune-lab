interface ResultFortuneErrorProps {
  message: string;
  onRetry: () => void;
}

export default function ResultFortuneError({ message, onRetry }: ResultFortuneErrorProps) {
  return (
    <div className="fortune-state fortune-state-error" role="alert">
      <p className="fortune-state-icon" aria-hidden>
        ◈
      </p>
      <p className="fortune-state-message">{message}</p>
      <button type="button" className="btn-primary fortune-state-retry" onClick={onRetry}>
        다시 시도
      </button>
    </div>
  );
}
