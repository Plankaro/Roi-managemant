/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Image from "next/image"
import { usePostRazorPayMutation } from "@/store/features/apislice"
import toast from "react-hot-toast"


interface RazorpayModalProps {
  isOpen: boolean
  onClose: () => void
}

const formSchema = z.object({
  keyId: z.string().min(1, "Key ID is required"),
  keySecret: z.string().min(1, "Key Secret is required"),
})

type FormValues = z.infer<typeof formSchema>

export function RazorpayModal({ isOpen, onClose }: RazorpayModalProps) {
  const [postRazorPay,{isLoading}]=usePostRazorPayMutation()
  const [copied, setCopied] = useState(false)
  const webhookUrl = "https://your-webhook-endpoint.com/razorpay-webhook"

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyId: "",
      keySecret: "",
    },
  })

  const onSubmit = (values: FormValues) => {
    const promise = postRazorPay(values).unwrap()
    toast.promise(promise, {
      loading: "Connecting...",
      success: "Connected successfully!",
      error: (error: any) => error?.data?.message || "An unexpected error occurred",
    })

    console.log("Connecting Razorpay with:", values)
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
              <Image src="/icons/razorpay-1.svg" alt="Razorpay" width={156.8} height={30} />
            </div>
          </div>
        </div>
        <div className="px-6 pb-2">
          <p className="text-sm text-gray-600 mb-4">
            Push conversations and lead event to Razorpay for comprehensive performance tracking and insights.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="keyId"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Key ID*</FormLabel>
                    <FormControl>
                      <Input placeholder="rzp_xxxxxxxxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="keySecret"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Key Secret*</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your key secret" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <h4 className="text-sm font-medium">Webhook URL</h4>
                </div>
                <div className="flex">
                  <div className="flex-grow relative">
                    <Input value={webhookUrl} readOnly className="pr-10 bg-gray-50 text-gray-600" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={copyToClipboard}
                    >
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Configure a webhook URL to receive real-time payment notifications
                </p>
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
