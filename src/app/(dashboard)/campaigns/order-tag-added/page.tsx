"use client";

import React, { useState } from "react";
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
import { campaignSchema } from "@/zod/campaigns/checkout-create-campaign";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import TemplateBuilder from "@/components/page/broadcast/templatedialog";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import AddContentForm from "@/components/page/campaigns/add-content-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

type CampaignFormValues = z.infer<typeof campaignSchema>;

const OrderCreated = () => {
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [templateSelectionDialog, setTemplateSelectionDialog] = useState(false);

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
  });

  const onSubmit = (data: CampaignFormValues) => {
    console.log(data);
    // Handle form submission logic here
  };

  const dropdownOptions = [
    {
      type: "Customer full name",
      value: "customer_full_name",
    },
    {
      type: "Customer address",
      value: "customer_address",
    },
  ];
  const urldropdownOptions = [
    {
      type: "Abandoned Checkout Url",
      value: "abandon_checkout_url",
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
                    <Select disabled defaultValue="checkout_create">
                      <SelectTrigger className="lg:w-10/12  focus:border-blue-500 bg-transparent border-gray-400 text-white rounded-3xl">
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-blue-50 ">
                        <SelectItem value="checkout_create">
                          On Checkout Create
                        </SelectItem>
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
            <FormField
              control={form.control}
              name="filter"
              render={({}) => (
                <FormItem className="space-y-3 basis-1/2">
                  <FormLabel className="md:text-2xl text-lg">
                    Data Filters
                  </FormLabel>
                  <FormDescription>
                    Select filters to narrow down campaign recipients
                  </FormDescription>
                  <FormControl>
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
                      </DialogContent>
                    </Dialog>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="template"
              render={({ field, fieldState }) => (
                <FormItem className="py-2 md:text-2xl text-lg text-white basis-1/2">
                  <FormLabel>Select Template</FormLabel>
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
                        setSelectedTemplate={field.onChange}
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
              render={({ field, fieldState }) => (
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
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          {/* <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Create Campaign
        </Button> */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="checkoutCreatedCampaign.isdiscountgiven"
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

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="checkoutCreatedCampaign.discount_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Type</FormLabel>
                    <Select
                      disabled={
                        !form.watch("checkoutCreatedCampaign.isdiscountgiven")
                      }
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="amount">Amount</SelectItem>
                        <SelectItem value="percentage">Percentage</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="checkoutCreatedCampaign.discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Discount Amount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0.00"
                        {...field}
                        disabled={
                          !form.watch("checkoutCreatedCampaign.isdiscountgiven")
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-4">
              <h3 className="text-lg font-medium">Exit Criteria</h3>
              <p className="text-sm text-muted-foreground">
                Participants will leave this campaign if, at the moment the message is sent, any of the chosen
                conditions are met.
              </p>

              {/* Abandoned Checkout */}
              <FormField
                control={form.control}
                name="checkoutCreatedCampaign.new_checkout_abandonment_filter"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange}  variant="blue"
                      className="border border-white"/>
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>A customer has abandoned their recent checkout</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              {form.watch("checkoutCreatedCampaign.new_checkout_abandonment_filter") && (
                <div className=" space-y-4">
                  <FormField
                    control={form.control}
                    name="checkoutCreatedCampaign.new_checkout_abandonment_type"
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
                            <SelectItem value="after_event">Immediately after event</SelectItem>
                            <SelectItem value="CUSTOM">Custom time after event</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  {form.watch("checkoutCreatedCampaign.new_checkout_abandonment_type") === "CUSTOM" && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="checkoutCreatedCampaign.new_checkout_abandonment_time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter time" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="checkoutCreatedCampaign.new_checkout_abandonment_unit"
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
                name="checkoutCreatedCampaign.new_order_creation_filter"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange}  variant="blue"
                      className="border border-white"/>
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Customer has submitted a new order</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              {form.watch("checkoutCreatedCampaign.new_order_creation_filter") && (
                <div className=" space-y-4">
                  <FormField
                    control={form.control}
                    name="checkoutCreatedCampaign.new_order_creation_type"
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
                            <SelectItem value="after_event">Immediately after event</SelectItem>
                            <SelectItem value="CUSTOM">Custom time after event</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  {form.watch("checkoutCreatedCampaign.new_order_creation_type") === "CUSTOM" && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="checkoutCreatedCampaign.new_order_creation_time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter time" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="checkoutCreatedCampaign.new_order_creation_unit"
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
                name="checkoutCreatedCampaign.related_order_cancelled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange}  variant="blue"
                      className="border border-white"/>
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
                name="checkoutCreatedCampaign.related_order_created"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange}  variant="blue"
                      className="border border-white"/>
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
              <Button type="submit" className="bg-blue-500 text-white">Save & Launch</Button>
            </div>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default OrderCreated;
