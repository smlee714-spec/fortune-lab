import { Suspense } from "react";
import ResultMainView from "@/components/result/ResultMainView";
import ResultLoading from "@/components/result/ResultLoading";

export default function ResultPage() {
  return (
    <Suspense fallback={<ResultLoading />}>
      <ResultMainView />
    </Suspense>
  );
}
