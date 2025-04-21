"use client"

import { useState } from "react"
import { X, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface RazorpayModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RazorpayModal({ isOpen, onClose }: RazorpayModalProps) {
  const [keyId, setKeyId] = useState("")
  const [keySecret, setKeySecret] = useState("")
  const [copied, setCopied] = useState(false)

  const webhookUrl = "https://your-webhook-endpoint.com/razorpay-webhook"

  const handleConnect = () => {
    // Handle connection logic here
    console.log("Connecting Razorpay with:", { keyId, keySecret })
    onClose()
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(webhookUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white p-0 overflow-hidden border-0">
        <div className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-sm">💳</span>
              </div>
              <h2 className="font-semibold">Razorpay</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
        <div className="px-6 pb-2">
          <p className="text-sm text-gray-600 mb-4">
            Push conversations and lead event to razor pay for comprehensive performance tracking and insights.
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="key-id" className="text-sm font-medium">
                Key ID*
              </label>
              <Input
                id="key-id"
                value={keyId}
                onChange={(e) => setKeyId(e.target.value)}
                placeholder="rzp_xxxxxxxxxx"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="key-secret" className="text-sm font-medium">
                Key Secret*
              </label>
              <Input
                id="key-secret"
                type="password"
                value={keySecret}
                onChange={(e) => setKeySecret(e.target.value)}
                placeholder="Enter your key secret"
              />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <h4 className="text-sm font-medium">Webhook URL</h4>
            </div>
            <div className="flex">
              <div className="flex-grow relative">
                <Input value={webhookUrl} readOnly className="pr-10 bg-gray-50 text-gray-600" />
                <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full" onClick={copyToClipboard}>
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-500">Configure a webhook URL to receive real-time payment notifications</p>
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
