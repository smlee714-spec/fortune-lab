import Link from "next/link";
import type { AnalysisMenuItem } from "@/lib/result-routes";
import { buildResultPath } from "@/lib/result-routes";
import type { ResultQueryParams } from "@/lib/result-routes";

interface AnalysisMenuCardProps {
  item: AnalysisMenuItem;
  params: ResultQueryParams;
}

export default function AnalysisMenuCard({ item, params }: AnalysisMenuCardProps) {
  const href = buildResultPath(`/result/${item.section}`, params);

  return (
    <Link href={href} className="menu-card group relative z-[1]">
      <span className="lux-chip relative z-[1] mb-3 h-10 w-10 text-base transition-colors duration-lux group-hover:border-saju-gold/35">
        {item.icon}
      </span>
      <h3 className="relative z-[1] text-center font-serif text-[0.78rem] font-medium leading-snug tracking-wide text-saju-cream transition-colors duration-lux group-hover:text-saju-gold-light sm:text-sm">
        {item.title}
      </h3>
    </Link>
  );
}
