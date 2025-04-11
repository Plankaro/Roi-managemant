"use client";
import { Bot } from "lucide-react"
import ShippingChargesBot from "@/components/page/bots/shipping-charges-bot"
import DiscountBot from "@/components/page/bots/discount-bot"
import BotCard from "@/components/page/bots/bot-card"
import { useFindBotsQuery } from "@/store/features/apislice"

export default function Dashboard() {
  const { data:bots, isLoading, isError } = useFindBotsQuery({})
  
  
  return (
    <div className="">
      <div className=" px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">AI Builder</h1>
           
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <BotCard title="Welcome Bot" icon={<Bot className="h-5 w-5" />} isActive={bots?.WELCOME?.is_active??false} type="WELCOME"/>
          <BotCard title="Product Browsing Bot" icon={<Bot className="h-5 w-5" />} isActive={bots?.PRODUCT_BROWSING?.is_active??false} type="PRODUCT_BROWSING"/>
          <BotCard title="Order Cancelation Bot" icon={<Bot className="h-5 w-5" />} isActive={bots?.ORDER_CANCEL?.is_active??false} type="ORDER_CANCEL"/>
          <ShippingChargesBot  data={bots?.SHIPPING_CHARGES}/>
          <BotCard title="Repeat Order Bot" icon={<Bot className="h-5 w-5" />} isActive={bots?.REPEAT_ORDER?.is_active??false} type="REPEAT_ORDER" />
          <DiscountBot data={bots?.DISCOUNT} />
          <BotCard title="Order tracking bot" icon={<Bot className="h-5 w-5" />} isActive={bots?.ORDER_TRACK?.is_active??false} type="ORDER_TRACK" />
        </div>
      </div>
    </div>
  )
}
