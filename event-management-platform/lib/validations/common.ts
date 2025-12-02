import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10)
});

export const idParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format')
});

export const slugParamSchema = z.object({
  slug: z.string().min(1, 'Slug is required')
});

// Export all schemas
// export {
//   registerSchema,
//   loginSchema,
//   updateProfileSchema,
//   changePasswordSchema,
//   createEventSchema,
//   updateEventSchema,
//   addGuestSchema,
//   bulkAddGuestsSchema,
//   createRSVPSchema,
//   updateRSVPSchema,
//   paginationSchema,
//   idParamSchema,
//   slugParamSchema
// };