"use client"
import { useState } from "react"
import Cart from "@/components/page/order/cart"
import HistoryView from "@/components/page/order/order-history"
import ProductInventory from "@/components/page/order/products"
import Profile from "@/components/page/order/profile"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetShopifyOrdersQuery, useGetSpecficProspectQuery } from "@/store/features/apislice"
import { removeall } from "@/store/features/cartSlice"
import { useDispatch } from "react-redux"
import { ShoppingCart, Package, History } from "lucide-react"

function OrderIndex({ id }: { id: string }) {
  const [isOrderCreated, setIsOrderCreated] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("history")

  const { data: prospect, isLoading: prospectLoading } = useGetSpecficProspectQuery(id)
  console.log(prospect)
  const { data: orders, isLoading: ordersLoading } = useGetShopifyOrdersQuery(id)
  const dispatch = useDispatch()

  const handleOrderCreated = () => {
    if (isOrderCreated == true) {
      setIsOrderCreated(false)
      dispatch(removeall())
    } else {
      setIsOrderCreated(true)
      // Switch to products tab when creating an order
      setActiveTab("products")
    }
  }

  return (
    <div className="space-y-3 mt-5">
      <div className="flex items-center justify-between mb-3">
        <div className="text-2xl font-bold text-white">Create Order</div>
        <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleOrderCreated}>
          {isOrderCreated ? "Cancel Order" : "Create Order"}
        </Button>
      </div>

      <Profile
        image={prospect?.image ?? ""}
        name={`${prospect?.name || prospect?.phone}`}
        isLoading={prospectLoading}
      />

      {/* For screens smaller than XL, show tabs */}
      <div className="xl:hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex w-full bg-transparent">
            <TabsTrigger
              value="history"
              className="min-w-[100px] text-center border-transparent data-[state=active]:border-primary 
                data-[state=active]:bg-[#0D0D0D4D] data-[state=active]:text-white 
                data-[state=active]:border py-1 px-4 data-[state=active]:rounded-none 
                transition-all duration-200 flex items-center gap-2"
            >
              <History className="h-4 w-4" />
              <span>History</span>
            </TabsTrigger>

          
              <>
                <TabsTrigger
                  value="products"
                  className="min-w-[100px] text-center border-transparent data-[state=active]:border-primary 
                    data-[state=active]:bg-[#0D0D0D4D] data-[state=active]:text-white 
                    data-[state=active]:border py-1 px-4 data-[state=active]:rounded-none 
                    transition-all duration-200 flex items-center gap-2"
                >
                  <Package className="h-4 w-4" />
                  <span>Products</span>
                </TabsTrigger>

                <TabsTrigger
                  value="cart"
                  className="min-w-[100px] text-center border-transparent data-[state=active]:border-primary 
                    data-[state=active]:bg-[#0D0D0D4D] data-[state=active]:text-white 
                    data-[state=active]:border py-1 px-4 data-[state=active]:rounded-none 
                    transition-all duration-200 flex items-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart</span>
                </TabsTrigger>
              </>
           
          </TabsList>

          <TabsContent value="history" className="mt-2 h-[calc(100vh-300px)] overflow-auto no-scrollbar">
            <HistoryView order={orders} isLoading={ordersLoading} />
          </TabsContent>

            <>
              <TabsContent value="products" className="mt-2 h-[calc(100vh-300px)] overflow-auto no-scrollbar">
                <ProductInventory />
              </TabsContent>

              <TabsContent value="cart" className="mt-2 h-[calc(100vh-300px)] overflow-auto no-scrollbar">
                <Cart id={id} />
              </TabsContent>
            </>
          
        </Tabs>
      </div>

      {/* For XL screens, show side-by-side layout */}
      <div className="hidden xl:flex xl:flex-row gap-4 justify-end h-[calc(100vh-200px)] xl:h-[calc(100vh-250px)]">
        {isOrderCreated && (
          <>
            <Cart id={id} />
            <ProductInventory />
          </>
        )}
        <HistoryView order={orders} isLoading={ordersLoading} />
      </div>
    </div>
  )
}

export default OrderIndex
