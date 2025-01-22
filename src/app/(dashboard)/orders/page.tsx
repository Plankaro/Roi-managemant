import Cart from '@/components/page/order/cart'
import HistoryView from '@/components/page/order/order-history'
import ProductInventory from '@/components/page/order/products'
import Profile from '@/components/page/order/profile'
import { Button } from '@/components/ui/button'
import React from 'react'

function page() {
  
  return (
    <div className='space-y-3 mt-5'>
      <div className='flex items-center justify-between mb-3'>
        <div className='text-2xl font-bold text-white'>Create Order</div>
        <Button className='bg-blue-500'>Create Order</Button>
      </div>
      <Profile/>
    <div className='flex gap-4'>

      <Cart/>
    <ProductInventory/>
    <HistoryView/>
    </div>
    </div>
  )
}

export default page