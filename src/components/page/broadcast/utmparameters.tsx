/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { z } from "zod"
import { utmParametersSchema } from "@/zod/broadcast/form"

type UTMParameters = z.infer<typeof utmParametersSchema>

const utmLabelsAndPlaceholders = {
  utm_source: {
    label: "UTM source (The referrer – eg: Google, Newsletter)",
    placeholder: "Enter your utm source",
  },
  utm_medium: {
    label: "UTM medium (Marketing medium – eg: cpc, banner, email)",
    placeholder: "Enter your utm medium",
  },
  utm_campaign: {
    label: "UTM campaign name (Product, promo code or slogan – eg: spring_sale)",
    placeholder: "Enter your utm campaign",
  },
  utm_id: {
    label: "UTM ID (The ads campaign ID)",
    placeholder: "",
  },
  utm_term: {
    label: "UTM term (Identify the paid keywords)",
    placeholder: "",
  },
}

interface UTMParametersDialogProps {
  children: React.ReactNode
  utmParameters: UTMParameters  // This comes from field.value
  setUtmParameters: React.Dispatch<React.SetStateAction<UTMParameters>> // This is field.onChange
}

export function UTMParametersDialog({
  children,
  utmParameters,
  setUtmParameters,
}: UTMParametersDialogProps) {
  // Updates the field value for a given UTM key when the checkbox changes
  const handleCheckboxChange = (key: keyof UTMParameters, checked: boolean) => {
    const prev = utmParameters
    const newParams = {
      ...prev,
      [key]:
        typeof prev[key] === "boolean"
          ? checked
          : { ...prev[key], enabled: checked, value: checked ? (prev[key] as { value: string }).value : "" },
    }
    setUtmParameters(newParams)
  }

  // Updates the field value for a given UTM key when the input changes
  const handleInputChange = (key: keyof UTMParameters, rawValue: string) => {
    const transformedValue = rawValue.toLowerCase().replace(/\s+/g, "_")
    const prev = utmParameters
    const newParams = {
      ...prev,
      [key]: { ...(prev[key] as { enabled: boolean; value: string }), value: transformedValue },
    }
    setUtmParameters(newParams)
  }

  // Compute preview URL based on active UTM parameters
  const activeParams = Object.entries(utmParameters)
    .filter(
      ([, value]) =>
        typeof value === "object" &&
        value.enabled &&
        value.value &&
        value.value.trim() !== ""
    )
    .map(
      ([key, value]) =>
        `${key}=${encodeURIComponent((value as { value: string }).value)}`
    )

  const previewURL =
    "{your_link}" + (activeParams.length > 0 ? "?" + activeParams.join("&") : "")

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl bg-blue-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">UTM Parameters</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6 w-full">
          <div>
            <h3 className="text-lg font-semibold mb-2">Preview</h3>
            <div className="max-w-3xl p-3 bg-transparent rounded-lg break-words">
              {previewURL}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">UTM Parameter Settings</h3>
            <div className="space-y-4">
              {(Object.keys(utmParameters) as Array<keyof UTMParameters>).map((key) => (
                <div key={key} className="flex items-start space-x-3 w-full">
                  <Checkbox
                    id={key}
                    variant="blue"
                    checked={
                      typeof utmParameters[key] === "boolean"
                        ? (utmParameters[key] as boolean)
                        : (utmParameters[key] as { enabled: boolean }).enabled
                    }
                    onCheckedChange={(checked: boolean) =>
                      handleCheckboxChange(key, checked)
                    }
                  />
                  <div className="space-y-1.5 w-full">
                    <Label htmlFor={key} className="text-base">
                      {utmLabelsAndPlaceholders[key].label}
                    </Label>
                    {!["utm_id", "utm_term"].includes(key) && (
                      <Input
                        placeholder={utmLabelsAndPlaceholders[key].placeholder}
                        value={(utmParameters[key] as { value: string }).value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(key, e.target.value)
                        }
                        className="border-blue-500 focus:ring-blue-500 w-full"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <DialogClose asChild>
            <Button className="bg-blue-500 text-white py-3 px-6">Proceed</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
