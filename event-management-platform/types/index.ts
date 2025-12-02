// ==========================================
// USER TYPES
// ==========================================
export type UserRole = 'host' | 'guest' | 'admin';

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser extends User {
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role?: UserRole;
}

// ==========================================
// EVENT TYPES
// ==========================================
export type EventType = 'wedding' | 'birthday' | 'fundraiser' | 'conference' | 'other';
export type EventVisibility = 'public' | 'private';
export type RSVPFieldType = 'text' | 'number' | 'select' | 'checkbox';
export type AttendingStatus = 'yes' | 'no' | 'maybe';
export type GuestStatus = 'pending' | 'invited' | 'viewed' | 'responded';

export interface RSVPField {
  fieldName: string;
  fieldType: RSVPFieldType;
  options?: string[];
  required: boolean;
}

export interface EventVenue {
  name: string;
  address: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface EventDateTime {
  start: string;
  end: string;
}

export interface BrandColors {
  primary: string;
  secondary: string;
}

export interface Event {
  _id: string;
  host: string | User;
  title: string;
  description: string;
  slug: string;
  eventType: EventType;
  visibility: EventVisibility;
  venue: EventVenue;
  dateTime: EventDateTime;
  coverImage?: string;
  gallery?: string[];
  brandColors?: BrandColors;
  rsvpFields: RSVPField[];
  guestLimit?: number;
  currentGuestCount: number;
  isPublished: boolean;
  requiresApproval: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventData {
  title: string;
  description: string;
  eventType: EventType;
  visibility: EventVisibility;
  venue: EventVenue;
  dateTime: EventDateTime;
  coverImage?: string;
  brandColors?: BrandColors;
  rsvpFields?: RSVPField[];
  guestLimit?: number;
  requiresApproval?: boolean;
}

export interface UpdateEventData extends Partial<CreateEventData> {
  isPublished?: boolean;
}

// ==========================================
// GUEST LIST TYPES
// ==========================================
export interface GuestListEntry {
  _id: string;
  event: string | Event;
  guest: string | User | null;
  guestEmail: string;
  guestPhone?: string;
  guestName?: string;
  inviteToken: string;
  invitedAt: string;
  status: GuestStatus;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AddGuestData {
  guestEmail: string;
  guestPhone?: string;
  guestName?: string;
}

export interface BulkAddGuestsData {
  guests: AddGuestData[];
}

// ==========================================
// RSVP TYPES
// ==========================================
export interface RSVPResponse {
  fieldName: string;
  value: string | number | boolean;
}

export interface RSVP {
  _id: string;
  event: string | Event;
  guest: string | User;
  guestList: string | GuestListEntry;
  attending: AttendingStatus;
  numberOfAttendees: number;
  responses: RSVPResponse[];
  message?: string;
  submittedAt: string;
  updatedAt: string;
  createdAt: string;
}

export interface CreateRSVPData {
  attending: AttendingStatus;
  numberOfAttendees: number;
  responses: RSVPResponse[];
  message?: string;
}

export interface UpdateRSVPData extends Partial<CreateRSVPData> {}

// ==========================================
// DASHBOARD ANALYTICS TYPES
// ==========================================
export interface RSVPStats {
  total: number;
  attending: number;
  notAttending: number;
  maybe: number;
  pending: number;
  totalAttendees: number;
}

export interface EventAnalytics {
  event: Event;
  rsvpStats: RSVPStats;
  guestListSize: number;
  responseRate: number; // percentage
  recentRSVPs: RSVP[];
}

export interface DashboardStats {
  totalEvents: number;
  upcomingEvents: number;
  totalGuests: number;
  totalRSVPs: number;
  events: Event[];
}

// ==========================================
// API RESPONSE TYPES
// ==========================================
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// ==========================================
// FORM TYPES
// ==========================================
export interface EventFormData {
  title: string;
  description: string;
  eventType: EventType;
  visibility: EventVisibility;
  venueName: string;
  venueAddress: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  coverImage?: File | string;
  primaryColor?: string;
  secondaryColor?: string;
  guestLimit?: number;
  requiresApproval?: boolean;
  rsvpFields: RSVPField[];
}

export interface RSVPFormData {
  attending: AttendingStatus;
  numberOfAttendees: number;
  message?: string;
  [key: string]: any; // For dynamic RSVP fields
}

// ==========================================
// UTILITY TYPES
// ==========================================
export interface InviteLink {
  eventId: string;
  guestEmail: string;
  inviteToken: string;
  url: string;
}

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface UploadResult {
  url: string;
  publicId: string;
}

// ==========================================
// ZUSTAND STORE TYPES
// ==========================================
export interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

export interface EventStore {
  events: Event[];
  currentEvent: Event | null;
  isLoading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
  fetchEventById: (id: string) => Promise<void>;
  createEvent: (data: CreateEventData) => Promise<Event>;
  updateEvent: (id: string, data: UpdateEventData) => Promise<Event>;
  deleteEvent: (id: string) => Promise<void>;
  setCurrentEvent: (event: Event | null) => void;
}