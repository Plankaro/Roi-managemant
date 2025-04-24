

import React from 'react';
import CheckoutCreated from '@/components/page/campaigns/create-checkout-campaign-update';

const Verify = async({params}: {params: Promise<{ id: string }>}) => {
    const { id } = await params;

  // Example: If you want to use the slug with a query


 

  return (
    <CheckoutCreated id={id} />
  );
};

export default Verify;
