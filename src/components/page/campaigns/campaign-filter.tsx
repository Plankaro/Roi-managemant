"use client"

import type React from "react"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { OrderMethod, PaymentOptionType } from "@/zod/campaigns/checkout-create-campaign"
import NumericInput from "@/components/ui/numericInput"
import { ScrollArea } from "@radix-ui/react-scroll-area"

interface FilterFormProps {
  form: any
}

const formatEnumValue = (value: string): string => {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

const FilterSection = ({ title, children, enabled, onToggle, visible = true, id, error }: any) => (
  <div
    id={id}
    className={`filter-section space-y-2 border-b border-gray-200 py-4 last:border-0 ${!visible ? "hidden" : ""}`}
    data-title={title.toLowerCase()}
  >
    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
      <FormControl>
        <Checkbox checked={enabled} onCheckedChange={onToggle} variant="blue"/>
      </FormControl>
      <FormLabel className={`text-base font-semibold ${error ? "text-red-500" : ""}`}>{title}</FormLabel>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </FormItem>
    {enabled && <div className="pl-7">{children}</div>}
  </div>
)

const TagInput = ({
  label,
  placeholder,
  fieldName,
  form,
}: {
  label: string
  placeholder: string
  fieldName: string
  form: any
}) => {
  const [inputValue, setInputValue] = useState("")
  const tags = form.watch(fieldName) || []

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
   
      e.preventDefault()
      if(tags.length >= 3) return
      if (!tags.includes(inputValue.trim())) {
        form.setValue(fieldName, [...tags, inputValue.trim()])
      }
      setInputValue("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag: string) => tag !== tagToRemove)
    form.setValue(fieldName, updatedTags)
  }

  return (
    <div className="space-y-2">
      <div>
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={tags.length >= 3}
          
          className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag: string) => (
          <Badge key={tag} variant="secondary" className="bg-blue-500 hover:bg-blue-500 py-2 px-3 text-white">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="ml-1 ">
              <X className="h-3 w-3 text-white" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  )
}

const AmountFilter = ({ form, fieldPrefix }: { form: any; fieldPrefix: string }) => (
  <div className="space-y-2">
    <div className="grid grid-cols-1 gap-2">
      <FormField
        control={form.control}
        name={`filter.${fieldPrefix}_filter_type`}
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select filter type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="greater">Greater than or equal to</SelectItem>
                <SelectItem value="less">Less than or equal to</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch(`filter.${fieldPrefix}_filter_type`) === "greater" && (
        <FormField
          control={form.control}
          name={`filter.${fieldPrefix}_filter_greater_or_equal`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <NumericInput
                  placeholder="Enter amount"
                  {...field}
                  className="border-gray-300"
                  value={field.value === 0 ? "0" : field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {form.watch(`filter.${fieldPrefix}_filter_type`) === "less" && (
        <FormField
          control={form.control}
          name={`filter.${fieldPrefix}_filter_less_or_equal`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <NumericInput
                  placeholder="Enter amount"
                  {...field}
                  className="border-gray-300"
                  value={field.value === 0 ? "0" : field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {form.watch(`filter.${fieldPrefix}_filter_type`) === "custom" && (
        <div className="grid grid-cols-1 gap-2">
          <FormField
            control={form.control}
            name={`filter.${fieldPrefix}_min`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <NumericInput
                    placeholder="Enter minimum"
                    {...field}
                    className="border-gray-300"
                    value={field.value === 0 ? "0" : field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`filter.${fieldPrefix}_max`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <NumericInput
                    placeholder="Enter maximum"
                    {...field}
                    className="border-gray-300"
                    value={field.value === 0 ? "0" : field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  </div>
)

export default function FilterForm({ form }: FilterFormProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    const sections = document.querySelectorAll(".filter-section")
    if (searchTerm.trim() === "") {
      setVisibleSections(new Set(Array.from(sections).map((section) => section.id)))
      return
    }

    const searchWords = searchTerm.toLowerCase().split(" ")
    const visible = new Set<string>()

    sections.forEach((section) => {
      const sectionText = section.getAttribute("data-title") || ""
      const matches = searchWords.every((word) => sectionText.includes(word))
      if (matches) {
        visible.add(section.id)
      }
    })

    setVisibleSections(visible)
  }, [searchTerm])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const isVisible = (sectionId: string) => visibleSections.has(sectionId)

  return (
    <Card className="w-full bg-blue-50 shadow-lg border-0">
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-xl">Data Filters</CardTitle>
        <CardDescription>Narrow down campaign recipients with precise filters</CardDescription>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10 border-gray-300"
            placeholder="Search filters..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 py-4 b-0">
        <ScrollArea className="space-y-1 h-[calc(100vh-300px)] no-scrollbar overflow-y-auto">
          {/* Order Tags */}
          <FilterSection
            id="order-tags"
            title="Order Tags"
            enabled={form.watch("filter.is_order_tag_filter_enabled")}
            onToggle={(checked: boolean) => form.setValue("filter.is_order_tag_filter_enabled", checked)}
            visible={isVisible("order-tags")}
            error={form.formState.errors.filter?.is_order_tag_filter_enabled?.message}
          >
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <TagInput
                label="Must have all these tags"
                placeholder="Add tag and press Enter"
                fieldName="filter.order_tag_filter_all"
                form={form}
              />
              <TagInput
                label="Must have any of these tags"
                placeholder="Add tag and press Enter"
                fieldName="filter.order_tag_filter_any"
                form={form}
              />
              <TagInput
                label="Must not have these tags"
                placeholder="Add tag and press Enter"
                fieldName="filter.order_tag_filter_none"
                form={form}
              />
            </div>
          </FilterSection>

          {/* Customer Tags */}
          <FilterSection
            id="customer-tags"
            title="Customer Tags"
            enabled={form.watch("filter.is_customer_tag_filter_enabled")}
            onToggle={(checked: boolean) => form.setValue("filter.is_customer_tag_filter_enabled", checked)}
            visible={isVisible("customer-tags")}
            error={form.formState.errors.filter?.is_customer_tag_filter_enabled?.message}
          >
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <TagInput
                label="Must have all these tags"
                placeholder="Add tag and press Enter"
                fieldName="filter.customer_tag_filter_all"
                form={form}
              />
              <TagInput
                label="Must have any of these tags"
                placeholder="Add tag and press Enter"
                fieldName="filter.customer_tag_filter_any"
                form={form}
              />
              <TagInput
                label="Must not have these tags"
                placeholder="Add tag and press Enter"
                fieldName="filter.customer_tag_filter_none"
                form={form}
              />
            </div>
          </FilterSection>

          {/* Product Tags */}
          <FilterSection
            id="product-tags"
            title="Product Tags"
            enabled={form.watch("filter.is_product_tag_filter_enabled")}
            onToggle={(checked: boolean) => form.setValue("filter.is_product_tag_filter_enabled", checked)}
            visible={isVisible("product-tags")}
            error={form.formState.errors.filter?.is_product_tag_filter_enabled?.message}
          >
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <TagInput
                label="Must have all these tags"
                placeholder="Add tag and press Enter"
                fieldName="filter.product_tag_filter_all"
                form={form}
              />
              <TagInput
                label="Must have any of these tags"
                placeholder="Add tag and press Enter"
                fieldName="filter.product_tag_filter_any"
                form={form}
              />
              <TagInput
                label="Must not have these tags"
                placeholder="Add tag and press Enter"
                fieldName="filter.product_tag_filter_none"
                form={form}
              />
            </div>
          </FilterSection>

          {/* Payment Gateways */}
          <FilterSection
            id="payment-gateways"
            title="Payment Gateways"
            enabled={form.watch("filter.is_payment_gateway_filter_enabled")}
            onToggle={(checked: boolean) => form.setValue("filter.is_payment_gateway_filter_enabled", checked)}
            visible={isVisible("payment-gateways")}
            error={form.formState.errors.filter?.is_payment_gateway_filter_enabled?.message}
          >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <TagInput
                label="Accept these payment methods"
                placeholder="Add payment method and press Enter"
                fieldName="filter.payment_gateway_filter_any"
                form={form}
              />
              <TagInput
                label="Exclude these payment methods"
                placeholder="Add payment method and press Enter"
                fieldName="filter.payment_gateway_filter_none"
                form={form}
              />
            </div>
          </FilterSection>

          {/* Payment Options */}
          <FilterSection
            id="payment-options"
            title="Payment Options"
            enabled={form.watch("filter.is_payment_option_filter_enabled")}
            onToggle={(checked: boolean) => form.setValue("filter.is_payment_option_filter_enabled", checked)}
            visible={isVisible("payment-options")}
            error={form.formState.errors.filter?.is_payment_option_filter_enabled?.message}
          >
            <FormField
              control={form.control}
              name="filter.payment_options_type"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={PaymentOptionType.enum.PAID}>Paid</SelectItem>
                      <SelectItem value={PaymentOptionType.enum.UNPAID}>Unpaid</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FilterSection>

          {/* Order Amount */}
          <FilterSection
            id="order-amount"
            title="Order Amount"
            enabled={form.watch("filter.is_order_amount_filter_enabled")}
            onToggle={(checked: boolean) => form.setValue("filter.is_order_amount_filter_enabled", checked)}
            visible={isVisible("order-amount")}
            error={form.formState.errors.filter?.is_order_amount_filter_enabled?.message}
          >
            <AmountFilter form={form} fieldPrefix="order_amount" />
          </FilterSection>

          {/* Discount Amount */}
          <FilterSection
            id="discount-amount"
            title="Discount Amount"
            enabled={form.watch("filter.is_discount_amount_filter_enabled")}
            onToggle={(checked: boolean) => form.setValue("filter.is_discount_amount_filter_enabled", checked)}
            visible={isVisible("discount-amount")}
            error={form.formState.errors.filter?.is_discount_amount_filter_enabled?.message}
          >
            <AmountFilter form={form} fieldPrefix="discount_amount" />
          </FilterSection>

          {/* Order Count */}
          <FilterSection
            id="order-count"
            title="Order Count"
            enabled={form.watch("filter.is_order_count_filter_enabled")}
            onToggle={(checked: boolean) => form.setValue("filter.is_order_count_filter_enabled", checked)}
            visible={isVisible("order-count")}
            error={form.formState.errors.filter?.is_order_count_filter_enabled?.message}
          >
            <AmountFilter form={form} fieldPrefix="order_count" />
          </FilterSection>

          {/* Order Delivery Status */}
          <FilterSection
            id="order-delivery"
            title="Order Delivery Status"
            enabled={form.watch("filter.is_order_delivery_filter_enabled")}
            onToggle={(checked: boolean) => form.setValue("filter.is_order_delivery_filter_enabled", checked)}
            visible={isVisible("order-delivery")}
            error={form.formState.errors.filter?.is_order_delivery_filter_enabled?.message}
          >
            <FormField
              control={form.control}
              name="filter.order_method"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select delivery status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(OrderMethod.options as string[]).map((method) => (
                        <SelectItem key={method} value={method}>
                          {formatEnumValue(method)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FilterSection>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

