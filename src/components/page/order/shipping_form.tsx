"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { ShippingAddressFormValues,shippingAddressSchema } from "@/zod/shipping"
import { useEffect } from "react"

interface ShippingAddressFormProps {
  onSubmit: (data: ShippingAddressFormValues) => void
  value?: ShippingAddressFormValues

}

export function ShippingAddressForm({ onSubmit,value  }: ShippingAddressFormProps) {

 
  const form = useForm<ShippingAddressFormValues>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      firstName: value?.firstName ,
      lastName: value?.lastName ,
      address1: value?.address1 ,
      address2: value?.address2 ,
      city: value?.city,
     state: value?.state,
      country: value?.country,
      zip: value?.zip ,
    
    },
  })
  useEffect(() => {
    if (value) {
      form.reset(value)
    }
  }, [value, form])

  // Check if form has changes
  const hasChanges = form.formState.isDirty

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-5">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">First name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} className="bg-gray-800 border-gray-700 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} className="bg-gray-800 border-gray-700 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="address1"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St" {...field} className="bg-gray-800 border-gray-700 text-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">City</FormLabel>
                <FormControl>
                  <Input placeholder="New York" {...field} className="bg-gray-800 border-gray-700 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">State/Province</FormLabel>
                <FormControl>
                  <Input placeholder="NY" {...field} className="bg-gray-800 border-gray-700 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Country</FormLabel>
                <FormControl>
                  <Input placeholder="United States" {...field} className="bg-gray-800 border-gray-700 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">ZIP/Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="10001" {...field} className="bg-gray-800 border-gray-700 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
       
        <div className="flex justify-end gap-3 pt-2">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={!hasChanges}>
            Save Address
          </Button>
        </div>
      </form>
    </Form>
  )
}
