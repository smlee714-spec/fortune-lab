import { Suspense } from "react";
import PremiumSuccessView from "@/components/premium/PremiumSuccessView";

export default function PremiumSuccessPage() {
  return (
    <Suspense fallback={null}>
      <PremiumSuccessView />
    </Suspense>
  );
}
