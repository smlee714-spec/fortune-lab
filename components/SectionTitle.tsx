interface SectionTitleProps {
  children: React.ReactNode;
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-saju-gold/40 to-transparent" />
      <h2 className="shrink-0 font-serif text-xs font-semibold tracking-[0.2em] text-saju-gold">
        {children}
      </h2>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-saju-gold/40 to-transparent" />
    </div>
  );
}
