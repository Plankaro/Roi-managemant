"use client"

import { useEffect, useRef, useState } from "react"

interface FlashResponse {
  id: string
  heading: string
  message: string
  createdBy: string
}

interface FlashResponsePopupProps {
  responses: FlashResponse[]
  open: boolean
  onClose: () => void
  onSelect: (response: FlashResponse) => void
  searchTerm?: string
}

export default function FlashResponsePopup({
  responses,
  open,
  onClose,
  onSelect,
  searchTerm = "",
}: FlashResponsePopupProps) {
  const popupRef = useRef<HTMLDivElement>(null)
const [searchQuery,setSearchQuery] = useState(searchTerm)
  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, onClose])

  useEffect(() => {
    if (searchTerm.startsWith('/')) {
      setSearchQuery(searchTerm.slice(1));
    } else {
      setSearchQuery(searchTerm);
    }
  },[searchTerm])

  console.log(searchTerm)

  // Filter responses based on search query
  const filteredResponses = responses && responses.filter((response) =>
    response.heading.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!open) return null

  return (
    <div
      ref={popupRef}
      className="absolute bottom-full left-4 mb-2 bg-blue-500 rounded-lg shadow-lg z-50 right-4 sm:w-4/5 md:w-1/2"
    >
      <div className="p-3 border-b border-[#7F97C7] flex items-center justify-between">
        <div className="text-white font-medium">Flash Responses</div>
      </div>

      <div className="p-3">
        <div className="overflow-y-auto max-h-[300px] pr-2 -mr-2 no-scrollbar" >
          {filteredResponses.length > 0 ? (
            <div className="space-y-2">
              {filteredResponses.map((response) => (
                <div
                  key={response.id}
                  onClick={() => {
                    onSelect(response)
                    onClose()
                  }}
                  className="p-3 cursor-pointer space-y-3 border-b hover:bg-blue-600 border-b-[#7F97C7]"
                >
                  <div className="font-medium text-white">/ {response.heading}</div>
                  <p className="text-white text-sm line-clamp-2">{response.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white text-sm text-center">No Flash Response Found</p>
          )}
        </div>
      </div>
    </div>
  )
}
