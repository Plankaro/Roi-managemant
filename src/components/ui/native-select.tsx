import React from "react"
import { cn } from "@/lib/utils"

interface NativeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]
  placeholder?: string
  className?: string
}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ options, placeholder, className, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "w-full lg:w-10/12 h-10 px-3 py-2 text-white bg-transparent border border-gray-400 rounded-3xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled selected hidden className="text-gray-400">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-blue-50 text-gray-900 hover:bg-blue-200 hover:text-gray-800 transition-colors"
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          {/* <svg
            className="w-4 h-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 8l4 4 4-4" />
          </svg> */}
        </div>
      </div>
    )
  },
)

NativeSelect.displayName = "NativeSelect"

export { NativeSelect }
