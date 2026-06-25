import { Suspense } from "react";
import { SajuResultProvider } from "@/contexts/SajuResultContext";
import ResultLoading from "@/components/result/ResultLoading";

export default function ResultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<ResultLoading />}>
      <SajuResultProvider>{children}</SajuResultProvider>
    </Suspense>
  );
}
