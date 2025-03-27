"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export type DropdownOption = {
  label: string
  value: string
  icon?: React.ReactNode
  disabled?: boolean
  children?: DropdownOption[]
}

interface NestedDropdownProps {
  options: DropdownOption[]
  placeholder?: string
  onSelect?: (option: DropdownOption) => void
  className?: string
}

export function NestedDropdown({
  options,
  placeholder = "Select an option",
  onSelect,
  className,
}: NestedDropdownProps) {
  const [selectedOption, setSelectedOption] = React.useState<DropdownOption | null>(null)

  const handleSelect = (option: DropdownOption) => {
    if (!option.children || option.children.length === 0) {
      setSelectedOption(option)
      onSelect?.(option)
    }
  }

  const renderDropdownItems = (items: DropdownOption[]) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        return (
          <DropdownMenuSub key={item.value}>
            <DropdownMenuSubTrigger className="flex items-center gap-2">
              {item.icon && <span>{item.icon}</span>}
              <span>{item.label}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>{renderDropdownItems(item.children)}</DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        )
      }

      return (
        <DropdownMenuItem
          key={item.value}
          className="flex items-center gap-2"
          disabled={item.disabled}
          onSelect={() => handleSelect(item)}
        >
          {item.icon && <span>{item.icon}</span>}
          <span>{item.label}</span>
        </DropdownMenuItem>
      )
    })
  }

  return (
    <div className={cn("relative w-full", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="bg-transparent">
          <Button variant="outline" className="w-full justify-between">
            <span>{selectedOption ? selectedOption.label : placeholder}</span>
            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          {renderDropdownItems(options)}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

