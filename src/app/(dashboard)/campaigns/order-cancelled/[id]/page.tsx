
import OrderCancelled from "@/components/page/campaigns/order-cancel-campaign-update";

import React from "react";


const Verify = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // Example: If you want to use the slug with a query

return <OrderCancelled id={id} />;
};

export default Verify;