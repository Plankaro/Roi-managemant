"use client"

import { useState, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {  Check, Copy, AlertCircle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { IntegrationStatus } from "@/app/(dashboard)/integrations/page"

import { useGetIntegrationsQuery } from "@/store/features/apislice"

export const whatsappFormSchema = z.object({
  whatsapp_mobile_id: z
    .string()
    .min(1, 'WhatsApp Mobile ID is required')
    .regex(/^\d+$/, 'WhatsApp Mobile ID must be numeric'),

  whatsapp_mobile: z
    .string()
    .min(10, 'WhatsApp number must be at least 10 digits')
    .max(15, 'WhatsApp number must not exceed 15 digits')
    .regex(/^\+?\d+$/, 'WhatsApp number must be valid and numeric'),

  whatsapp_token: z
    .string()
    .min(10, 'WhatsApp token must be at least 10 characters')
    .regex(/^[A-Za-z0-9-_]+$/, 'WhatsApp token must be alphanumeric with optional - or _'),

  whatsapp_buisness_id: z
    .string()
    .min(1, 'WhatsApp Business ID is required')
    .regex(/^\d+$/, 'Business ID must be numeric'),

  whatsapp_app_id: z
    .string()
    .min(5, 'App ID must be at least 5 characters')
    .regex(/^\d+$/, 'App ID must be numeric'),
})


export function WhatsappComponent() {
  const [isWhatsappConnected, setIsWhatsappConnected] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const webhookUrl = "https://api.yourservice.com/webhooks/whatsapp/12345"
  const webhookRef = useRef<HTMLInputElement>(null)

  const { data: integrations } = useGetIntegrationsQuery({}) as { data?: IntegrationStatus };

  const whatsappForm = useForm<z.infer<typeof whatsappFormSchema>>({
    resolver: zodResolver(whatsappFormSchema),
    defaultValues: {
      whatsapp_mobile_id: "",
      whatsapp_mobile: "",
      whatsapp_token: "",
      whatsapp_buisness_id: "",
      whatsapp_app_id: "",
    },
  })

  function onWhatsappSubmit(data: z.infer<typeof whatsappFormSchema>) {
    console.log(data)
    // Handle WhatsApp integration
    setIsWhatsappConnected(true)
  }

  function disconnectWhatsapp() {
    setIsWhatsappConnected(false)
    whatsappForm.reset()
  }

  const copyWebhookUrl = () => {
    if (webhookRef.current) {
      webhookRef.current.select()
      document.execCommand("copy")
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  return (
    <Card className="bg-backgroundColor border-primary text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
           <Image src="/icons/whatsapp.svg" alt="Shopify" height={16} width={16} />
          WhatsApp Integration
          {isWhatsappConnected && (
            <Badge variant="outline" className="ml-2 bg-green-500/20 text-green-500 border-green-500/20">
              <Check className="w-3 h-3 mr-1" /> Connected
            </Badge>
          )}
        </CardTitle>
        <CardDescription>Connect your WhatsApp Business account to enable messaging.</CardDescription>
      </CardHeader>
      <CardContent>
        {integrations && integrations?.is_whatsapp_connected ? (
          <div className="space-y-6">
            <Alert className="bg-green-500/10 border-green-500/20">
              <Check className="h-4 w-4 text-white " />
              <AlertTitle className="text-green-500">Connected to WhatsApp</AlertTitle>
              <AlertDescription className="text-green-500">
                Your WhatsApp Business account is successfully connected. You can now send and receive messages.
              </AlertDescription>
            </Alert>

            <div className="flex flex-col p-4 border rounded-md space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">WhatsApp Business Account</h3>
                <Button  onClick={disconnectWhatsapp} className="text-white hover:text-white bg-primary hover:bg-primary">
                  Disconnect
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Connected on {new Date().toLocaleDateString()}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm font-medium">Phone Number</p>
                  <p className="text-sm">{integrations?.whatsapp_mobile || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Business ID</p>
                  <p className="text-sm">{integrations?.whatsapp_buisness_id || "Not provided"}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Webhook Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Use this webhook URL in your WhatsApp Business API settings to receive messages and events.
              </p>

              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Input ref={webhookRef} value={webhookUrl} readOnly className="pr-10 font-mono text-sm" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={copyWebhookUrl}
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                <Button type="button"  className="text-sm text-white bg-primary-500" size="sm" onClick={copyWebhookUrl}>
                  {isCopied ? "Copied!" : "Copy"}
                </Button>
              </div>

              <Alert variant="default" className="bg-amber-500/10 border-amber-500/20">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <AlertTitle className="text-amber-500">Important</AlertTitle>
                <AlertDescription className="text-amber-500">
                  After setting up this webhook in your WhatsApp Business API, you&apos;ll need to verify it by responding to
                  the challenge request.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        ) : (
          <Form {...whatsappForm}>
            <form onSubmit={whatsappForm.handleSubmit(onWhatsappSubmit)} className="space-y-4">
              <FormField
                control={whatsappForm.control}
                name="whatsapp_mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={whatsappForm.control}
                name="whatsapp_mobile_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Mobile ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Mobile ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={whatsappForm.control}
                name="whatsapp_token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Token</FormLabel>
                    <FormControl>
                      <Input placeholder="API Token" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={whatsappForm.control}
                name="whatsapp_buisness_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Business ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Business ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={whatsappForm.control}
                name="whatsapp_app_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp App ID</FormLabel>
                    <FormControl>
                      <Input placeholder="App ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="bg-primary-700 hover:bg-primary-800">
                Connect WhatsApp
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}
