import { Suspense } from "react";
import PremiumSuccessView from "@/components/premium/PremiumSuccessView";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <PremiumSuccessView />
    </Suspense>
  );
}
