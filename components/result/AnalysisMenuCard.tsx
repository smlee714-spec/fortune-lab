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
    <Link href={href} className="menu-card menu-card-lift group">
      <span className="menu-card-icon">{item.icon}</span>
      <h3 className="menu-card-title">{item.title}</h3>
      <p className="menu-card-desc">{item.description}</p>
    </Link>
  );
}
