"use client"

import { useState, useEffect } from "react"
import { Pencil, Check } from "lucide-react"

interface EditableFieldProps {
  initialValue: string
  onSave: (newValue: string) => void
  containerClassName?: string
  textClassName?: string
  inputClassName?: string
}

export default function EditableField({
  initialValue,
  onSave,
  containerClassName = "",
  textClassName = "",
  inputClassName = "",
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleSave = () => {
    onSave(value)
    setIsEditing(false)
  }

  return (
    <div className={`flex items-center ${containerClassName}`}>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`bg-transparent w-full text-white text-lg font-medium border-b border-white focus:outline-none ${inputClassName}`}
          onBlur={handleSave}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSave()
            }
          }}
        />
      ) : (
        <span className={`text-white text-lg w-full font-medium ${textClassName}`}>{value}</span>
      )}
      <button
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

