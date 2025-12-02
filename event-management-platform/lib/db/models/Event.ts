import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRSVPField {
  fieldName: string;
  fieldType: 'text' | 'number' | 'select' | 'checkbox';
  options?: string[]; // For select type
  required: boolean;
}

export interface IEvent extends Document {
  _id: mongoose.Types.ObjectId;
  host: mongoose.Types.ObjectId;
  title: string;
  description: string;
  slug: string;
  eventType: 'wedding' | 'birthday' | 'fundraiser' | 'conference' | 'other';
  visibility: 'public' | 'private';
  venue: {
    name: string;
    address: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  dateTime: {
    start: Date;
    end: Date;
  };
  coverImage?: string;
  gallery?: string[];
  brandColors?: {
    primary: string;
    secondary: string;
  };
  rsvpFields: IRSVPField[];
  guestLimit?: number;
  currentGuestCount: number;
  isPublished: boolean;
  requiresApproval: boolean; // For public events with manual approval
  createdAt: Date;
  updatedAt: Date;
}

const RSVPFieldSchema = new Schema<IRSVPField>({
  fieldName: {
    type: String,
    required: true
  },
  fieldType: {
    type: String,
    enum: ['text', 'number', 'select', 'checkbox'],
    required: true
  },
  options: [String],
  required: {
    type: Boolean,
    default: false
  }
});

const EventSchema = new Schema<IEvent>(
  {
    host: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    eventType: {
      type: String,
      enum: ['wedding', 'birthday', 'fundraiser', 'conference', 'other'],
      default: 'other'
    },
    visibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'private',
      required: true
    },
    venue: {
      name: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    dateTime: {
      start: {
        type: Date,
        required: true
      },
      end: {
        type: Date,
        required: true
      }
    },
    coverImage: {
      type: String
    },
    gallery: [String],
    brandColors: {
      primary: {
        type: String,
        default: '#000000'
      },
      secondary: {
        type: String,
        default: '#FFFFFF'
      }
    },
    rsvpFields: [RSVPFieldSchema],
    guestLimit: {
      type: Number,
      min: [1, 'Guest limit must be at least 1']
    },
    currentGuestCount: {
      type: Number,
      default: 0,
      min: 0
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    requiresApproval: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Indexes for performance
EventSchema.index({ slug: 1 });
EventSchema.index({ host: 1 });
EventSchema.index({ visibility: 1 });
EventSchema.index({ 'dateTime.start': 1 });

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;
