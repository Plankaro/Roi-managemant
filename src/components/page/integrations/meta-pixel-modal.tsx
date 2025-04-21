"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface MetaPixelModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MetaPixelModal({ isOpen, onClose }: MetaPixelModalProps) {
  const [pixelId, setPixelId] = useState("")

  const handleConnect = () => {
    // Handle connection logic here
    console.log("Connecting Meta Pixel with:", { pixelId })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white p-0 overflow-hidden border-0">
        <div className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-400 rounded flex items-center justify-center">
                <span className="text-sm">📱</span>
              </div>
              <h2 className="font-semibold">Meta Pixel</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
        <div className="px-6 pb-2">
          <p className="text-sm text-gray-600 mb-4">
            Incorporate the meta pixel tracking code into your conversational landing pages to gain comprehensive
            performance analytics.
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="pixel-id" className="text-sm font-medium">
                Pixel ID*
              </label>
              <Input
                id="pixel-id"
                value={pixelId}
                onChange={(e) => setPixelId(e.target.value)}
                placeholder="Enter your pixel ID"
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
