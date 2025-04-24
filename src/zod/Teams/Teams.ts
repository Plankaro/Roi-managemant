import z from "zod"
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),
    phone: z
    .string()
    .regex(
      /^(?:(?:\+[0-9]{1,3})|0)?[0-9]{10}$/,
      {
        message:
          "Please enter a valid phone number: exactly 10 digits, optionally prefixed with 0 or a +<country code>",
      }
    ),
  
  
  image: z.string().optional(),
  ManageBroadcast: z.boolean().default(true),
  manageBots: z.boolean().default(true),
  manageCampaign: z.boolean().default(true),
  assignChat: z.boolean().default(true),
});


  const updateSchema = formSchema.partial();
  
  
  export { formSchema, updateSchema};