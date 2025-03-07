/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { Pencil, Check } from "lucide-react"

interface EditableFieldProps {
  initialValue: string
  onSave: (newValue: string) => void
  containerClassName?: string
  textClassName?: string
  inputClassName?: string
  placeholder?: string
}

export default function EditableField({
  initialValue,
  onSave,
  placeholder = "",
  containerClassName = "",
  textClassName = "",
  inputClassName = "",
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialValue)
  const [loading, setLoading] = useState(false)

  

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

 

  const handleSave = async () => {
    if (value === initialValue) {
      setIsEditing(false)
      return
    }
  
    try {
      setLoading(true)
      const result: any = await onSave(value)
      setLoading(false)
      if (!result) return
      setIsEditing(false)
    } catch (error) {
      //console.log(error)
    }
  }
  

  return (
    <div className={`flex items-center ${containerClassName}`}>
      {isEditing ? (
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          className={`bg-transparent w-full text-white text-lg font-medium border-b border-white focus:outline-none ${inputClassName}`}
          onBlur={handleSave}
         
        />
      ) : (
        <span className={`text-white text-lg w-full font-medium  ${textClassName}`}>{value}</span>
      )}
      <button
      disabled={loading}
        onClick={() => {
          if (isEditing) {
            handleSave()
          } else {
            setIsEditing(true)
          }
        }}
        className="ml-2"
      >
        {isEditing ? <Check className="w-4 h-4 text-white" /> : <Pencil className="w-4 h-4 text-white" />}
      </button>
    </div>
  )
}

