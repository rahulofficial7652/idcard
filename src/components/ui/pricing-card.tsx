"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function PricingCard({
  title,
  price,
  description,
  features = [],
  highlight = false,
}: {
  title: string
  price: string
  description: string
  features: string[]
  highlight?: boolean
}) {
  return (
    <Card className={`${highlight ? "border-primary shadow-lg scale-[1.02]" : ""} transition`}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <p className="text-4xl font-bold mt-2">{price}</p>
      </CardHeader>

      <CardContent className="space-y-3 mt-3">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-primary" />
            <span>{f}</span>
          </div>
        ))}

        <Button className="w-full mt-4" variant={highlight ? "default" : "outline"}>
          Choose Plan
        </Button>
      </CardContent>
    </Card>
  )
}
