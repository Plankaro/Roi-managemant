import { z } from 'zod';
export const prospectSchema = z.object({
    name: z.string().nonempty({ message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    is_blocked: z.boolean(),
  });

 export const  updateProspectSchema = prospectSchema.partial()



 const headerSchema = z
   .object({
     type: z.string(),
     value: z.string().optional(), // Make value optional initially
     isEditable: z.boolean(),
     
   })
   .optional()
   .superRefine((data, ctx) => {
     if (!data) return;
 
     
       // Require value only when fromsegment is false
       if (data.isEditable===true &&  data.value?.length===0 ) {
         ctx.addIssue({
           code: z.ZodIssueCode.custom,
           message: "Missing header value ",
           path: ["value"],
         });
       }
       
     
   });
   const bodyItemSchema = z
   .object({
     parameter_name: z.string().min(1, "Parameter name is required"),
     value: z.string().optional(), // Make value optional initially
    
   })
   .superRefine((data, ctx) => {
  
       // Require value only when fromsegment is false
       if (!data.value || !data.value.trim()) {
         ctx.addIssue({
           code: z.ZodIssueCode.custom,
           message: "Missing value",
           path: ["value"],
         });
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
       if (data.value.length < 1) {
         ctx.addIssue({
           path: ["value"],
           message: "Button type is required",
           code: "custom",
         });
       }
      
     }
   });
   

export const TemplateFormSchema = z.object({
  header: headerSchema,
  body: z.array(bodyItemSchema),
  buttons: z.array(buttonSchema),
});
 

export const sendTemplateSchema = z.object({
  template:z.any(),
  templateForm: TemplateFormSchema,
  
})