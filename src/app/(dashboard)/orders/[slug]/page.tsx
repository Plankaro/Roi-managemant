import OrderIndex from '@/components/page/order'
import React from 'react'

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
   <OrderIndex id = {slug}/>
  )
}

export default Page