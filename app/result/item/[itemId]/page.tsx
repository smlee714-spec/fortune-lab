import { Suspense } from "react";
import ResultItemDetailView from "@/components/result/ResultItemDetailView";
import ResultLoading from "@/components/result/ResultLoading";

interface ResultItemPageProps {
  params: Promise<{ itemId: string }>;
}

export default async function ResultItemPage({ params }: ResultItemPageProps) {
  const { itemId } = await params;

  return (
    <Suspense fallback={<ResultLoading />}>
      <ResultItemDetailView itemId={itemId} />
    </Suspense>
  );
}
