import UpdateAgentForm from '@/components/page/Teams/UpdateTeamIndex'

import React from 'react'

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  //console.log(id)
  return (
    <UpdateAgentForm id={id} />
  )
}

export default Page