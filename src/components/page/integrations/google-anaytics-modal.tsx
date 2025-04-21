"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface GoogleAnalyticsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function GoogleAnalyticsModal({ isOpen, onClose }: GoogleAnalyticsModalProps) {
  const [measurementId, setMeasurementId] = useState("")
  const [apiSecret, setApiSecret] = useState("")

  const handleConnect = () => {
    // Handle connection logic here
    console.log("Connecting Google Analytics with:", { measurementId, apiSecret })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white p-0 overflow-hidden border-0">
        <div className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center">
                <span className="text-sm">📊</span>
              </div>
              <h2 className="font-semibold">Google Analytics 4</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
        <div className="px-6 pb-2">
          <p className="text-sm text-gray-600 mb-4">
            Send conversations and lead events to Google Analytics for thorough performance tracking and valuable
            insights.
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="measurement-id" className="text-sm font-medium">
                Measurement ID*
              </label>
              <Input
                id="measurement-id"
                value={measurementId}
                onChange={(e) => setMeasurementId(e.target.value)}
                placeholder="G-XXXXXXXXXX"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="api-secret" className="text-sm font-medium">
                API Secret*
              </label>
              <Input
                id="api-secret"
                type="password"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                placeholder="Enter your API secret"
              />
            </div>
          </div>
        </div>
        <div className="p-6 flex justify-end">
          <Button onClick={handleConnect} className="bg-blue-600 hover:bg-blue-700 text-white">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
