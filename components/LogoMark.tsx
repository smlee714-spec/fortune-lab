interface LogoMarkProps {
  size?: "sm" | "md";
}

export default function LogoMark({ size = "md" }: LogoMarkProps) {
  const box = size === "sm" ? "h-12 w-12 text-lg" : "h-[4.5rem] w-[4.5rem] text-2xl";

  return (
    <div className="relative mx-auto w-fit">
      <div
        className={`${box} relative flex items-center justify-center rounded-sm border border-saju-gold/35 bg-saju-ink/60 font-serif font-semibold text-saju-gold-light`}
        style={{
          boxShadow: "inset 0 0 0 1px rgba(201,162,39,0.08)",
        }}
      >
        命
      </div>
      <div
        className="absolute -inset-2 -z-10 rounded-sm border border-saju-gold/8"
        aria-hidden
      />
    </div>
  );
}
