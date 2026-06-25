interface AnalysisSectionHeaderProps {
  number: number;
  title: string;
  subtitle?: string;
}

export default function AnalysisSectionHeader({
  number,
  title,
  subtitle,
}: AnalysisSectionHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-saju-gold/30 bg-saju-gold/10 font-serif text-xs font-bold text-saju-gold">
          {number}
        </span>
        <h2 className="font-serif text-base font-bold tracking-wide text-saju-cream">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-2 pl-10 text-xs leading-relaxed text-saju-cream/40">{subtitle}</p>
      )}
    </div>
  );
}
