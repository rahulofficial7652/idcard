"use client";

import { useState } from "react";
import { PricingCard } from "@/components/ui/pricing-card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);

  // Calculate pricing based on toggle
  const proPricing = yearly ? "₹5,999/yr" : "₹599/mo";
  const basicLimit = yearly ? "Up to 600 ID cards/year" : "Up to 50 ID cards/mo";
  const enterprisePricing = yearly ? "Custom yearly pricing" : "Custom monthly pricing";

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Simple, Transparent  
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            {" "}Pricing
          </span>
        </h1>

        <p className="text-muted-foreground mt-4 text-lg">
          No hidden fees. No contracts. Flexible for all organizations.
        </p>
      </div>

      {/* Toggle */}
      <div className="flex justify-center items-center gap-3 mt-10">
        <Label className="text-muted-foreground">Monthly</Label>
        <Switch checked={yearly} onCheckedChange={setYearly} />
        <Label className="text-muted-foreground">Yearly (Save 15%)</Label>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 mt-14">

        {/* BASIC */}
        <PricingCard
          title="Basic"
          price={yearly ? "₹0" : "₹0"}
          description="For small teams starting with ID cards."
          features={[
            basicLimit,
            "Basic templates",
            "1 Admin, 1 Employee",
            "Email support",
          ]}
        />

        {/* PRO */}
        <PricingCard
          highlight
          title="Pro"
          price={proPricing}
          description="Best for growing organizations."
          features={[
            "Unlimited ID cards",
            "Advanced templates",
            "Up to 10 employees",
            "Logo & brand settings",
            "Priority support",
          ]}
        />

        {/* ENTERPRISE */}
        <PricingCard
          title="Enterprise"
          price={enterprisePricing}
          description="For large institutions & companies."
          features={[
            "Custom templates",
            "Dedicated onboarding",
            "Unlimited employees",
            "24/7 support",
          ]}
        />
      </div>

      {/* Footer Note */}
      <p className="text-center mt-12 text-sm text-muted-foreground">
        Need a custom plan?{" "}
        <span className="text-primary underline cursor-pointer">Contact us</span>.
      </p>
    </div>
  );
}
