/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Truck } from "lucide-react"
import BotCard from "./bot-card"
import ShippingChargesModal from "./shipping-charges-modal"

export default function ShippingChargesBot({data}:{data:any}) {
  const [showModal, setShowModal] = useState(false)

  return (
    <> 
      <BotCard
        title="Shipping Charges Bot"
        icon={<Truck className="h-5 w-5" />}
        isActive={data?.is_active??false}
        hasAdditionalFeatures={data?.is_active??false}
        onAdditionalFeaturesClick={() => setShowModal(true)}
        type="SHIPPING_CHARGES"
      />

      {showModal && <ShippingChargesModal onClose={() => setShowModal(false)} initialData={data}/>}
    </>
  )
}
