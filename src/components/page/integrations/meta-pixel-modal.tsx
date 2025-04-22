/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Image from "next/image"
import { usePostmetapixelMutation } from "@/store/features/apislice"
import toast from "react-hot-toast"

interface MetaPixelModalProps {
  isOpen: boolean
  onClose: () => void
}

const formSchema = z.object({
  pixelId: z.string().min(1, "Pixel ID is required"),
})

type FormValues = z.infer<typeof formSchema>

export function MetaPixelModal({ isOpen, onClose }: MetaPixelModalProps) {
  const [postmetapixel, { isLoading }] = usePostmetapixelMutation()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pixelId: "",
    },
  })

  const onSubmit = (values: FormValues) => {
    const promise = postmetapixel(values).unwrap()
    toast.promise(promise, {
      loading: "Connecting...",
      success: "Connected successfully!",
      error: (error: any) => error?.data?.message || "An unexpected error occurred",
    })
    console.log("Connecting Meta Pixel with:", values)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white p-0 overflow-hidden border-0">
        <div className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src="/icons/meta-pixel.svg" alt="Meta Pixel" width={20} height={20} />
              <h2 className="font-semibold">Meta Pixel</h2>
            </div>
          </div>
        </div>
        <div className="px-6 pb-2">
          <p className="text-sm text-gray-600 mb-4">
            Incorporate the meta pixel tracking code into your conversational landing pages to gain comprehensive
            performance analytics.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="pixelId"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Pixel ID*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your pixel ID" {...field} />
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
