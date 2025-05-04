import { z } from "zod"
import { FilterSchema } from "./fullfillment-create-campaign"
import { Templateschema } from "../broadcast/form"

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
])

const CampaignTriggerType = z.enum(["AFTER_CAMPAIGN_CREATED", "CUSTOM"])

export const DiscountType = z.enum(["PERCENTAGE", "AMOUNT"])
export const PaymentOptionType = z.enum(["PAID", "UNPAID"])
export const TriggerType = z.enum(["AFTER_EVENT", "CUSTOM"])

// export const FilterSchema = z
//   .object({
//     // Order Tags
//     is_order_tag_filter_enabled: z.boolean().default(false),
//     order_tag_filter_all: z.array(z.string()).default([]),
//     order_tag_filter_any: z.array(z.string()).default([]),
//     order_tag_filter_none: z.array(z.string()).default([]),

//     // Product Tags
//     is_product_tag_filter_enabled: z.boolean().default(false),
//     product_tag_filter_all: z.array(z.string()).default([]),
//     product_tag_filter_any: z.array(z.string()).default([]),
//     product_tag_filter_none: z.array(z.string()).default([]),

//     // Customer Tags
//     is_customer_tag_filter_enabled: z.boolean().default(false),
//     customer_tag_filter_all: z.array(z.string()).default([]),
//     customer_tag_filter_any: z.array(z.string()).default([]),
//     customer_tag_filter_none: z.array(z.string()).default([]),

//     // Payment Gateways
//     is_payment_gateway_filter_enabled: z.boolean().default(false),
//     payment_gateway_filter_any: z.array(z.string()).default([]),
//     payment_gateway_filter_none: z.array(z.string()).default([]),

//     // Payment Options
//     is_payment_option_filter_enabled: z.boolean().default(false),
//     payment_options_type: PaymentOptionType.optional().nullable(),

//     // Unsubscribed Customers
//     is_send_to_unsub_customer_filter_enabled: z.boolean().default(false),
//     send_to_unsub_customer: z.boolean().optional().nullable(),

//     // Order Amount
//     is_order_amount_filter_enabled: z.boolean().default(false),
//     order_amount_filter_type: z.enum(["greater", "less", "custom"]).optional().nullable(),
//     order_amount_filter_greater_or_equal: z.number().optional().nullable(),
//     order_amount_filter_less_or_equal: z.number().optional().nullable(),
//     order_amount_min: z.number().optional().nullable(),
//     order_amount_max: z.number().optional().nullable(),

//     // Discount Amount
//     is_discount_amount_filter_enabled: z.boolean().default(false),
//     discount_amount_filter_type: z.enum(["greater", "less", "custom"]).optional().nullable(),
//     discount_amount_filter_greater_or_equal: z.number().optional().nullable(),
//     discount_amount_filter_less_or_equal: z.number().optional().nullable(),
//     discount_amount_min: z.number().optional().nullable(),
//     discount_amount_max: z.number().optional().nullable(),

//     // Discount Codes
//     is_discount_code_filter_enabled: z.boolean().default(false),
//     discount_code_filter_any: z.array(z.string()).default([]),
//     discount_code_filter_none: z.array(z.string()).default([]),

//     // Order Count
//     is_order_count_filter_enabled: z.boolean().default(false),
//     order_count_filter_type: z.enum(["greater", "less", "custom"]).optional().nullable(),
//     order_count_greater_or_equal: z.number().optional().nullable(),
//     order_count_less_or_equal: z.number().optional().nullable(),
//     order_count_min: z.number().optional().nullable(),
//     order_count_max: z.number().optional().nullable(),

//     // Order Delivery
//     is_order_delivery_filter_enabled: z.boolean().default(false),
//     order_method: z.string().optional().nullable(),
//   })
//   .superRefine((data, ctx) => {
//     // Order Tags
//     if (
//       data.is_order_tag_filter_enabled &&
//       isEmpty(data.order_tag_filter_all) &&
//       isEmpty(data.order_tag_filter_any) &&
//       isEmpty(data.order_tag_filter_none)
//     ) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["is_order_tag_filter_enabled"],
//         message: "At least one order tag filter must be provided ",
//       })
//     }

//     // Product Tags
//     if (
//       data.is_product_tag_filter_enabled &&
//       isEmpty(data.product_tag_filter_all) &&
//       isEmpty(data.product_tag_filter_any) &&
//       isEmpty(data.product_tag_filter_none)
//     ) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["is_product_tag_filter_enabled"],
//         message: "At least one product tag filter must be provided ",
//       })
//     }

//     // Customer Tags
//     if (
//       data.is_customer_tag_filter_enabled &&
//       isEmpty(data.customer_tag_filter_all) &&
//       isEmpty(data.customer_tag_filter_any) &&
//       isEmpty(data.customer_tag_filter_none)
//     ) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["is_customer_tag_filter_enabled"],
//         message: "At least one customer tag filter must be provided",
//       })
//     }

//     // Payment Gateways
//     if (
//       data.is_payment_gateway_filter_enabled &&
//       isEmpty(data.payment_gateway_filter_any) &&
//       isEmpty(data.payment_gateway_filter_none)
//     ) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["is_payment_gateway_filter_enabled"],
//         message: "At least one payment gateway filter must be provided ",
//       })
//     }

//     // Payment Options: (Optional - only if you require a value when enabled)
//     // Uncomment and adjust if needed:
//     if (data.is_payment_option_filter_enabled && isEmpty(data.payment_options_type)) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["is_payment_option_filter_enabled"],
//         message: "Payment option type must be provided ",
//       })
//     }

//     // Unsubscribed Customers: (Optional - only if you require a value when enabled)
//     if (data.is_send_to_unsub_customer_filter_enabled && isEmpty(data.send_to_unsub_customer)) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["is_send_to_unsub_customer_filter_enabled"],
//         message: "Unsubscribed customer value must be provided ",
//       })
//     }

//     // Order Amount
//     if (data.is_order_amount_filter_enabled) {
//       if (isEmpty(data.order_amount_filter_type)) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["is_order_amount_filter_enabled"],
//           message: "Order amount filter type must be provided ",
//         })
//       } else if (data.order_amount_filter_type === "greater" && data.order_amount_filter_greater_or_equal === null) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["is_order_amount_filter_enabled"],
//           message: "Value for 'greater or equal' must be provided.",
//         })
//       } else if (data.order_amount_filter_type === "less" && data.order_amount_filter_less_or_equal === null) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["is_order_amount_filter_enabled"],
//           message: "Value for 'less or equal' must be provided ",
//         })
//       } else if (
//         data.order_amount_filter_type === "custom" &&
//         (data.order_amount_min === null || data.order_amount_max === null)
//       ) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["is_order_amount_filter_enabled"],
//           message: "Both minimum and maximum values must be provided",
//         })
//       }
//     }

//     // Discount Amount
//     if (data.is_discount_amount_filter_enabled) {
//       if (isEmpty(data.discount_amount_filter_type)) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["is_discount_amount_filter_enabled"],
//           message: "Discount amount filter type must be provided",
//         })
//       } else if (
//         data.discount_amount_filter_type === "greater" &&
//         data.discount_amount_filter_greater_or_equal === null
//       ) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["is_discount_amount_filter_enabled"],
//           message: "Value for 'greater or equal' must be provided",
//         })
//       } else if (data.discount_amount_filter_type === "less" && data.discount_amount_filter_less_or_equal === null) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["is_discount_amount_filter_enabled"],
//           message: "Value for 'less or equal' must be provided",
//         })
//       } else if (
//         data.discount_amount_filter_type === "custom" &&
//         (data.discount_amount_min === null || data.discount_amount_max === null)
//       ) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["is_discount_amount_filter_enabled"],
//           message: "Both minimum and maximum values must be provided ",
//         })
//       }
//     }

//     // Discount Codes
//     if (
//       data.is_discount_code_filter_enabled &&
//       isEmpty(data.discount_code_filter_any) &&
//       isEmpty(data.discount_code_filter_none)
//     ) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["is_discount_code_filter_enabled"],
//         message: "At least one discount code filter must be provided",
//       })
//     }

//     // Order Count
//     if (data.is_order_count_filter_enabled) {
//       if (isEmpty(data.order_count_filter_type)) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["is_order_count_filter_enabled"],
//           message: "Order count filter type must be provided ",
//         })
//       } else if (data.order_count_filter_type === "greater" && data.order_count_greater_or_equal === null) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["is_order_count_filter_enabled"],
//           message: "Value for 'greater or equal' must be provided when filter type is 'greater'.",
//         })
//       } else if (data.order_count_filter_type === "less" && data.order_count_less_or_equal === null) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["is_order_count_filter_enabled"],
//           message: "Value for 'less or equal' must be provided when filter type is 'less'.",
//         })
//       } else if (
//         data.order_count_filter_type === "custom" &&
//         (data.order_count_min === null || data.order_count_max === null)
//       ) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           path: ["is_order_count_filter_enabled"],
//           message: "Both minimum and maximum values must be provided when filter type is 'custom'.",
//         })
//       }
//     }

//     // Order Delivery
//     if (data.is_order_delivery_filter_enabled && isEmpty(data.order_method)) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["is_order_delivery_filter_enabled"],
//         message: "Order delivery status must be provided when order delivery filter is enabled.",
//       })
//     }
//   })

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
    if (!data) return

    if (data.fromsegment) {
      if (!data.segmentname.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Segement name is required",
          path: ["segmentname"],
        })
      }
    } else {
      // Require value only when fromsegment is false
      if (!data.value || !data.value.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Missing header value ",
          path: ["value"],
        })
      }
    }
  })
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
        })
      }
    } else {
      // Require value only when fromsegment is false
      if (!data.value || !data.value.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Missing value",
          path: ["value"],
        })
      }
    }
  })

const isEmptyString = (str: string) => !str.trim()

export const buttonSchema = z
  .object({
    type: z.string(),
    value: z.string(),
    isEditable: z.boolean(),
    text: z.string(),
    fromsegment: z.boolean(),
    segmentname: z.string(),
  })
  .superRefine((data, ctx) => {
    // Only require type and value if the button is editable
    if (data.isEditable && !data.fromsegment) {
      if (data.type.length < 1) {
        ctx.addIssue({
          path: ["type"],
          message: "Button type is required",
          code: z.ZodIssueCode.custom,
        })
      }
      if (data.value.length < 1 || isEmptyString(data.value)) {
        ctx.addIssue({
          path: ["value"],
          message: "Button value is required",
          code: z.ZodIssueCode.custom,
        })
      }
    }
    // If fromsegment is true, require a non-empty segmentname
    if (data.fromsegment) {
      if (isEmptyString(data.segmentname)) {
        ctx.addIssue({
          path: ["segmentname"],
          message: "Segment Name is required",
          code: z.ZodIssueCode.custom,
        })
      }
    } else if (data.isEditable) {
      // When fromsegment is false and the button is editable,
      // ensure value is provided (redundant if already checked above, but added for clarity)
      if (isEmptyString(data.value)) {
        ctx.addIssue({
          path: ["value"],
          message: "Missing value",
          code: z.ZodIssueCode.custom,
        })
      }
    }
  })
// Example usage

export const TemplateFormSchema = z.object({
  header: headerSchema,
  body: z.array(bodyItemSchema),
  buttons: z.array(buttonSchema),
})

const TimeSchema = z.object({
  time: z.number(),
  unit: z.enum(["minutes", "hours", "days"]),
})

export const CampaignSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    reply_action: z.enum(["transfer", "welcome-bot"]),
    filter: FilterSchema,
    type: z.enum(["promotional", "utility"]),
    templateForm: TemplateFormSchema,
    template: Templateschema,
    trigger_type: CampaignTriggerType,
    trigger_time: TimeSchema.optional(),
    
   
    filter_condition_match: z.boolean(),
    new_checkout_abandonment_filter: z.boolean(),
    new_checkout_abandonment_type: TriggerType,
    new_checkout_abandonment_time: TimeSchema.optional(),
    new_order_creation_filter: z.boolean(),
    new_order_creation_type: TriggerType,
    new_order_creation_time: TimeSchema.optional(),
    related_order_fulfilled: z.boolean(),
    related_order_cancelled: z.boolean(),
  })
  .superRefine((data, ctx) => {
   
    

    // Validate new_order_creation fields:
    if (data.new_order_creation_filter === true) {
      if (data.new_order_creation_type == null) {
        ctx.addIssue({
          path: ["new_order_creation_type"],
          message: "New order creation type is required when filter is enabled.",
          code: "custom",
        })
      } else if (data.new_order_creation_type === "CUSTOM") {
        // Check if new_order_creation_time exists
        if (!data.new_order_creation_time) {
          ctx.addIssue({
            path: ["new_order_creation_time"],
            message: "New order creation time (with time and unit) is required when type is 'CUSTOM'.",
            code: "custom",
          })
        } else {
          // Validate each field inside the time object separately
          if (!data.new_order_creation_time.unit) {
            ctx.addIssue({
              path: ["new_order_creation_time", "unit"],
              message: "New order creation time unit is required when type is 'CUSTOM'.",
              code: "custom",
            })
          }
          if (data.new_order_creation_time.time == null) {
            ctx.addIssue({
              path: ["new_order_creation_time", "time"],
              message: "New order creation time value is required when type is 'CUSTOM'.",
              code: "custom",
            })
          }
        }
      }
    }

    // Validate new_checkout_abandonment fields:
    if (data.new_checkout_abandonment_filter === true) {
      if (data.new_checkout_abandonment_type == null) {
        ctx.addIssue({
          path: ["new_checkout_abandonment_type"],
          message: "New checkout abandonment type is required when filter is enabled.",
          code: "custom",
        })
      } else if (data.new_checkout_abandonment_type === "CUSTOM") {
        // Check if new_checkout_abandonment_time exists
        if (!data.new_checkout_abandonment_time) {
          ctx.addIssue({
            path: ["new_checkout_abandonment_time"],
            message: "New checkout abandonment time (with time and unit) is required when type is 'CUSTOM'.",
            code: "custom",
          })
        } else {
          // Validate each field inside the time object separately
          if (!data.new_checkout_abandonment_time.unit) {
            ctx.addIssue({
              path: ["new_checkout_abandonment_time", "unit"],
              message: "New checkout abandonment time unit is required when type is 'CUSTOM'.",
              code: "custom",
            })
          }
          if (data.new_checkout_abandonment_time.time == null) {
            ctx.addIssue({
              path: ["new_checkout_abandonment_time", "time"],
              message: "New checkout abandonment time value is required when type is 'CUSTOM'.",
              code: "custom",
            })
          }
        }
      }
    }
  })

