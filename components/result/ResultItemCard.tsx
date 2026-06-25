import Link from "next/link";
import type { ResultModeItem } from "@/lib/result-modes";
import { buildResultItemPath, type ResultQueryParams } from "@/lib/result-routes";

interface ResultItemCardProps {
  item: ResultModeItem;
  preview: string;
  params: ResultQueryParams;
}

export default function ResultItemCard({ item, preview, params }: ResultItemCardProps) {
  const href = buildResultItemPath(item.id, params);

  return (
    <article className="result-item-card">
      <div className="result-item-card-head">
        <span className="result-item-icon" aria-hidden>
          {item.icon}
        </span>
        <div>
          <h3 className="result-item-title">{item.title}</h3>
          <p className="result-item-hook">{item.hook}</p>
        </div>
      </div>
      <p className="result-item-preview">{preview}</p>
      <Link href={href} className="result-item-detail-btn">
        자세히 보기
      </Link>
    </article>
  );
}
