import { Suspense } from "react";
import PremiumFailView from "@/components/premium/PremiumFailView";

export default function PaymentFailPage() {
  return (
    <Suspense fallback={null}>
      <PremiumFailView />
    </Suspense>
  );
}
