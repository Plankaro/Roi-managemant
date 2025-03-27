import { z } from "zod";
import { isEmpty } from "lodash";
import {  Templateschema } from "../broadcast/form";

export const OrderMethod = z.enum([
  "confirmed",
  "label_printed",
  "label_purchases",
  "ready_for_pickup",
  "picked_up",
  "in_transit",
  "out_for_delivery",
  "attemped_delivery",
  "failed_delivery",
  "delivered",
]);

export const PaymentOptionType = z.enum(["PAID", "UNPAID"]);
export const TriggerType = z.enum(["BETWEEN_TRIGGER_TO_EVENT", "CUSTOM"]);

const FilterSchema = z
  .object({
    // Order Tags
    is_order_tag_filter_enabled: z.boolean().default(false),
    order_tag_filter_all: z.array(z.string()).default([]),
    order_tag_filter_any: z.array(z.string()).default([]),
    order_tag_filter_none: z.array(z.string()).default([]),

    // Product Tags
    is_product_tag_filter_enabled: z.boolean().default(false),
    product_tag_filter_all: z.array(z.string()).default([]),
    product_tag_filter_any: z.array(z.string()).default([]),
    product_tag_filter_none: z.array(z.string()).default([]),

    // Customer Tags
    is_customer_tag_filter_enabled: z.boolean().default(false),
    customer_tag_filter_all: z.array(z.string()).default([]),
    customer_tag_filter_any: z.array(z.string()).default([]),
    customer_tag_filter_none: z.array(z.string()).default([]),

    // Payment Gateways
    is_payment_gateway_filter_enabled: z.boolean().default(false),
    payment_gateway_filter_any: z.array(z.string()).default([]),
    payment_gateway_filter_none: z.array(z.string()).default([]),

    // Payment Options
    is_payment_option_filter_enabled: z.boolean().default(false),
    payment_options_type: PaymentOptionType.optional().nullable(),

    // Unsubscribed Customers
    is_send_to_unsub_customer_filter_enabled: z.boolean().default(false),
    send_to_unsub_customer: z.boolean().optional().nullable(),

    // Order Amount
    is_order_amount_filter_enabled: z.boolean().default(false),
    order_amount_filter_type: z.enum(["greater", "less", "custom"]).optional().nullable(),
    order_amount_filter_greater_or_equal: z.number().optional().nullable(),
    order_amount_filter_less_or_equal: z.number().optional().nullable(),
    order_amount_min: z.number().optional().nullable(),
    order_amount_max: z.number().optional().nullable(),

    // Discount Amount
    is_discount_amount_filter_enabled: z.boolean().default(false),
    discount_amount_filter_type: z.enum(["greater", "less", "custom"]).optional().nullable(),
    discount_amount_filter_greater_or_equal: z.number().optional().nullable(),
    discount_amount_filter_less_or_equal: z.number().optional().nullable(),
    discount_amount_min: z.number().optional().nullable(),
    discount_amount_max: z.number().optional().nullable(),

    // Discount Codes
    is_discount_code_filter_enabled: z.boolean().default(false),
    discount_code_filter_any: z.array(z.string()).default([]),
    discount_code_filter_none: z.array(z.string()).default([]),

    // Order Count
    is_order_count_filter_enabled: z.boolean().default(false),
    order_count_filter_type: z.enum(["greater", "less", "custom"]).optional().nullable(),
    order_count_greater_or_equal: z.number().optional().nullable(),
    order_count_less_or_equal: z.number().optional().nullable(),
    order_count_min: z.number().optional().nullable(),
    order_count_max: z.number().optional().nullable(),

    // Order Delivery
    is_order_delivery_filter_enabled: z.boolean().default(false),
    order_method: OrderMethod.optional().nullable(),
  })
  .superRefine((data, ctx) => {
    const addIssue = (path: string[], message: string) => {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path,
        message,
      });
    };

    if (data.is_order_tag_filter_enabled && isEmpty(data.order_tag_filter_all) && isEmpty(data.order_tag_filter_any) && isEmpty(data.order_tag_filter_none)) {
      addIssue(["order_tag_filter_all", "order_tag_filter_any", "order_tag_filter_none"], "At least one order tag filter must be provided when order tag filter is enabled.");
    }

    if (data.is_product_tag_filter_enabled && isEmpty(data.product_tag_filter_all) && isEmpty(data.product_tag_filter_any) && isEmpty(data.product_tag_filter_none)) {
      addIssue(["product_tag_filter_all", "product_tag_filter_any", "product_tag_filter_none"], "At least one product tag filter must be provided when product tag filter is enabled.");
    }

    if (data.is_customer_tag_filter_enabled && isEmpty(data.customer_tag_filter_all) && isEmpty(data.customer_tag_filter_any) && isEmpty(data.customer_tag_filter_none)) {
      addIssue(["customer_tag_filter_all", "customer_tag_filter_any", "customer_tag_filter_none"], "At least one customer tag filter must be provided when customer tag filter is enabled.");
    }

    if (data.is_payment_gateway_filter_enabled && isEmpty(data.payment_gateway_filter_any) && isEmpty(data.payment_gateway_filter_none)) {
      addIssue(["payment_gateway_filter_any", "payment_gateway_filter_none"], "At least one payment gateway filter must be provided when payment gateway filter is enabled.");
    }

    if (data.is_order_amount_filter_enabled) {
      if (isEmpty(data.order_amount_filter_type)) {
        addIssue(["order_amount_filter_type"], "Order amount filter type must be provided when order amount filter is enabled.");
      } else if (data.order_amount_filter_type === "greater" && isEmpty(data.order_amount_filter_greater_or_equal)) {
        addIssue(["order_amount_filter_greater_or_equal"], "Value for 'greater or equal' must be provided when filter type is 'greater'.");
      } else if (data.order_amount_filter_type === "less" && isEmpty(data.order_amount_filter_less_or_equal)) {
        addIssue(["order_amount_filter_less_or_equal"], "Value for 'less or equal' must be provided when filter type is 'less'.");
      } else if (data.order_amount_filter_type === "custom" && (isEmpty(data.order_amount_min) || isEmpty(data.order_amount_max))) {
        addIssue(["order_amount_min", "order_amount_max"], "Both minimum and maximum values must be provided when filter type is 'custom'.");
      }
    }
  });


  const headerSchema = z
  .object({
    type: z.string().min(1, "Type is required"),
    value: z.string().optional(), // Make value optional initially
    isEditable: z.boolean(),
    fromsegment: z.boolean(),
    segmentname: z.string(),
  
    
  })
  .optional()
  .superRefine((data, ctx) => {
    if (!data) return;

    if (data.fromsegment) {
      if (!data.segmentname.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Segement name is required",
          path: ["segmentname"],
        });
      }
      
    
    } else {
      // Require value only when fromsegment is false
      if (!data.value || !data.value.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Missing header value ",
          path: ["value"],
        });
      }
    }
  });
  const bodyItemSchema = z
  .object({
    parameter_name: z.string().min(1, "Parameter name is required"),
    value: z.string().optional(), // Make value optional initially
    fromsegment: z.boolean(),
    segmentname: z.string(),
   
   
  })
  .superRefine((data, ctx) => {
    if (data.fromsegment) {
      if (!data.segmentname.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Segment Name is required",
          path: ["segmentname"],
        });
      }
     
     
    } else {
      // Require value only when fromsegment is false
      if (!data.value || !data.value.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Missing value",
          path: ["value"],
        });
      }
    }
  });



  const buttonSchema = z.object({
    type: z.string(),

    value: z.string(),
    isEditable: z.boolean(),
    text:z.string(),
    fromsegment: z.boolean(),
    segmentname: z.string(),
  }).superRefine((data, ctx) => {
    if (data.isEditable) {
      if (data.type.length < 1) {
        ctx.addIssue({
          path: ["type"],
          message: "Button type is required",
          code: "custom",
        });
      }
      if (data.value.length < 1) {
        ctx.addIssue({
          path: ["value"],
          message: "Button value is required",
          code: "custom",
        });
      }
    }
    if (data.fromsegment) {
      if (!data.segmentname.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Segment Name is required",
          path: ["segmentname"],
        });
      }
     
     
    } else {
      // Require value only when fromsegment is false
      if (!data.value || !data.value.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Missing value",
          path: ["value"],
        });
      }
    }
  });
  
  // Example usage

  

export const TemplateFormSchema = z.object({
  header: headerSchema,
  body: z.array(bodyItemSchema),
  buttons: z.array(buttonSchema),
});

export const campaignSchema = z.object({
  name: z.string().min(1, "Campaign name is required"),
  type: z.string().min(1, "Type is required"),
  filter: FilterSchema,
  templateForm:TemplateFormSchema,
  template: Templateschema,
  checkoutCreatedCampaign: z
    .object({
      trigger_type: TriggerType,
      trigger_time: z.string().min(1, "Trigger time is required"),
      template_name: z.string(),
     
      components: z.any(),
      isdiscountgiven: z.boolean().default(true),
      discount: z.number().optional(),
      coupon_code: z.string().optional(),
      discount_type: z.enum(["PERCENTAGE", "FIXED"]),
      filter_condition_match: z.boolean(),
      new_checkout_abandonment_filter: z.boolean(),
      new_checkout_abandonment_type: TriggerType.optional(),
      new_checkout_abandonment_time: z.string().optional(),
      new_checkout_abandonment_unit:z.string().optional(),
      new_order_creation_filter: z.boolean().optional(),
      new_order_creation_type: TriggerType,
      new_order_creation_time: z.string(),
      new_order_creation_unit: z.string(),
      related_order_created: z.boolean(),
      related_order_cancelled: z.boolean(),
    })
    .optional(),
});