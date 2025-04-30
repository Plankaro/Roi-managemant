
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import { useState } from "react"
import { X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDispatch, useSelector } from "react-redux"
import { removeItem, updateQuantity, updateVariant } from "@/store/features/cartSlice"

import { toast } from "react-hot-toast"
import { ShippingAddressForm } from "./shipping_form"
import type { ShippingAddressFormValues } from "@/zod/types"
import { useCreateOrderMutation } from "@/store/features/apislice"

import { Avatar,AvatarImage,AvatarFallback } from "@/components/ui/avatar"

type Product = {
  id: string
  title: string
  description: string
  images: string[]
  options: {
    name: string
    values: string[]
  }[]
  quantity: number
  selectedVariant: string
  totalInventory: number
  variants: {
    id: string
    availableForSale: boolean
    price: string
    title: string
    quantity: number
  }[]
}

function Cart({ id }: { id: string }) {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: any) => state.cart.cartItems)
  const [openShippingAddress, setOpenShippingAddress] = useState(false)
  // const { data: ShopifyCustomer } = useGetSpecificShopifyContactsQuery(id)
  const [shippingFee, setShippingFee] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [createOrder] = useCreateOrderMutation()
  //console.log("gh", ShopifyCustomer)
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address1: "",

    city: "",
    state: "",
    country: "",
    zip: "",
  })

  const findVariant = (productId: string, variantId: string) => {
    const product = cartItems.find((item: Product) => item.id === productId)
    return product?.variants.find((variant: any) => variant.id === variantId)
  }

  const calculateTotals = () => {
    let mrp = 0

    cartItems.forEach((item: Product) => {
      const variant = findVariant(item.id, item.selectedVariant)
      if (variant) {
        mrp += Number(variant.price) * item.quantity
      }
    })

    // Calculate discount amount based on percentage
    const discountAmount = (mrp * discount) / 100

    return { mrp, discountAmount }
  }

  const totals = calculateTotals()
  const discountedPrice = totals.mrp - totals.discountAmount
  const finalAmount = discountedPrice + shippingFee
  if (cartItems.length === 0) {
    return null
  }

  const handleShippingaddressDialog = () => {
    if (openShippingAddress) {
      setOpenShippingAddress(false)
    } else {
      setOpenShippingAddress(true)
    }
  }
  const handleCheckout = async () => {
    try {
      if (Object.values(shippingAddress).some((value) => value === "")) {
        toast.error("Please fill in all shipping address fields")
        return
      } else {
        const itemsTobeCheckout = cartItems.map((item: Product) => {
          const variant = item.variants.find((variant) => variant.id === item.selectedVariant)
          return {
            variantId: item.selectedVariant,
            quantity: item.quantity,
            price: variant?.price || 0,
          }
        })
        //console.log(id, itemsTobeCheckout, finalAmount, shippingAddress)
        const promise = createOrder({
          customerId: id,
          Items: itemsTobeCheckout,
          totalPrice: finalAmount,
          shippingAddress: shippingAddress,
          discount: discount,
          shippingFee: shippingFee,
        })
        toast.promise(promise, {
          loading: "Checkout...",
          success: "Order placed successfully!",
          error: (error: any) => error?.data?.message || "An error occurred while placing the order.",
        })

        //console.log(JSON.stringify(await promise, null, 2))
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while")
    }
  }

  const handleDataSubmit = (data: ShippingAddressFormValues) => {
    setShippingAddress({
      firstName: data.firstName,
      lastName: data.lastName,
      address1: data.address1,
      city: data.city,
      state: data.state,
      country: data.country,
      zip: data.zip,
    })
    toast.success("Successfully saved ")
  }

  return (
    <div className="border-primary basis-5/12 px-3 h-full w-full border rounded-lg flex flex-col bg-backgroundColor overflow-hidden">
    <div className="flex-1 overflow-y-auto no-scrollbar py-4">
      <div className="rounded-3xl text-white px-2">
        <h1 className="text-2xl font-semibold mb-6  pt-2 pb-4  z-10">Cart</h1>

        <div className="space-y-6">
          {cartItems.map((item: Product) => {
            return (
              <div key={item.id} className="flex md:flex-row flex-col md:gap-16 gap-8 relative">
                <button
                  className="text-gray-300 hover:text-white absolute right-0 -top-5"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  <X size={20} />
                </button>
           
                  <Avatar className="w-28 h-28 rounded-sm">
                  <AvatarImage
                    src={findVariant(item?.id, item.selectedVariant)?.image || item.images[0] || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-sm"
                  />
                  <AvatarFallback>{item.title.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
             
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium line-clamp-1">{item.title}</h3>
                      <p className="text-xs text-gray-200 line-clamp-3">{item.description}</p>
                    </div>
                  </div>

                  <div className="mt-2 flex gap-4">
                    <Select
                      onValueChange={(value) =>
                        dispatch(
                          updateVariant({
                            productId: item.id,
                            variantId: value,
                          }),
                        )
                      }
                      value={item.selectedVariant}
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        {item.variants.map((variant) => (
                          <SelectItem key={variant.id} value={variant.id} disabled={variant.quantity === 0}>
                            {item.options[0].name}: {variant.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={item.quantity.toString()}
                      onValueChange={(quantity) =>
                        dispatch(
                          updateQuantity({
                            productId: item.id,
                            quantity: Number(quantity),
                          }),
                        )
                      }
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(Math.min(5, 5))].map((_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            Qty: {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mt-2 flex items-center gap-5">
                    <span className="l text-gray-300">
                      ₹{findVariant(item?.id, item.selectedVariant)?.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 pt-6 border-t-4 border-blue-700">
          <h2 className="text-xl font-semibold mb-4">Price Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Total MRP</span>
              <span>₹ {totals.mrp.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span>Discount</span>
                <div className="relative w-20">
                  <input
                    type="text"
                    className="w-full bg-blue-950/30 border border-blue-700/50 rounded text-right pr-7 py-1 h-8"
                    value={discount}
                    onChange={(e) => {
                      const value = Math.min(100, Number(e.target.value) || 0)
                      setDiscount(value)
                    }}
                    style={{
                      appearance: "textfield",
                      WebkitAppearance: "none",
                      MozAppearance: "textfield",
                      margin: 0,
                    }}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm">%</span>
                </div>
              </div>
              <span className="text-green-400">- ₹ {totals.discountAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Shipping fee</span>
              <div className="flex items-center gap-3 mr-4">
                <span className="mr-1">₹</span>
                <input
                  type="text"
                  className="bg-blue-950/30 border border-blue-700/50 rounded text-right py-1 px-2 h-8"
                  value={shippingFee}
                  onChange={(e) => setShippingFee(Number(e.target.value) || 0)}
                  style={{
                    appearance: "textfield",
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                  }}
                />
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-blue-700/50 flex justify-between font-semibold">
              <span>Total Amount</span>
              <span>₹ {finalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t-4 border-blue-700">
          <h2 className="text-xl font-semibold mb-4">Customer Info</h2>
          <div className="flex justify-between items-center">
            <span>Shipping Address:</span>
            <button className="text-blue-400 hover:text-blue-300" onClick={handleShippingaddressDialog}>
              {openShippingAddress ? "- remove" : " + add"}
            </button>
          </div>
          {openShippingAddress && <ShippingAddressForm value={shippingAddress} onSubmit={handleDataSubmit} />}
        </div>

        <button
          className="w-full mt-6 mb-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          onClick={handleCheckout}
        >
          Proceed
        </button>
      </div>
    </div>
  </div>
  )
}

export default Cart
