"use client"

import type React from "react"
import { Input } from "@/components/ui/input"

interface NumericInputProps extends Omit<React.ComponentPropsWithoutRef<"input">, "onChange" | "value"> {
  value: number
  onChange: (newValue: number) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

const NumericInput: React.FC<NumericInputProps> = ({
  value,
  disabled,
  onChange,
  placeholder = "Enter amount",
  className = "border-gray-300",
  ...props
}) => {
  console.log(disabled)
  // Convert to string safely, handling undefined/null values
  const stringValue = value !== undefined && value !== null ? value.toString() : ""

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    // Only allow digits
    if (/^\d*$/.test(rawValue)) {
      // If empty, pass 0; otherwise, convert to number and remove leading zeros
      const newValue = rawValue === "" ? 0 : Number(rawValue.replace(/^0+(?=\d)/, ""))
      onChange(newValue)
    }
  }

  return (
    <Input
      type="text"
      
      inputMode="numeric"
      pattern="[0-9]*"
      placeholder={placeholder}
      value={stringValue}
      onChange={handleChange}
      className={className}
      {...props}
      disabled={disabled}
    />
  )
}

export default NumericInput

