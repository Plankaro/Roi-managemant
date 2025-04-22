/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { usePostGoogleAnalyticsMutation } from "@/store/features/apislice"
import Image from "next/image"
import toast from "react-hot-toast"
interface GoogleAnalyticsModalProps {
  isOpen: boolean
  onClose: () => void
}

const formSchema = z.object({
  measurementId: z.string().min(1, "Measurement ID is required"),
  apiSecret: z.string().min(1, "API Secret is required"),
})

type FormValues = z.infer<typeof formSchema>

export function GoogleAnalyticsModal({ isOpen, onClose }: GoogleAnalyticsModalProps) {
  const [postGoogleAnalytics, { isLoading }] = usePostGoogleAnalyticsMutation()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      measurementId: "",
      apiSecret: "",
    },
  })

  const onSubmit = (values: FormValues) => {
    const promise = postGoogleAnalytics(values).unwrap()
    toast.promise(promise, {
      loading: "Connecting...",
      success: "Connected successfully!",
      error: (error: any) => error?.data?.message || "An unexpected error occurred",
    })
    

    // Handle connection logic here
    console.log("Connecting Google Analytics with:", values)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white p-0 overflow-hidden border-0">
        <div className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src="/icons/g-analytics.svg" alt="Google" width={20} height={20} />
              <h2 className="font-semibold">Google Analytics 4</h2>
            </div>
          </div>
        </div>
        <div className="px-6 pb-2">
          <p className="text-sm text-gray-600 mb-4">
            Send conversations and lead events to Google Analytics for thorough performance tracking and valuable
            insights.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="measurementId"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Measurement ID*</FormLabel>
                    <FormControl>
                      <Input placeholder="G-XXXXXXXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apiSecret"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>API Secret*</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your API secret" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
