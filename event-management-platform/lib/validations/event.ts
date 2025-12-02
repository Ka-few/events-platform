import { z } from 'zod';

export const rsvpFieldSchema = z.object({
  fieldName: z.string().min(1, 'Field name is required'),
  fieldType: z.enum(['text', 'number', 'select', 'checkbox']),
  options: z.array(z.string()).optional(),
  required: z.boolean().default(false)
});

export const venueSchema = z.object({
  name: z.string().min(1, 'Venue name is required'),
  address: z.string().min(1, 'Venue address is required'),
  coordinates: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180)
  }).optional()
});

export const dateTimeSchema = z.object({
  start: z.string().datetime(),
  end: z.string().datetime()
}).refine(
  (data) => new Date(data.end) > new Date(data.start),
  { message: 'End date must be after start date', path: ['end'] }
);

export const createEventSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title cannot exceed 200 characters')
    .trim(),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description cannot exceed 2000 characters'),
  eventType: z.enum(['wedding', 'birthday', 'fundraiser', 'conference', 'other']),
  visibility: z.enum(['public', 'private']),
  venue: venueSchema,
  dateTime: dateTimeSchema,
  coverImage: z.string().url().optional().or(z.literal('')),
  brandColors: z.object({
    primary: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color').optional(),
    secondary: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color').optional()
  }).optional(),
  rsvpFields: z.array(rsvpFieldSchema).optional(),
  guestLimit: z.number().int().positive().optional(),
  requiresApproval: z.boolean().optional()
});

export const updateEventSchema = createEventSchema.partial().extend({
  isPublished: z.boolean().optional()
});