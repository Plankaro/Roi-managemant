import { z } from "zod";

const utmParameterSchema = z
  .object({
    enabled: z.boolean(),
    value: z.string().optional(), // Initially optional
  })
  .superRefine((data, ctx) => {
    if (data.enabled && (!data.value || data.value.trim().length < 1)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Value is required when enabled is true",
        path: ["value"],
      });
    }
  });


export const utmParametersSchema = z.object({
  utm_source: utmParameterSchema,
  utm_medium: utmParameterSchema,
  utm_campaign: utmParameterSchema,
  utm_id: z.boolean(),
  utm_term: z.boolean(),
});

export const advanceFiltersSchema = z.object({
  skipInactiveContacts: z
    .object({
      enabled: z.boolean(),
      days: z.coerce.number().min(1, "Days must be greater than 0").optional(),
    })
    .refine(
      (data) => !data.enabled || (data.enabled && data.days !== undefined),
      {
        message: "Days is required when enabled",
        path: ["days"],
      }
    ),

  limitMarketingMessages: z
    .object({
      enabled: z.boolean(),
      maxMessages: z.coerce
        .number()
        .min(1, "At least 1 message required")
        .optional(),
      timeRange: z.coerce
        .number()
        .min(1, "Time range must be valid")
        .optional(),
      timeUnit: z.string().min(1, "Time unit is required").optional(),
    })
    .refine(
      (data) =>
        !data.enabled ||
        (data.enabled &&
          data.maxMessages !== undefined &&
          data.timeRange !== undefined &&
          data.timeUnit !== undefined),
      {
        message: "All fields are required when enabled",
        path: ["maxMessages"], // Attach the error to one of the fields
      }
    ),

  avoidDuplicateContacts: z.object({
    enabled: z.boolean(),
  }),
});

export const scheduleSchema = z
  .object({
    schedule: z.boolean(),
    date: z.coerce.date().optional(),
    time: z
      .string()
      .min(1, "Time is required when schedule is true")
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.schedule) return true; // If `schedule` is false, no validation needed

      return data.date || data.time; // At least one of them should be provided
    },
    {
      message: "Either date or time is required when schedule is true",
      path: ["date"], // Attach error to `date`, but it applies to both fields
    }
  )
  .refine(
    (data) => {
      if (!data.schedule) return true; // If `schedule` is false, no validation needed

      return data.date && data.time; // Both date and time should be provided
    },
    {
      message: "Both date and time are required when schedule is true",
      path: ["time"], // Attach error to `time`, but applies to both
    }
  );

export const Templateschema = z
  .object({
    name: z.string().min(1, "Name is required"),
    parameter_format: z.string().min(1, "Parameter format is required"),
    components: z.array(z.any()), // Components must be an array
    language: z.string().min(1, "Language is required"),
    status: z.string().min(1, "Status is required"),
    category: z.string().min(1, "Category is required"),
    id: z.string().min(1, "ID is required"),
  })
  .nullable() // Allows null initially
  .refine((data) => data !== null, {
    message: "Object is required",
    path: [],
  });


  const headerSchema = z
  .object({
    type: z.string().min(1, "Type is required"),
    value: z.string().optional(), // Make value optional initially
    isEditable: z.boolean(),
    fromsegment: z.boolean(),
    segmentname: z.string(),
  
    segmentAltValue: z.string(),
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
      
      if (!data.segmentAltValue.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Alternative segment Value  is required",
          path: ["segmentAltValue"],
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
   
    segmentAltValue: z.string(),
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
     
      if (!data.segmentAltValue.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Alternative segment Value  is required",
          path: ["segmentAltValue"],
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
    index: z.number(),
    isEditable: z.boolean(),
    text:z.string(),
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
  });
  
  // Example usage

  

export const TemplateFormSchema = z.object({
  header: headerSchema,
  body: z.array(bodyItemSchema),
  buttons: z.array(buttonSchema),
});

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  
  template: Templateschema,
  templateForm: TemplateFormSchema,
  contact: z.any().superRefine((data, ctx) => {
    if (!data || Object.keys(data).length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Contact cannot be empty",
      
      });
    }
  }),
  utmParameters: utmParametersSchema,
  advanceFilters: advanceFiltersSchema,
  onlimitexced: z.enum(["pause", "skip"]).default("pause"),
  schedule: scheduleSchema,
  testphoneno:z.string().optional()
});


export type TemplateFormData = {
  header: {
    type: string;
    value: string;
    isEditable: boolean;
    fromsegment: boolean;
    segmentname: string;
    segmenttype: string;
    segmentAltValue: string;
  };
  body: {
    parameter_name: string;
    value: string;
    fromsegment: boolean;
    segmentname: string;
    segmenttype: string;
    segmentAltValue: string;
  }[];
  buttons: {
    type: string;
    value: string;
    isEditable: boolean;
  }[];
};
