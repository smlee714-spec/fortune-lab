import { Suspense } from "react";
import PremiumFailView from "@/components/premium/PremiumFailView";

export default function PremiumFailPage() {
  return (
    <Suspense fallback={null}>
      <PremiumFailView />
    </Suspense>
  );
}
