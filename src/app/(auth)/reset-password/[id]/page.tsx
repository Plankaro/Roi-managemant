

import ResetpasswordComponent from '@/components/page/auth/reset-password'
import React from 'react'


async function Resetpassword({params}: {params: Promise<{ id: string }>}) {
    const { id } = await params;
   
  return (
   <ResetpasswordComponent id={id} />
  )
}

export default Resetpassword