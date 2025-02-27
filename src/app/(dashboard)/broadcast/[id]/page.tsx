import BroadcastDetails from '@/components/page/broadcast/broadcastidIndex'

import React from 'react'

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log(id)
  return (
   <BroadcastDetails id = {id}/>
  )
}

export default Page