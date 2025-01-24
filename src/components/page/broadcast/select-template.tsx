"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {  X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function SelectTemplate() {
  const [recipientFile, setRecipientFile] = useState<File | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const recipientInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const handleRecipientUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setRecipientFile(file)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB")
        return
      }
      setImageFile(file)
    }
  }

  const clearRecipientFile = () => {
    setRecipientFile(null)
    if (recipientInputRef.current) {
      recipientInputRef.current.value = ""
    }
  }

  const clearImageFile = () => {
    setImageFile(null)
    if (imageInputRef.current) {
      imageInputRef.current.value = ""
    }
  }

  return (

        <ScrollArea className="h-[550px] w-full no-scrollbar overflow-scroll bg-primary-200 rounded-3xl">
          <div className="p-8 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <h2 className="text-lg font-medium ">Recipients</h2>
                <span className="text-red-500">*</span>
              </div>
              <p className="text-sm ">You can upload an Excel sheet or select a Shopify segment.</p>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  ref={recipientInputRef}
                  onChange={handleRecipientUpload}
                  accept=".xlsx,.xls,.csv"
                  className="hidden"
                />
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => recipientInputRef.current?.click()}
                    className="bg-[#4B6BFB] hover:bg-[#4B6BFB]/90  whitespace-nowrap"
                  >
                    + Upload Recipients
                  </Button>
                  {recipientFile && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-md">
                      <span className="text-sm text-gray-300 truncate max-w-[200px]">{recipientFile.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 "
                        onClick={clearRecipientFile}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-1">
                <h2 className="text-lg font-medium ">Add Content</h2>
                <span className="text-red-500">*</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-medium ">Image</h3>
                <p className="text-sm ">
                  Upload an image under 5 MB with a recommended aspect ratio of 1.91:1.
                </p>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    ref={imageInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => imageInputRef.current?.click()}
                      className="bg-[#4B6BFB] hover:bg-[#4B6BFB]/90  whitespace-nowrap"
                    >
                      + Upload Image
                    </Button>
                    {imageFile && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-md">
                        <span className="text-sm text-gray-300 truncate max-w-[200px]">{imageFile.name}</span>
                        <Button variant="ghost" size="icon" className="h-5 w-5 " onClick={clearImageFile}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-medium ">Body</h3>
                <p className="text-sm">Enter the {"{{1}}"} parameter for your message.</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="">{"{{1}}"}</span>
                    <Checkbox id="shopify-segment" className="border-gray-600" />
                    <label htmlFor="shopify-segment" className="text-sm ">
                      From Shopify Segment
                    </label>
                  </div>
                  <Input
                    placeholder="Enter the parameter for {{1}}"
                    className="bg-white/5 border-gray-800  placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-medium ">CTA Button</h3>
                <p className="text-sm ">Enter the URL for the CTA Button</p>
                <Input
                  placeholder="Enter the URL"
                  className="bg-white/5 border-gray-800  placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
        </ScrollArea>
    
  )
}

