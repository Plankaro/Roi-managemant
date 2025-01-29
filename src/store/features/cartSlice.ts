import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface Product {
    id: string;
    title: string;
    images: string[];
    options: Option[];
    variants: Variant[];
    totalInventory: number;
    selectedVariant:string;
    quantity: number;
  }
  
  interface Option {
    name: string;
    values: string[];
  }
  
  interface Variant {
    id: string;
    availableForSale: boolean;
    price: string;
    title: string;
  }
  

  interface CartState {
    cartItems: Product[];
    TotalPrice: number
  }
  
  const initialState: CartState = {
    cartItems: [],
    TotalPrice: 0
  };
  
  const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      addToCart: (state, action: PayloadAction<Product>) => {
        const existingItem = state.cartItems.find((item) => item.id === action.payload.id);

        if (!existingItem) {
            console.log("adding cart item")
            state.cartItems.push({
              ...action.payload,
              selectedVariant: action.payload.variants[0].id,
              quantity: 1
            });
          }
       
        
      },
      updateVariant: (state, action: PayloadAction<{ productId: string, variantId: string }>) => {
        const { productId, variantId } = action.payload;
        const cartItem = state.cartItems.find((item) => item.id === productId);
        if (cartItem) {
          cartItem.selectedVariant = variantId;
         
        }
      },
      updateQuantity: (state, action: PayloadAction<{ productId: string, quantity: number }>) => {
        const { productId, quantity } = action.payload;
        const cartItem = state.cartItems.find((item) => item.id === productId);
        if (cartItem) {
          cartItem.quantity = quantity;
         
        }
    },
      getTotalPrice: (state) => {
        
        state.cartItems.forEach((item) => {
          const variant = item.variants.find((variant) => variant.id === item.selectedVariant);
          if (variant) {
            state.TotalPrice += Number(variant.price) * item.quantity;
          }
        });
      
      },
      removeItem: (state, action: PayloadAction<string>) => {
        console.log("Removing item with ID:", action.payload);
        state.cartItems = state.cartItems.filter((item) => item.id != action.payload);
        console.log("Removed cartItems:", state.cartItems);
      },
      
    },
  });
  
  export const { addToCart, updateVariant, updateQuantity, getTotalPrice,removeItem } = cartSlice.actions;
  
  export default cartSlice.reducer;

  