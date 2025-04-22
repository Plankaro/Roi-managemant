"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingBag, MessageCircle, User } from "lucide-react"
import { ProfileComponent } from "@/components/page/settings/profile-component"
import { PasswordComponent } from "@/components/page/settings/password-component"
import { ShopifyComponent } from "@/components/page/settings/shopify-component"
import { WhatsappComponent } from "@/components/page/settings/whatsapp-component"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2 text-white">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="">Manage your account settings and integrations.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-3 h-auto p-1 bg-primary-800/20">
          <TabsTrigger
            value="profile"
            className="py-2.5 data-[state=active]:bg-primary-800 data-[state=active]:text-white "
          >
            <User className="w-4 h-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger
            value="shopify"
            className="py-2.5 data-[state=active]:bg-primary-800 data-[state=active]:text-white gap-3"
          >
            <Image src="/icons/shopify.png" alt="Shopify" height={16} width={16} />
            Shopify
          </TabsTrigger>
          <TabsTrigger
            value="whatsapp"
            className="py-2.5 data-[state=active]:bg-primary-800 data-[state=active]:text-white gap-3"
          >
             <Image src="/icons/whatsapp.svg" alt="Shopify" height={16} width={16} />
       
            WhatsApp
          </TabsTrigger>
        </TabsList>

<div className="h-[calc(100vh-260px)] overflow-auto no-scrollbar">
        <TabsContent value="profile" className="mt-6 space-y-6 ">
          <ProfileComponent />
          <PasswordComponent />
        </TabsContent>

        <TabsContent value="shopify" className="mt-6">
          <ShopifyComponent />
        </TabsContent>

        <TabsContent value="whatsapp" className="mt-6">
          <WhatsappComponent />
        </TabsContent>
        </div>
      </Tabs>
   
    </div>
  )
}
