import * as z from "zod"

export const shippingAddressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address1: z.string().min(1, "Address is required"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  country: z.string().min(1, "Country is required"),
  zip: z.string().min(1, "ZIP/Postal code is required"),

})

export type ShippingAddressFormValues = z.infer<typeof shippingAddressSchema>




export interface ShopifyCustomer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    amountSpent: {
      amount: string;
      currencyCode: string;
    };
    image:{
        src: string;
        url: string;
    }
    orders: {
      nodes: unknown[];
    };
    addresses: {
      address1?: string;
      address2?: string;
      city?: string;
      country: string;
      zip?: string;
    }[];
  }


  export type Shopify = {
    shopify_id: string;
    name: string;
    email: string | null;
    phone: string;
    amountSpent: {
      amount: string;
      currencyCode: string;
    };
  };
  
  type ProspectData = {
    id: string;
    shopify_id: string;
    name: string;
    email: string | null;
    phoneNo: string;
    image: string | null;
    last_Online: string | null;
    is_blocked: boolean;
    created_at: string;
    updated_at: string;
    lead: string ;
  };
  
 export type CustomerProspect = {
    shopifyCustomer: Shopify;
    prospectData: ProspectData;
    starredContact:boolean;

  };
  
 export type CustomerProspectList = {
  customers:CustomerProspect[];
  CustomerContact:number
};