/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Percent } from "lucide-react"
import BotCard from "./bot-card"
import DiscountModal from "./discount-modal"

export default function DiscountBot({ data }: { data: any }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <BotCard
        title="Discount Bot"
        icon={<Percent className="h-5 w-5" />}
        isActive={data?.is_active ?? false}
        hasAdditionalFeatures={data?.is_active ?? false}
        onAdditionalFeaturesClick={() => setShowModal(true)}
        type="DISCOUNT"

      />

      {showModal && <DiscountModal onClose={() => setShowModal(false)} initialData={data}/>}
    </>
  )
}
