/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { addToCart,removeItem } from "@/store/features/cartSlice"
import { useDispatch, useSelector } from "react-redux"
import { useGetProductsQuery } from "@/store/features/apislice"
import { Skeleton } from "@/components/ui/skeleton"

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


export default function ProductInventory() {
   const {data: products, isLoading: productsLoading} = useGetProductsQuery({})
   console.log(products)

  //console.log(products)
  const dispatch = useDispatch()
  const cartItems = useSelector((state: any) => state.cart.cartItems)

  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredProducts = products?.filter((product: any) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCheckboxChange = (product: any) => {
    if (cartItems.some((item: any) => item.id === product.id)) {

      dispatch(removeItem(product.id));
    } else {
     
      dispatch(addToCart(product));
    }
  };
  
  return (
    <div className="border px-2 py-5 border-blue-500 rounded-2xl xl:basis-4/12  bg-backgroundColor overflow-hidden">
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
        <div className="grid grid-cols-4 gap-4 p-3 bg-[#19191980] pb-4 text-sm font-medium text-white">
          <div className="col-span-2">Product</div>
          <div>Inventory</div>
          <div>Amount</div>
        </div>
        <div className="xl:h-[250px] h-full no-scrollbar overflow-auto">
        <div className="divide-y divide-[#2D477A] p-3">
          {productsLoading ? (
            // Show skeleton loaders when loading
            Array(5)
              .fill(0)
              .map((_, index) => <ProductSkeleton key={index} />)
          ) : products && products.length > 0 ? (
            // Show products when loaded
            filteredProducts.map((product: any) => (
              <div key={product.id} className="grid grid-cols-4 gap-4 py-4 text-sm text-gray-300 ">
                <div className="col-span-2 flex items-center gap-2 line-clamp-1 ">
                  <Checkbox
                    checked={cartItems.some((item: any) => item.id === product.id)}
                    onCheckedChange={() => handleCheckboxChange(product)}
                    className="border-gray-600 "
                  />
                  {product.title}
                </div>
                <div>{product.totalInventory}</div>
                <div>₹ {product.variants[0].price}</div>
              </div>
            ))
          ) : (
            // Show message when no products
            <div className="py-4 text-center text-gray-400">No products found</div>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}

 function ProductSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-4 py-4 text-sm text-gray-300">
      <div className="col-span-2 flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded bg-white/10" />
        <Skeleton className="h-4 w-[140px] bg-white/10" />
      </div>
      <Skeleton className="h-4 w-12 bg-white/10" />
      <Skeleton className="h-4 w-16 bg-white/10" />
    </div>
  )
}


