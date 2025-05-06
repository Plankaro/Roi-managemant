"use client"

import { useState } from "react"
import FilterForm from "@/components/page/campaigns/campaign-filter"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage, FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { CampaignSchema } from "@/zod/campaigns/order-create-campaign"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { Input } from "@/components/ui/input"
import TemplateBuilder from "@/components/page/broadcast/templatedialog"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import AddContentForm from "@/components/page/campaigns/add-content-form"
import toast from "react-hot-toast"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import NumericInput from "@/components/ui/numericInput"
import { useCreateCampaignMutation } from "@/store/features/apislice"

type CampaignFormValues = z.infer<typeof CampaignSchema>

const OrderCreated = () => {
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)
  const [templateSelectionDialog, setTemplateSelectionDialog] = useState(false)
  const [createCampaign] = useCreateCampaignMutation()

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(CampaignSchema),
    defaultValues: {
      name: "",
      reply_action: "transfer",
      filter: {
        // Boolean flags
        is_order_tag_filter_enabled: false,
        is_product_tag_filter_enabled: false,
        is_customer_tag_filter_enabled: false,
        is_discount_code_filter_enabled: false,
        is_payment_gateway_filter_enabled: false,
        is_payment_option_filter_enabled: false,
        is_send_to_unsub_customer_filter_enabled: false,
        is_order_amount_filter_enabled: false,
        is_discount_amount_filter_enabled: false,
        is_order_delivery_filter_enabled: false,
        is_order_count_filter_enabled: false,

        // Arrays for tags and codes
        order_tag_filter_all: [],
        order_tag_filter_any: [],
        order_tag_filter_none: [],
        product_tag_filter_all: [],
        product_tag_filter_any: [],
        product_tag_filter_none: [],
        customer_tag_filter_all: [],
        customer_tag_filter_any: [],
        customer_tag_filter_none: [],
        discount_code_filter_any: [],
        discount_code_filter_none: [],
        payment_gateway_filter_any: [],
        payment_gateway_filter_none: [],

        // Payment Options / Unsubscribed Customers
        payment_options_type: "PAID",
        send_to_unsub_customer: false,

        // Order Amount - numeric defaults
        order_amount_filter_type: "greater",
        order_amount_filter_greater_or_equal: 0,
        order_amount_filter_less_or_equal: 0,
        order_amount_min: 0,
        order_amount_max: 0,

        // Discount Amount - numeric defaults
        discount_amount_filter_type: "greater",
        discount_amount_filter_greater_or_equal: 0,
        discount_amount_filter_less_or_equal: 0,
        discount_amount_min: 0,
        discount_amount_max: 0,

        // Order Count - numeric defaults
        order_count_filter_type: "greater",
        order_count_filter_greater_or_equal: 0,
        order_count_filter_less_or_equal: 0,
        order_count_min: 0,
        order_count_max: 0,

        // Order Delivery
        order_method: "confirmed",
      },
      type: "promotional",
      trigger_type: "AFTER_CAMPAIGN_CREATED",
      trigger_time: { time: 1, unit: "minutes" },
     
      filter_condition_match: false,
      new_checkout_abandonment_filter: false,
      new_checkout_abandonment_type: "AFTER_EVENT",
      new_checkout_abandonment_time: { time: 1, unit: "minutes" },
      new_order_creation_filter: false,
      new_order_creation_type: "AFTER_EVENT",
      new_order_creation_time: { time: 1, unit: "minutes" },
      related_order_fulfilled: false,
      related_order_cancelled: false,
      // Initialize templateForm with default values
      templateForm: {
        header: {
          type: "",
          value: "",
          isEditable: false,
          fromsegment: false,
          segmentname: "",
        },
        body: [],
        buttons: [],
      },
    },
  })

  console.log(form.getValues())
  const onSubmit = async (data: CampaignFormValues) => {
    try {
      const promise = createCampaign({...data,trigger:"ORDER_TAG_ADDED"})
      await toast.promise(promise, {
        loading: "Creating campaign...",
        success: "Campaign created successfully!",
        error: "Error creating campaign.",
      })
      console.log(await promise)
      // Additional logic after campaign creation can go here
    } catch (error) {
      // Optionally handle the error further if needed
      console.error("Campaign creation failed:", error)
    }
  }

 

  const dropdownOptions = [
    {
      type: "Customer full name",
      value: "customer_full_name",
    },
    {
      type: "Customer address",
      value: "customer_address",
    },
    {
      type: "Customer phone",
      value: "customer_phone",
    },
    {
      type: "order total items",
      value: "order_total_items",
    },
    {
      type: "order total price",
      value: "order_total_price",
    },
    {
      type: "Cart items",
      value: "cart_items",
    },
    {
        type:"Order id",
        value:"order_id"
    },
    {
        type:"Shipping address",
        value:"shipping_address"
    },
    {
        type:"Order date",
        value:"order_date"
    }
   
  ];
  
  const urldropdownOptions = [
    {
      type: "Order Status Link",
      value: "order_status_link",
    },
    {
        type:"COD to checkout link",
        value:"cod_to_checkout_link"
    },
    {
      type: "Shop URL",
      value: "shop_url",
    },
  ];
  
  return (
    <ScrollArea className="h-[calc(100vh-100px)] overflow-auto no-scrollbar">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 text-white mx-auto px-4 sm:px-6 lg:px-8 overflow-auto  no-scrollbar"
        >
          {/* Campaign Name Field */}
          <div className="flex flex-col md:flex-row  md:items-center justify-between">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-3 basis-1/2">
                  <FormLabel className="md:text-2xl text-lg">Campaign Name</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter broadcast name"
                      className="bg-transparent sm:text-base text-sm border-gray-400 text-white rounded-3xl focus:border-blue-500 lg:w-10/12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-3 basis-1/2">
                  <FormLabel className=" md:text-2xl text-lg">Trigger Type</FormLabel>

                  <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="lg:w-10/12  focus:border-blue-500 bg-transparent border-gray-400 text-white rounded-3xl">
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-blue-50 ">
                        <SelectItem value="promotional">Promotional</SelectItem>
                        <SelectItem value="utility">Utility</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          {/* Filter Selection Dialog */}
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="space-y-3 basis-1/2">
              <label className="md:text-2xl text-lg">Data Filters</label>
              <p className="text-sm text-gray-500">Select filters to narrow down campaign recipients</p>
              <div>
                <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
                  <DialogTrigger asChild>
                    <Button type="button" className="bg-blue-600 hover:bg-blue-700">
                      Open Filter Form
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[90vw] max-w-[1200px] h-[80vh] p-0 border-0 bg-blue-50">
                    <div className="h-full overflow-hidden">
                      <FilterForm form={form} />
                    </div>
                    {form.formState.errors.filter && (
                      <p className="text-red-500 text-sm">
                        There is an error in the filter fields. Please review your inputs.
                      </p>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <FormField
              control={form.control}
              name="template"
              render={({ field, fieldState }) => (
                <FormItem className="py-2 md:text-2xl text-lg text-white basis-1/2">
                  <FormLabel>Select Template</FormLabel>
                  <FormDescription className="text-gray-400">Select a template for broadcast messages</FormDescription>
                  <FormControl>
                    <div>
                      <Button
                        className=" bg-blue-500 text-white hover:bg-blue-600 items-center flex justify-center"
                        onClick={() => setTemplateSelectionDialog(true)}
                        type="button"
                      >
                        Select Template
                      </Button>
                      <TemplateBuilder
                        open={templateSelectionDialog}
                        setOpen={setTemplateSelectionDialog}
                        selectedTemplate={field.value}
                        setSelectedTemplate={(template) => {
                          field.onChange(template)
                          // Initialize templateForm when template is selected
                          if (template) {
                            form.setValue("templateForm", {
                              header: {
                                type: "",
                                value: "",
                                isEditable: false,
                                fromsegment: false,
                                segmentname: "",
                              },
                              body: [],
                              buttons: [],
                            })
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="templateForm"
              render={({ field }) => (
                <FormItem className="py-2">
                  <FormLabel className="md:text-2xl text-lg  text-white">Add Content</FormLabel>
                  <FormControl>
                    <AddContentForm
                      urldropdownOptions={urldropdownOptions}
                      dropdownOptions={dropdownOptions}
                      selectedTemplate={form.watch("template")}
                      formData={field.value}
                      setFormData={field.onChange}
                      errors={form.formState.errors}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className=" space-y-4">
            <FormField
              control={form.control}
              name="trigger_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>When to trigger</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AFTER_CAMPAIGN_CREATED">Immediate</SelectItem>
                      <SelectItem value="CUSTOM">Custom time after event</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          {form.watch("trigger_type") === "CUSTOM" && (
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="trigger_time.time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <NumericInput {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="trigger_time.unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="minutes">Minutes</SelectItem>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          )}

       
          <FormField
            control={form.control}
            name="reply_action"
            defaultValue="transfer"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-2xl">Select reply action</FormLabel>
                <p className="text-xs text-gray-400">
                  Auto-reply bot for responses. If the user replies within 72 hours of getting the message.
                </p>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-transparent lg:w-1/4 md:w-1/2 text-white">
                      <SelectValue placeholder="Transfer Bot" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="transfer">Transfer Bot</SelectItem>
                    <SelectItem value="welcome-bot">Welcome bot</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Exit Criteria</h3>
            <p className="text-sm text-muted-foreground">
              Participants will leave this campaign if, at the moment the message is sent, any of the chosen conditions
              are met.
            </p>

            {/* Abandoned Checkout */}
            <FormField
              control={form.control}
              name="new_checkout_abandonment_filter"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      variant="blue"
                      className="border border-white"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>A customer has abandoned their recent checkout</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {form.watch("new_checkout_abandonment_filter") && (
              <div className=" space-y-4">
                <FormField
                  control={form.control}
                  name="new_checkout_abandonment_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>When to trigger</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="AFTER_EVENT">Immediately after event</SelectItem>
                          <SelectItem value="CUSTOM">Custom time after event</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {form.watch("new_checkout_abandonment_type") === "CUSTOM" && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="new_checkout_abandonment_time.time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <FormControl>
                            <NumericInput {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="new_checkout_abandonment_time.unit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="minutes">Minutes</SelectItem>
                              <SelectItem value="hours">Hours</SelectItem>
                              <SelectItem value="days">Days</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Created Order */}
            <FormField
              control={form.control}
              name="new_order_creation_filter"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      variant="blue"
                      className="border border-white"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Customer has submitted a new order</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {form.watch("new_order_creation_filter") && (
              <div className=" space-y-4">
                <FormField
                  control={form.control}
                  name="new_order_creation_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>When to trigger</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="AFTER_EVENT">Immediately after event</SelectItem>
                          <SelectItem value="CUSTOM">Custom time after event</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {form.watch("new_order_creation_type") === "CUSTOM" && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="new_order_creation_time.time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <FormControl>
                            <NumericInput {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="new_order_creation_time.unit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="minutes">Minutes</SelectItem>
                              <SelectItem value="hours">Hours</SelectItem>
                              <SelectItem value="days">Days</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Order Cancelled */}
            <FormField
              control={form.control}
              name="related_order_cancelled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      variant="blue"
                      className="border border-white"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>The concerned order is cancelled</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {/* Order Fulfilled */}
            <FormField  
              control={form.control}
              name="related_order_fulfilled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      variant="blue"
                      className="border border-white"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>The concerned order is fulfilled</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button" className="bg-transparent border-primary">
              Exit
            </Button>
            <Button type="submit" className="bg-blue-500 text-white">
              Save & Launch
            </Button>
          </div>
        </form>
      </Form>
    </ScrollArea>
  )
}

export default OrderCreated

