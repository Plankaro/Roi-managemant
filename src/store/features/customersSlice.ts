import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomerProspectList, CustomerProspect } from "@/zod/types";
import { findIndex } from "lodash";

interface CustomerProspectState {
  list: CustomerProspectList | null;
}

const initialState: CustomerProspectState = {
  list: { customers: [], CustomerContact: 0 },
};

const customerProspectSlice = createSlice({
  name: "customerProspect",
  initialState,
  reducers: {
    addOrUpdateCustomerProspect: (state, action: PayloadAction<CustomerProspect>) => {
      if (!state.list) return;

      const index = findIndex(
        state.list.customers,
        (customer) => customer.shopifyCustomer.shopify_id === action.payload.shopifyCustomer.shopify_id
      );

      if (index !== -1) {
        // Replace the existing customer prospect
        state.list.customers[index] = action.payload;
      } else {
        // Add new customer prospect
        state.list.customers.push(action.payload);
        state.list.CustomerContact += 1;
      }
    },
  },
});

export const { addOrUpdateCustomerProspect } = customerProspectSlice.actions;
export default customerProspectSlice.reducer;
