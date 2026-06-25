import type { ReactNode } from "react";
import AnalysisSectionHeader from "./AnalysisSectionHeader";

interface AnalysisBlockProps {
  number: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function AnalysisBlock({
  number,
  title,
  subtitle,
  children,
}: AnalysisBlockProps) {
  return (
    <section className="analysis-block">
      <AnalysisSectionHeader number={number} title={title} subtitle={subtitle} />
      {children}
    </section>
  );
}
