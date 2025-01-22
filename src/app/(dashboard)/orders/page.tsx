import HistoryView from '@/components/page/order/order-history'
import ProductInventory from '@/components/page/order/products'
import React from 'react'

function page() {
  return (
    <div className='flex gap-4'>
    <ProductInventory/>
    <HistoryView/>
    </div>
  )
}

export default page