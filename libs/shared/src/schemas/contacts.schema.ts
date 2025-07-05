import z from 'zod';

export class ContactsSchema {
  static readonly CreateContact = z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(1, 'Name is required')
      .max(255, 'Name cannot more than 255 characters'),
    email: z
      .string()
      .email('Invalid email format')
      .max(255, 'Email cannot more than 255 characters'),
  });

  static readonly UpdateContact = z.object({
    id: z.string({
      required_error: 'ID is required',
    }),
    name: z.string().min(1).max(255).optional(),
    email: z.string().email('Invalid email format').optional(),
  });
}
