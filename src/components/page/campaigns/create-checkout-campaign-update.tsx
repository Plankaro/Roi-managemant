/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import FilterForm from "@/components/page/campaigns/campaign-filter";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CampaignSchema } from "@/zod/campaigns/checkout-create-campaign";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Input } from "@/components/ui/input";
import TemplateBuilder from "@/components/page/broadcast/templatedialog";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import AddContentForm from "@/components/page/campaigns/add-content-form";
import toast from "react-hot-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import NumericInput from "@/components/ui/numericInput";
import {
 
  useGetAllTemplatesQuery,
  useGetSpecificCampaignQuery,
  useUpdateCampaignMutation,
} from "@/store/features/apislice";
import CampaignSkeleton from "./campaign skeletion";
import CampaignNotAvailable from "./not-available";

type CampaignFormValues = z.infer<typeof CampaignSchema>;

const CheckoutCreated = ({ id }: { id: string }) => {
  const { data: templates, isLoading:isTemplateLoading } = useGetAllTemplatesQuery({});

  const {
    data: campaignData,
    isLoading:isCampaignloading,
    isSuccess,
  } = useGetSpecificCampaignQuery(id);
  const [updateCampaign] = useUpdateCampaignMutation();
  console.log("Campaign data:", campaignData);

  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [templateSelectionDialog, setTemplateSelectionDialog] = useState(false);

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
        order_count_greater_or_equal: 0,
        order_count_less_or_equal: 0,
        order_count_min: 0,
        order_count_max: 0,

        // Order Delivery
        order_method: "confirmed",
      },
      type: "promotional",
      trigger_type: "AFTER_CAMPAIGN_CREATED",
      trigger_time: { time: 1, unit: "minutes" },
      is_discount_given: false,
      discount: 1,

      discount_type: "AMOUNT",
      filter_condition_match: false,
      new_checkout_abandonment_filter: false,
      new_checkout_abandonment_type: "AFTER_EVENT",
      new_checkout_abandonment_time: { time: 1, unit: "minutes" },
      new_order_creation_filter: false,
      new_order_creation_type: "AFTER_EVENT",
      new_order_creation_time: { time: 1, unit: "minutes" },
      related_order_created: false,
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
  });

  useEffect(() => {
    if (campaignData && templates) {
      const matched = templates.find(
        (t: any) => t.name === campaignData.template_name
      );
      console.log(matched);

      form.reset({
        name: campaignData.name,
        reply_action: campaignData.reply_action,
        filter: {
          is_order_tag_filter_enabled:
            campaignData.filters.is_order_tag_filter_enabled,
          is_product_tag_filter_enabled:
            campaignData.filters.is_product_tag_filter_enabled,
          is_customer_tag_filter_enabled:
            campaignData.filters.is_customer_tag_filter_enabled,
          is_discount_code_filter_enabled:
            campaignData.filters.is_discount_code_filter_enabled,
          is_payment_gateway_filter_enabled:
            campaignData.filters.is_payment_gateway_filter_enabled,
          is_payment_option_filter_enabled:
            campaignData.filters.is_payment_option_filter_enabled,
          is_send_to_unsub_customer_filter_enabled:
            campaignData.filters.is_send_to_unsub_customer_filter_enabled,
          is_order_amount_filter_enabled:
            campaignData.filters.is_order_amount_filter_enabled,
          is_discount_amount_filter_enabled:
            campaignData.filters.is_discount_amount_filter_enabled,
          is_order_delivery_filter_enabled:
            campaignData.filters.is_order_delivery_filter_enabled,
          is_order_count_filter_enabled:
            campaignData.filters.is_order_count_filter_enabled,

          order_tag_filter_all: campaignData.filters.order_tag_filter_all,
          order_tag_filter_any: campaignData.filters.order_tag_filter_any,
          order_tag_filter_none: campaignData.filters.order_tag_filter_none,
          product_tag_filter_all: campaignData.filters.product_tag_filter_all,
          product_tag_filter_any: campaignData.filters.product_tag_filter_any,
          product_tag_filter_none: campaignData.filters.product_tag_filter_none,
          customer_tag_filter_all: campaignData.filters.customer_tag_filter_all,
          customer_tag_filter_any: campaignData.filters.customer_tag_filter_any,
          customer_tag_filter_none:
            campaignData.filters.customer_tag_filter_none,
          discount_code_filter_any:
            campaignData.filters.discount_code_filter_any,
          discount_code_filter_none:
            campaignData.filters.discount_code_filter_none,
          payment_gateway_filter_any:
            campaignData.filters.payment_gateway_filter_any,
          payment_gateway_filter_none:
            campaignData.filters.payment_gateway_filter_none,

          payment_options_type: campaignData.filters.payment_options_type,
          send_to_unsub_customer: campaignData.filters.send_to_unsub_customer,
          order_amount_filter_greater_or_equal:
            campaignData.filters.order_amount_filter_greater_or_equal,
          order_amount_filter_less_or_equal:
            campaignData.filters.order_amount_filter_less_or_equal,
          order_amount_min: campaignData.filters.order_amount_min,
          order_amount_max: campaignData.filters.order_amount_max,
          discount_amount_filter_greater_or_equal:
            campaignData.filters.discount_amount_filter_greater_or_equal,
          discount_amount_filter_less_or_equal:
            campaignData.filters.discount_amount_filter_less_or_equal,
          discount_amount_min: campaignData.filters.discount_amount_min,
          discount_amount_max: campaignData.filters.discount_amount_max,
          order_count_greater_or_equal:
            campaignData.filters.order_count_greater_or_equal || 0,
          order_count_less_or_equal:
            campaignData.filters.order_count_less_or_equal || 0,
          order_count_min: campaignData.filters.order_count_min || 0,
          order_count_max: campaignData.filters.order_count_max || 0,
          order_method: campaignData.filters.order_method,
        },
        type: campaignData.type,
        trigger_type: campaignData.trigger_type,
        trigger_time: campaignData.trigger_time,
        is_discount_given: campaignData.is_discount_given,
        discount: campaignData.discount,
        discount_type: campaignData.discount_type,
        filter_condition_match: campaignData.filter_condition_match,
        new_checkout_abandonment_filter:
          campaignData.new_checkout_abandonment_filter,
        new_checkout_abandonment_type:
          campaignData.new_checkout_abandonment_type,
        new_checkout_abandonment_time:
          campaignData.new_checkout_abandonment_time,
        new_order_creation_filter: campaignData.new_order_creation_filter,
        new_order_creation_type: campaignData.new_order_creation_type,
        new_order_creation_time: campaignData.new_order_creation_time,
        related_order_created: campaignData.related_order_created,
        related_order_cancelled: campaignData.related_order_cancelled,
        templateForm: campaignData.components,
        template: matched ? matched : null,
      });
    }
  }, [campaignData, templates]);

  console.log(form.getValues());
  const onSubmit = async (data: CampaignFormValues) => {
    try {
      const payload = {
        ...data,
        trigger: "CHECKOUT_CREATED",
        template_name: data.template?.name ?? "",
        template_language: data.template?.language ?? "",
        template_category: data.template?.category ?? "",
      };

      delete (payload as any).template;
      const promise = updateCampaign({ id, body: payload }).unwrap();
      console.log("payload", payload);
      await toast.promise(promise, {
        loading: "updating campaign...",
        success: "Campaign updating successfully!",
        error: "Error updating campaign.",
      });
      console.log(await promise);
      // Additional logic after campaign creation can go here
    } catch (error) {
      // Optionally handle the error further if needed
      console.error("Campaign updating failed:", error);
    }
  };

  const isDiscountavailable = form.watch("is_discount_given");

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
      type: "Cart total items",
      value: "cart_total_items",
    },
    {
      type: "Cart total price",
      value: "cart_total_price",
    },
    {
      type: "Cart items",
      value: "cart_items",
    },
    ...(isDiscountavailable
      ? [
          {
            type: "Discount code",
            value: "discount_code",
          },
          {
            type: "Discount amount",
            value: "discount_amount",
          },
        ]
      : []),
  ];

  const urldropdownOptions = [
    {
      type: "Abandoned Checkout URL",
      value: "abandon_checkout_url",
    },
    {
      type: "Shop URL",
      value: "shop_url",
    },
  ];
  if(isCampaignloading || isTemplateLoading){
    return <CampaignSkeleton />
  }

  if (!isSuccess) {
    return <CampaignNotAvailable />;
  }

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
                    <FormLabel className="md:text-2xl text-lg">
                      Campaign Name
                    </FormLabel>

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
                    <FormLabel className=" md:text-2xl text-lg">
                      Trigger Type
                    </FormLabel>

                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger className="lg:w-10/12  focus:border-blue-500 bg-transparent border-gray-400 text-white rounded-3xl">
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent className="bg-blue-50 ">
                          <SelectItem value="promotional">
                            Promotional
                          </SelectItem>
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
                <p className="text-sm text-gray-500">
                  Select filters to narrow down campaign recipients
                </p>
                <div>
                  <Dialog
                    open={isFilterDialogOpen}
                    onOpenChange={setIsFilterDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Open Filter Form
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[90vw] max-w-[1200px] h-[80vh] p-0 border-0 bg-blue-50">
                      <div className="h-full overflow-hidden">
                        <FilterForm form={form} />
                      </div>
                      {form.formState.errors.filter && (
                        <p className="text-red-500 text-sm">
                          There is an error in the filter fields. Please review
                          your inputs.
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
                    <FormLabel className="text-lg">Select Template</FormLabel>
                    <FormDescription className="text-gray-400">
                      Select a template for broadcast messages
                    </FormDescription>
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
                            field.onChange(template);
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
                              });
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
                    <FormLabel className="md:text-2xl text-lg  text-white">
                      Add Content
                    </FormLabel>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="AFTER_CAMPAIGN_CREATED">
                          Immediate
                        </SelectItem>
                        <SelectItem value="CUSTOM">
                          Custom time after event
                        </SelectItem>
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="is_discount_given"
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
                    <FormLabel className="font-medium">Add Discount</FormLabel>
                  </FormItem>
                )}
              />
              {form.watch("is_discount_given") === true && (
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="discount_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount Type</FormLabel>
                        <Select
                          disabled={form.watch("is_discount_given") === false}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="AMOUNT">Amount</SelectItem>
                            <SelectItem value="PERCENTAGE">
                              Percentage
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter Discount Amount</FormLabel>
                        <FormControl>
                          <NumericInput {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
            <FormField
              control={form.control}
              name="reply_action"
              defaultValue="transfer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">
                    Select reply action
                  </FormLabel>
                  <p className="text-xs text-gray-400">
                    Auto-reply bot for responses. If the user replies within 72
                    hours of getting the message.
                  </p>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                Participants will leave this campaign if, at the moment the
                message is sent, any of the chosen conditions are met.
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
                      <FormLabel>
                        A customer has abandoned their recent checkout
                      </FormLabel>
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="AFTER_EVENT">
                              Immediately after event
                            </SelectItem>
                            <SelectItem value="CUSTOM">
                              Custom time after event
                            </SelectItem>
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
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="AFTER_EVENT">
                              Immediately after event
                            </SelectItem>
                            <SelectItem value="CUSTOM">
                              Custom time after event
                            </SelectItem>
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
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
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
                name="related_order_created"
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
              <Button
                variant="outline"
                type="button"
                className="bg-transparent border-primary"
              >
                Exit
              </Button>
              <Button type="submit" className="bg-blue-500 text-white">
                Update & Launch
              </Button>
            </div>
          </form>
        </Form>
    </ScrollArea>
  );
};

export default CheckoutCreated;
