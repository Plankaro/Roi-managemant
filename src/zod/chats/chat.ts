import { z } from 'zod';
export const prospectSchema = z.object({
    name: z.string().nonempty({ message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
  });

 export const  updateProspectSchema = prospectSchema.partial()