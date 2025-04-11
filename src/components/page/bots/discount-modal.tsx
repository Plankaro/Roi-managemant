/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { X } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCreateOrUpdateBotMutation } from "@/store/features/apislice"
import toast from "react-hot-toast"

// Define the form schema with validation
const formSchema = z.object({
  discount_type: z.enum(["PERCENTAGE", "AMOUNT"], {
    required_error: "Please select a discount type.",
  }),
  discount_amount: z.string().min(1, "Discount amount is required"),
  discount_expiry: z.string().min(1, "Validity period is required"),
  discount_minimum: z.string().min(1, "Minimum order value is required"),
  no_of_days_before_asking_discount: z.string().min(1, "Days before asking is required"),
})

interface DiscountModalProps {
  onClose: () => void
  initialData?: any
  
  
}

export default function DiscountModal({ onClose, initialData }: DiscountModalProps) {
  const [botMutation]=useCreateOrUpdateBotMutation()
  // Initialize the form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      discount_type:initialData?.discount_type?? "PERCENTAGE",
      discount_amount: initialData?.discount_amount??"10",
      discount_expiry: initialData?.discount_expiry??"30",
      discount_minimum: initialData?.discount_minimum??"200",
      no_of_days_before_asking_discount: initialData?.no_of_days_before_asking_discount?? "7",
    },
  })

  console.log(form.getValues())
  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      type:initialData?.type,
      ...values
    }
    const promise = botMutation(payload).unwrap()
    toast.promise(promise,{
      loading:"updating",
      success:"update successful",
      error:"failed to update"
      
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
          <CardTitle>Discount Settings</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="discount_type"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Discount Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="PERCENTAGE" id="percentage" />
                            </FormControl>
                            <FormLabel htmlFor="percentage" className="cursor-pointer">
                              Percentage (%)
                            </FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="AMOUNT" id="amount" />
                            </FormControl>
                            <FormLabel htmlFor="amount" className="cursor-pointer">
                              Fixed Amount (₹)
                            </FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discount_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {form.watch("discount_type") === "PERCENTAGE"
                          ? "Discount Percentage (%)"
                          : "Discount Amount (₹)"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="1"
                          placeholder={`Enter discount ${form.watch("discount_type") === "PERCENTAGE" ? "percentage" : "amount"}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discount_expiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valid for (days)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter validity period in days" {...field} />
                      </FormControl>
                      <FormDescription>The discount will be valid for this many days from creation.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discount_minimum"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Order Value (₹)</FormLabel>
                      <FormControl>
                        <Input type="number" step="1" placeholder="Enter minimum order value" {...field} />
                      </FormControl>
                      <FormDescription>
                        Orders must be at least this amount to qualify for the discount.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="no_of_days_before_asking_discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Days Before Asking Discount</FormLabel>
                      <FormControl>
                        <Input type="number" step="1" placeholder="Enter days before asking for discount" {...field} />
                      </FormControl>
                      <FormDescription>Number of days to wait before offering a discount again.</FormDescription>
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
