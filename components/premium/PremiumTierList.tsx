"use client";

import { SERVICE_TIERS } from "@/lib/premium";
import { useEntitlements } from "@/hooks/usePremium";
import TierPlanCard from "./TierPlanCard";

export default function PremiumTierList() {
  const entitlements = useEntitlements();

  return (
    <section className="tier-compare" aria-label="요금제 비교">
      {SERVICE_TIERS.map((tier) => (
        <TierPlanCard key={tier.id} tier={tier} entitlements={entitlements} />
      ))}
    </section>
  );
}
