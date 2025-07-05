import z from 'zod';

export class PhoneSchema {
  static readonly CreatePhone = z.object({
    phone: z
      .string({
        required_error: 'Phone number is required',
      })
      .min(1, 'Phone number is required')
      .max(15, 'Phone number must be less than 15 characters')
      .refine((val) => /^62\d{8,14}$/.test(val), {
        message: 'Phone number must start with 62',
      }),
  });

  static readonly UpdatePhone = z.object({
    id: z.string({
      required_error: 'ID is required',
    }),
    phone: z
      .string({
        required_error: 'Phone number is required',
      })
      .min(1, 'Phone number is required')
      .max(15, 'Phone number must be less than 15 characters')
      .refine((val) => /^62\d{8,14}$/.test(val), {
        message: 'Phone number must start with 62',
      }),
  });
}
