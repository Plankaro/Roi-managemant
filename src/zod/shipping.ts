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