"use client"
import { useState } from 'react'
import Cart from '@/components/page/order/cart'
import HistoryView from '@/components/page/order/order-history'
import ProductInventory from '@/components/page/order/products'
import Profile from '@/components/page/order/profile'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useGetProductsQuery,  useGetSpecificShopifyContactsQuery ,useGetShopifyOrdersQuery} from '@/store/features/apislice'
import { removeall } from '@/store/features/cartSlice'
import { useDispatch } from 'react-redux'



function OrderIndex({id}:{id:string}) {

  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const {data: products, isLoading: productsLoading} = useGetProductsQuery({})
  const {data: prospect, isLoading: prospectLoading,refetch:prospectrefetch} = useGetSpecificShopifyContactsQuery(id)
  const {data:orders, isLoading: ordersLoading} = useGetShopifyOrdersQuery(id)

  //console.log(products)


  // //console.log(prospect)
  const dispatch = useDispatch()
;
 
 


  
  const handleOrderCreated = () => {
    if(isOrderCreated==true){
      setIsOrderCreated(false)
      dispatch(removeall())
    }
    else{
      setIsOrderCreated(true)
    }
  }
  
  return (
    <div className='space-y-3 mt-5 overflow-auto no-scrollbar'>
      <div className='flex items-center justify-between mb-3'>
        <div className='text-2xl font-bold text-white'>Create Order</div>
        <Button className='bg-blue-500 hover:bg-blue-600' onClick={handleOrderCreated}>{isOrderCreated ? 'Cancel Order' : 'Create Order'}</Button>
      </div>
      <Profile
        image={prospect?.DbData?.image??""}
        name={`${prospect?.DbData?.name || prospect?.shopifyData?.displayName || prospect?.DbData?.phoneNo || prospect?.shopifyData?.phone}`}
        isLoading={prospectLoading}
      />
    <div className='flex xl:flex-row flex-col-reverse gap-4 justify-end xl:h-[65vh] md:h-[70vh] h-[90vh]'> 

    {isOrderCreated && <Cart id = {id} refetch={prospectrefetch}/>}
    {isOrderCreated && <ProductInventory products={products || []} loading={productsLoading} />}
    <HistoryView  order={orders} isLoading={ordersLoading}/>
    </div>
    </div>
    
  )
}

export default OrderIndex