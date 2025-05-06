/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { X } from "lucide-react"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCreateOrUpdateBotMutation } from "@/store/features/apislice"
import { toast } from "react-hot-toast"

// Define the form schema with validation
const formSchema = z.object({
  shipping_standard_cost: z.string().min(1, "Standard shipping cost is required"),
  shipping_threshold: z.string().min(1, "Free shipping threshold is required"),
  international_shipping_cost: z.string().min(1, "International shipping cost is required"),
})

interface ShippingChargesModalProps {
  onClose: () => void
  initialData?: any
}

export default function ShippingChargesModal({ onClose, initialData }: ShippingChargesModalProps) {
    const [botMutation]=useCreateOrUpdateBotMutation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shipping_standard_cost: initialData?.shipping_standard_cost??"5.99",
      shipping_threshold: initialData?.shipping_threshold??"50",
      international_shipping_cost: initialData?.international_shipping_cost??"15.99",
    },
  })

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      type:initialData?.type,
      ...values
    }
    const promise = botMutation(payload).unwrap()
    toast.promise(promise,{
      loading:"updating",
      success:"update successful",
      error:(error:any) => error?.data?.message || "An unexpected error occurred.",
      
    })
    console.log(values)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="relative border-b">
          <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
          <CardTitle>Shipping Charges Settings</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="shipping_standard_cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Standard Shipping (₹)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="Enter standard shipping charge" {...field} />
                      </FormControl>
                      <FormDescription>This is the default shipping charge for all orders.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shipping_threshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Free Shipping Threshold (₹)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Enter minimum order amount for free shipping"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Orders above this amount will qualify for free shipping.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="international_shipping_cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>International Shipping (₹)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="Enter international shipping charge" {...field} />
                      </FormControl>
                      <FormDescription>This is the default shipping charge for international orders.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
