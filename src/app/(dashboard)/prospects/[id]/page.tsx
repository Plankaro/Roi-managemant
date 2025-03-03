
import ProspectId from '@/components/page/prospects/prospectIdIndex'

import React from 'react'

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log(id)
  return (
   <ProspectId id = {id}/>
  )
}

export default Page