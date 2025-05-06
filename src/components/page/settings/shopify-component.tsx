/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {  Check } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";
import { useGetIntegrationsQuery } from "@/store/features/apislice"
import { IntegrationStatus } from "@/app/(dashboard)/integrations/page"
import { useUninstallShopifyMutation } from "@/store/features/apislice"
import toast from "react-hot-toast"
import { useInstallShopifyMutation } from "@/store/features/apislice"

const shopifyFormSchema = z.object({
  shopifyName: z.string().min(2, {
    message: "Shopify name must be at least 2 characters.",
  }),
})

export function ShopifyComponent() {
  const router = useRouter()
  const { data} = useGetIntegrationsQuery({}) as { data?: IntegrationStatus,isLoading?:boolean };
  const [uninstallShopify] = useUninstallShopifyMutation({})
  const [installShopify] = useInstallShopifyMutation({})

  
    const session:any = useSession();
    //console.log(session)
  
  const user = session?.data?.user?.user

 

  const shopifyForm = useForm<z.infer<typeof shopifyFormSchema>>({
    resolver: zodResolver(shopifyFormSchema),
    defaultValues: {
      shopifyName: "",
    },
  })
  async function onShopifySubmit(data: { shopifyName: string }) {
    const shopDomain = `${data.shopifyName}.myshopify.com`
    const payload = {
      shopifyName:shopDomain
    }
    console.log(user?.buisness?.id);
    console.log("www",data)
    
    const promise = installShopify(payload).unwrap();
    toast.promise(promise, {
      loading: "Connecting...",
      success: "Connected successfully!",
      error: (error: any) => error?.data?.message || "An unexpected error occurred",
    })
    console.log("Connecting Shopify with:", await promise)
    const {installUrl} = await promise
  
    router.push(installUrl);
    // Redirect merchant to your backend's /auth/shopify endpoint
   
  }

  // …rest of component…


  function disconnectShopify() {
    const promise = uninstallShopify({}).unwrap();
    toast.promise(promise, {
      loading: "Disconnecting...",
      success: "Disconnected successfully!",
      error: (error: any) => error?.data?.message || "An unexpected error occurred",
    })
    
  }

  return (
    <Card className="bg-backgroundColor border-primary text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
           <Image src="/icons/shopify.png" alt="Shopify" height={16} width={16} />
          Shopify Integration
          {data && data?.is_shopify_connected && (
            <Badge variant="outline" className="ml-2 bg-green-500/20 text-green-500 border-green-500/20">
              <Check className="w-3 h-3 mr-1" /> Connected
            </Badge>
          )}
        </CardTitle>
        <CardDescription>Connect your Shopify store to sync products and orders.</CardDescription>
      </CardHeader>
      <CardContent>
        {data && data?.is_shopify_connected ? (
          <div className="space-y-4">
            <Alert className="bg-backgroundColor">
            <Check className="h-4 w-6 fill-green-500 stroke-green-500" />

              <AlertTitle className="text-green-500">Connected to Shopify</AlertTitle>
              <AlertDescription className="text-white">
                Your Shopify store is successfully connected. You can now sync products and orders.
              </AlertDescription>
            </Alert>
            <div className="flex md:flex-row flex-col items-center justify-between p-4 border rounded-md">
              <div>
                <h3 className="font-medium">Store: {data?.shopify_domain}</h3>
              
              </div>
              <Button  onClick={() => disconnectShopify()} className="text-white bg-primary-700">
                Disconnect
              </Button>
            </div>
          </div>
        ) : (
          <Form {...shopifyForm}>
            <form onSubmit={shopifyForm.handleSubmit(onShopifySubmit)} className="space-y-4">
              <FormField
                control={shopifyForm.control}
                name="shopifyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shopify Store Name</FormLabel>
                    <FormControl>
                      <Input placeholder="your-store.myshopify.com" {...field} />
                    </FormControl>
                    <FormDescription>Enter your Shopify store name without the .myshopify.com part</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-primary-700 hover:bg-primary-800">
                Connect Shopify
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}
