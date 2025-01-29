/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { addToCart,removeItem } from "@/store/features/cartSlice"
import { useDispatch, useSelector } from "react-redux"

interface ProductProps {
  id: string;
  title: string;
  images: string[];
  options: {
    name: string;
    values: string[];
  }[];
  variants: {
    id: string;
    availableForSale: boolean;
    price: number;
    title: string;
  }[];
  totalInventory: number;
}


export default function ProductInventory({products}: {products: ProductProps[],loading: boolean}) {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: any) => state.cart.cartItems)
  console.log(cartItems)
  const [searchQuery, setSearchQuery] = React.useState("")

  const handleCheckboxChange = (product: any) => {
    if (cartItems.some((item: any) => item.id === product.id)) {
      console.log("Removing product:", product);
      dispatch(removeItem(product.id));
    } else {
      console.log("Adding product:", product);
      dispatch(addToCart(product));
    }
  };
  
  return (
    <div className="border p-6 border-primary rounded-2xl">
      <h1 className="mb-6 text-2xl font-bold text-white">Products Available</h1>

      <div className="mb-8 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
        <Input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent pl-10 text-white placeholder:text-gray-400 border-gray-700"
        />
      </div>

      <div className="rounded-lg bg-transparent ">
        <div className="grid grid-cols-4 gap-4 p-3 bg-[#19191980]/50 pb-4 text-sm font-medium text-white">
          <div className="col-span-2">Product</div>
          <div>Inventory</div>
          <div>Amount</div>
        </div>

        <ScrollArea className="h-[300px] no-scrollbar overflow-scroll">
          <div className="divide-y divide-[#2D477A] p-3">
            {products && products.map((product) => (
              <div key={product.id} className="grid grid-cols-4 gap-4 py-4 text-sm text-gray-300">
                <div className="col-span-2 flex items-center gap-2">
                  <Checkbox
                    checked={cartItems.some((item: any) => item.id === product.id)}
                    onCheckedChange={() => handleCheckboxChange(product)}
                    className="border-gray-600"
                  />
                  {product.title}
                </div>
                <div>{product.totalInventory}</div>
                <div>₹ {product.variants[0].price}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

