import { z } from 'zod';

export const rsvpResponseSchema = z.object({
  fieldName: z.string(),
  value: z.union([z.string(), z.number(), z.boolean()])
});

export const createRSVPSchema = z.object({
  attending: z.enum(['yes', 'no', 'maybe']),
  numberOfAttendees: z.number().int().min(0).default(1),
  responses: z.array(rsvpResponseSchema).optional(),
  message: z.string().max(500, 'Message cannot exceed 500 characters').optional()
});

export const updateRSVPSchema = createRSVPSchema.partial();
