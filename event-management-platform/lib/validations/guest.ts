import { z } from 'zod';

export const addGuestSchema = z.object({
  guestEmail: z.string().email('Invalid email address').toLowerCase().trim(),
  guestPhone: z.string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
  guestName: z.string().min(2).max(100).optional().or(z.literal(''))
});

export const bulkAddGuestsSchema = z.object({
  guests: z.array(addGuestSchema).min(1, 'At least one guest is required')
});