
"use client"
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ProductVariant {
  size: number;
  availableQuantity: number;
}

interface CartItem {
  id: number;
  name: string;
  description: string;
  selectedSize: number;
  selectedQuantity: number;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  variants: ProductVariant[];
}

function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "XYZ Brand Product",
      description: "Small description of the product",
      selectedSize: 40,
      selectedQuantity: 1,
      originalPrice: 2199,
      discountedPrice: 1869,
      discount: 15,
      variants: [
        { size: 38, availableQuantity: 5 },
        { size: 39, availableQuantity: 3 },
        { size: 40, availableQuantity: 8 },
        { size: 41, availableQuantity: 2 },
        { size: 42, availableQuantity: 4 }
      ]
    },
    {
      id: 2,
      name: "XYZ Brand Product",
      description: "Small description of the product",
      selectedSize: 41,
      selectedQuantity: 1,
      originalPrice: 2199,
      discountedPrice: 1869,
      discount: 15,
      variants: [
        { size: 39, availableQuantity: 2 },
        { size: 40, availableQuantity: 0 },
        { size: 41, availableQuantity: 6 },
        { size: 42, availableQuantity: 3 }
      ]
    },
    {
      id: 3,
      name: "XYZ Brand Product",
      description: "Small description of the product",
      selectedSize: 42,
      selectedQuantity: 1,
      originalPrice: 2199,
      discountedPrice: 1869,
      discount: 15,
      variants: [
        { size: 40, availableQuantity: 4 },
        { size: 41, availableQuantity: 2 },
        { size: 42, availableQuantity: 7 },
        { size: 43, availableQuantity: 1 }
      ]
    },
    {
        id: 4,
        name: "XYZ Brand Product",
        description: "Small description of the product",
        selectedSize: 42,
        selectedQuantity: 1,
        originalPrice: 2199,
        discountedPrice: 1869,
        discount: 15,
        variants: [
          { size: 40, availableQuantity: 4 },
          { size: 41, availableQuantity: 2 },
          { size: 42, availableQuantity: 7 },
          { size: 43, availableQuantity: 1 }
        ]
      }
  ]);

  const handleSizeChange = (itemId: number, newSize: string) => {
    setCartItems(items => items.map(item => {
      if (item.id === itemId) {
        const size = parseInt(newSize);
        const variant = item.variants.find(v => v.size === size);
        return {
          ...item,
          selectedSize: size,
          selectedQuantity: variant && variant.availableQuantity < item.selectedQuantity ? 1 : item.selectedQuantity
        };
      }
      return item;
    }));
  };

  const handleQuantityChange = (itemId: number, newQuantity: string) => {
    setCartItems(items => items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          selectedQuantity: parseInt(newQuantity)
        };
      }
      return item;
    }));
  };

  const calculateTotals = () => {
    return cartItems.reduce((acc, item) => {
      const itemTotal = item.originalPrice * item.selectedQuantity;
      const itemDiscount = (itemTotal * item.discount) / 100;
      return {
        mrp: acc.mrp + itemTotal,
        discount: acc.discount + itemDiscount
      };
    }, { mrp: 0, discount: 0 });
  };

  const totals = calculateTotals();
  const shippingFee = 123;
  const finalAmount = totals.mrp - totals.discount + shippingFee;

  return (
    
    <div className="border-primary flex-1 border rounded-lg  flex items-center justify-center px-4">
        <ScrollArea className="h-[420px] pr-4">
      <div className="w-full   rounded-3xl text-white">
        <h1 className="text-2xl font-semibold mb-6">Cart</h1>
        
      
          <div className="space-y-4">
            {cartItems.map((item) => {
              const currentVariant = item.variants.find(v => v.size === item.selectedSize);
              const availableQuantity = currentVariant?.availableQuantity || 0;
              
              return (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-300 rounded-lg overflow-hidden">
                    <img 
                      src={`https://picsum.photos/200/200?random=${item.id}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-200">{item.description}</p>
                      </div>
                      <button className="text-gray-300 hover:text-white">
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="mt-2 flex gap-4">
                      <Select
                        value={item.selectedSize.toString()}
                        onValueChange={(value) => handleSizeChange(item.id, value)}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Size" />
                        </SelectTrigger>
                        <SelectContent>
                          {item.variants.map((variant) => (
                            <SelectItem
                              key={variant.size}
                              value={variant.size.toString()}
                              disabled={variant.availableQuantity === 0}
                            >
                              Size: {variant.size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={item.selectedQuantity.toString()}
                        onValueChange={(value) => handleQuantityChange(item.id, value)}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Quantity" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(Math.min(availableQuantity, 5))].map((_, i) => (
                            <SelectItem
                              key={i + 1}
                              value={(i + 1).toString()}
                            >
                              Qty: {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="mt-2 flex items-center gap-5">
                      <span className="line-through text-gray-300">₹{item.originalPrice}</span>
                      <span className="text-blue-400 text-base">₹{item.discountedPrice}</span>
                      <span className="text-red-500 text-sm">{item.discount}% Off</span>
                      <p className="ml-auto text-xs  rounded text-red-500  ">
                        Remove Offer
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
     

        <div className="mt-6 pt-6 border-t border-gray-400">
          <h2 className="text-xl font-semibold mb-4">Price Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total MRP</span>
              <span>₹ {totals.mrp}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount on MRP</span>
              <span>₹ {Math.round(totals.discount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping fee</span>
              <span>₹ {shippingFee}</span>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-400 flex justify-between font-semibold">
              <span>Total Amount</span>
              <span>₹ {Math.round(finalAmount)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-400">
          <h2 className="text-xl font-semibold mb-4">Customer Info</h2>
          <div className="flex justify-between items-center">
            <span>Shipping Address:</span>
            <button className="text-blue-400 hover:text-blue-300">+Add</button>
          </div>
        </div>

        <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Proceed
        </button>
      </div>
      </ScrollArea>
    </div>
 
  );
}

export default Cart;