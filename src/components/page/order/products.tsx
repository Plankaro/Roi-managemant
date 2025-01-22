"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Product {
  id: number
  name: string
  inventory: number
  amount: number
  checked?: boolean
}

const products: Product[] = [
  { id: 1, name: "Product 1", inventory: 123, amount: 678 },
  { id: 2, name: "Product 1", inventory: 34, amount: 123 },
  { id: 3, name: "Product 1", inventory: 76, amount: 4567 },
  { id: 4, name: "Product 1", inventory: 99, amount: 5678 },
  { id: 5, name: "Product 1", inventory: 33, amount: 876 },
  { id: 6, name: "Product 1", inventory: 123, amount: 678 },
  { id: 7, name: "Product 1", inventory: 34, amount: 123 },
  { id: 8, name: "Product 1", inventory: 76, amount: 4567 },
  { id: 9, name: "Product 1", inventory: 99, amount: 5678 },
  { id: 10, name: "Product 1", inventory: 33, amount: 876 },
]

export default function ProductInventory() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [checkedProducts, setCheckedProducts] = React.useState<number[]>([])

  const handleCheckboxChange = (productId: number) => {
    setCheckedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

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

        <ScrollArea className="h-[300px]">
          <div className="divide-y divide-[#2D477A] p-3">
            {products.map((product) => (
              <div key={product.id} className="grid grid-cols-4 gap-4 py-4 text-sm text-gray-300">
                <div className="col-span-2 flex items-center gap-2">
                  <Checkbox
                    checked={checkedProducts.includes(product.id)}
                    onCheckedChange={() => handleCheckboxChange(product.id)}
                    className="border-gray-600"
                  />
                  {product.name}
                </div>
                <div>{product.inventory}</div>
                <div>₹ {product.amount}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

