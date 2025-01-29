"use client"
import { useState } from 'react'
import Cart from '@/components/page/order/cart'
import HistoryView from '@/components/page/order/order-history'
import ProductInventory from '@/components/page/order/products'
import Profile from '@/components/page/order/profile'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useGetProductsQuery } from '@/store/features/apislice'

function Page() {
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const {data: products, isLoading: productsLoading} = useGetProductsQuery({})
  console.log(products);
  
  
  const handleOrderCreated = () => {
    setIsOrderCreated(!isOrderCreated);
  }
  
  return (
    <div className='space-y-3 mt-5'>
      <div className='flex items-center justify-between mb-3'>
        <div className='text-2xl font-bold text-white'>Create Order</div>
        <Button className='bg-blue-500 hover:bg-blue-600' onClick={handleOrderCreated}>{isOrderCreated ? 'Cancel Order' : 'Create Order'}</Button>
      </div>
      <Profile/>
    <div className='flex gap-4 justify-end'>

      <Cart/>
    <ProductInventory products={products || []} loading={productsLoading}/>
    <HistoryView/>
    </div>
    </div>
  )
}

export default Page