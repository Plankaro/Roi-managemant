/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { IntegrationCard } from "@/components/page/integrations/integrationcard"
import { GoogleAnalyticsModal } from "@/components/page/integrations/google-anaytics-modal"
import { RazorpayModal } from "@/components/page/integrations/razorpay-intgration"
import { MetaPixelModal } from "@/components/page/integrations/meta-pixel-modal"
import { Input } from "@/components/ui/input"
import {
  useGetIntegrationsQuery,
  useDeleteGoogleAnalyticsMutation,
  useDeletemetapixelMutation,
  useDeleteRazorPayMutation,
} from "@/store/features/apislice"
import IntegrationSkeleton from "@/components/page/integrations/integration-skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Integration data
export type IntegrationStatus = {
  is_google_analytics_connected: boolean
  is_meta_pixel: boolean
  is_razorpay_connected: boolean
  is_whatsapp_connected: boolean
  shopify_domain: string
  whatsapp_mobile: string
  whatsapp_buisness_id: string,
  is_shopify_connected: boolean
}

export default function DataIntegration() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const { data, isLoading } = useGetIntegrationsQuery({}) as { data?: IntegrationStatus; isLoading?: boolean }
  const [deleteGoogleAnalytics] = useDeleteGoogleAnalyticsMutation()
  const [deletemetapixel] = useDeletemetapixelMutation()
  const [deleterazorpay] = useDeleteRazorPayMutation()

  const [copied, setCopied] = useState(false)
  const whatsappScript = ` <script src="${process.env.NEXT_PUBLIC_API_URL}/static/script.js" defer></script>`

  const copyScript = async () => {
    try {
      await navigator.clipboard.writeText(whatsappScript)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy script:', err)
    }
  }

  const integrations = [
    {
      id: "google-analytics",
      name: "Google Analytics 4",
      description:
        "Send conversations and lead events to Google Analytics for thorough performance tracking and valuable insights.",
      icon: "./icons/g-analytics.svg",
      color: "bg-amber-500",
      isconnected: data?.is_google_analytics_connected ?? false,
      onDisconnect: deleteGoogleAnalytics,
    },
    {
      id: "razorpay",
      name: "Razorpay",
      description: "Push conversations and lead event to Razorpay for comprehensive performance tracking and insights.",
      icon: "./icons/razorpay.svg",
      color: "bg-blue-500",
      isconnected: data?.is_razorpay_connected ?? false,
      onDisconnect: deleterazorpay,
    },
    {
      id: "meta-pixel",
      name: "Meta Pixel",
      description:
        "Incorporate the Meta Pixel tracking code into your conversational landing pages to gain comprehensive performance analytics.",
      icon: "./icons/meta-pixel.svg",
      color: "bg-blue-400",
      isconnected: data?.is_meta_pixel ?? false,
      onDisconnect: deletemetapixel,
    },
  ]

  const filteredIntegrations = integrations.filter(
    (integration) =>
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="mx-auto px-4 py-8 h-[calc(100vh-100px)] no-scrollbar overflow-y-auto">
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
        {isLoading ? (
          <IntegrationSkeleton />
        ) : (
          <>  {/* fragment to wrap multiple cards */}
            {filteredIntegrations.map((integration: any) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onConnect={() => setActiveModal(integration.id)}
                isConnected={integration.isconnected}
                disconnect={integration.onDisconnect}
              />
            ))}

            {/* WhatsApp integration card with copy script */}
            {"whatsapp".includes(searchQuery.toLowerCase()) || searchQuery === "" ? (
              <Card className="bg-transparent border-primary text-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-start gap-4">
                    <div className="flex items-center gap-4">
                      <Image src="./icons/whatsapp.svg" alt="whatsapp" width={40} height={40} />
                      <h3 className="font-medium text-lg">WhatsApp Widget</h3>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">
                      Integrate WhatsApp widget into your Shopify store. Copy the script tag below and paste it into your theme header.
                    </p>
                 
                  </div>
                </CardContent>
                <CardFooter className="px-6 py-4 flex justify-end">
                  <Button onClick={copyScript} className="bg-blue-600 hover:bg-blue-700 text-white">
                    {copied ? 'Copied!' : 'Copy Script'}
                  </Button>
                </CardFooter>
              </Card>
            ) : null}
          </>
        )}

        {filteredIntegrations.length === 0 && !isLoading && (
          <div className="col-span-full text-center py-10 text-white">
            No integrations found matching your search.
          </div>
        )}
      </div>

      {/* Modals */}
      <GoogleAnalyticsModal isOpen={activeModal === "google-analytics"} onClose={() => setActiveModal(null)} />
      <RazorpayModal isOpen={activeModal === "razorpay"} onClose={() => setActiveModal(null)} />
      <MetaPixelModal isOpen={activeModal === "meta-pixel"} onClose={() => setActiveModal(null)} />
    </div>
  )
}
