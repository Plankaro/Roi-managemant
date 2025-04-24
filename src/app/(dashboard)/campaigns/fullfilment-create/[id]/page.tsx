

import FullfillmentCreate from '@/components/page/campaigns/fullufillment-update-campaign-update';
import React from 'react';

const Verify = async({params}: {params: Promise<{ id: string }>}) => {
    const { id } = await params;

  return (
  //  <FullfillmentCreate id={id} />
  <></>
  );
};

export default Verify;
