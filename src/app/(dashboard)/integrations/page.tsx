"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { IntegrationCard } from "@/components/page/integrations/integration-card"
import { GoogleAnalyticsModal } from "@/components/page/integrations/google-anaytics-modal"
import { RazorpayModal } from "@/components/page/integrations/razorpay-intgration"
import { MetaPixelModal } from "@/components/page/integrations/meta-pixel-modal"
import { Input } from "@/components/ui/input"

// Integration data
const integrations = [
  {
    id: "google-analytics",
    name: "Google Analytics 4",
    description:
      "Send conversations and lead events to Google Analytics for thorough performance tracking and valuable insights.",
    icon: "./icons/g-analytics.svg",
    color: "bg-amber-500",
  },
  {
    id: "razorpay",
    name: "Razorpay",
    description: "Push conversations and lead event to razor pay for comprehensive performance tracking and insights.",
    icon: "./icons/razorpay.svg",
    color: "bg-blue-500",
  },
  {
    id: "meta-pixel",
    name: "Meta Pixel",
    description:
      "Incorporate the meta pixel tracking code into your conversational landing pages to gain comprehensive performance analytics.",
    icon: "./icons/meta-pixel.svg",
    color: "bg-blue-400",
  },
]

export default function DataIntegration() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeModal, setActiveModal] = useState<string | null>(null)

  // Filter integrations based on search query
  const filteredIntegrations = integrations.filter(
    (integration) =>
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Data Integration</h1>

      {/* Search bar */}
      <div className="relative mb-8 max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          type="search"
          placeholder="Search here..."
          className="pl-10 bg-[#0D0D0D4D] border-primary text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Integration cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIntegrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            onConnect={() => setActiveModal(integration.id)}
          />
        ))}

        {filteredIntegrations.length === 0 && (
          <div className="col-span-full text-center py-10 text-white">No integrations found matching your search.</div>
        )}
      </div>

      {/* Modals */}
      <GoogleAnalyticsModal isOpen={activeModal === "google-analytics"} onClose={() => setActiveModal(null)} />
      <RazorpayModal isOpen={activeModal === "razorpay"} onClose={() => setActiveModal(null)} />
      <MetaPixelModal isOpen={activeModal === "meta-pixel"} onClose={() => setActiveModal(null)} />
    </div>
  )
}
