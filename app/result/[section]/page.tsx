import { Suspense } from "react";
import ResultDetailView from "@/components/result/ResultDetailView";
import ResultLoading from "@/components/result/ResultLoading";

interface ResultSectionPageProps {
  params: Promise<{ section: string }>;
}

export default async function ResultSectionPage({ params }: ResultSectionPageProps) {
  const { section } = await params;

  return (
    <Suspense fallback={<ResultLoading />}>
      <ResultDetailView section={section} />
    </Suspense>
  );
}
