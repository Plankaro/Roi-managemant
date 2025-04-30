"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useGetIntegrationsQuery } from "@/store/features/apislice" // Adjust import path as needed
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, ArrowRight, ShoppingBag, MessageCircle } from "lucide-react"

interface IntegrationCheckWrapperProps {
  children: React.ReactNode
}

export default function IntegrationCheckWrapper({ children }: IntegrationCheckWrapperProps) {
  const [showModal, setShowModal] = useState(false)
  const pathname = usePathname()

  const { data: integrations, isLoading } = useGetIntegrationsQuery({})

  useEffect(() => {
    // Only show the modal if we're not on the settings page
    // and either WhatsApp or Shopify is not connected
    if (
      !isLoading &&
      integrations &&
      !pathname.startsWith("/settings")  &&
      !pathname.startsWith("/teams") &&
      (!integrations.is_whatsapp_connected || !integrations.is_shopify_connected)
    ) {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
  }, [pathname, integrations, isLoading])

  const getMissingIntegrations = () => {
    if (!integrations) return []
    const missing = []
    if (!integrations.is_whatsapp_connected) missing.push("WhatsApp")
    if (!integrations.is_shopify_connected) missing.push("Shopify")
    return missing
  }

  return (
    <>
      {children}

      <Dialog open={showModal}>
        <DialogContent className="sm:max-w-md md:max-w-lg bg-blue-50" hideCloseButton>
          <DialogHeader className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-4 bg-red-100 p-3 rounded-full"
            >
              <AlertCircle className="h-10 w-10 text-red-600" />
            </motion.div>
            <DialogTitle className="text-2xl font-bold">Required Integrations</DialogTitle>
            <DialogDescription className="text-base mt-2">
              To use our app, you need to connect the following services:
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <div className="space-y-4">
              <AnimatePresence>
                {!isLoading && integrations && !integrations.is_whatsapp_connected && (
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-transparent border border-green-200 rounded-lg"
                  >
                    <div className="bg-green-100 p-2 rounded-full">
                      <MessageCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">WhatsApp</h3>
                      <p className="text-sm text-muted-foreground">Connect to enable messaging features</p>
                    </div>
                  </motion.div>
                )}

                {!isLoading && integrations && !integrations.is_shopify_connected && (
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-transparent border border-purple-200 rounded-lg"
                  >
                    <div className="bg-purple-100 p-2 rounded-full">
                      <ShoppingBag className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Shopify</h3>
                      <p className="text-sm text-muted-foreground">Connect to sync your products and orders</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <DialogFooter className="mt-2">
            <Link href="/settings" className="w-full">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
                <Button className="w-full gap-2 py-6 text-base bg-blue-500 hover:bg-blue-600" size="lg" >
                  Go to Settings
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
          </DialogFooter>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-sm text-muted-foreground mt-4"
          >
            Connect {getMissingIntegrations().join(" and ")} to unlock all features
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  )
}
