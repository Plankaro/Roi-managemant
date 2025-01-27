
import VerifyEmail from '@/components/page/auth/verify-email';
import React from 'react';

const Verify = async({params}: {params: Promise<{ id: string }>}) => {
    const { id } = await params;

  // Example: If you want to use the slug with a query


 

  return (
    <VerifyEmail id={id} />
  );
};

export default Verify;
