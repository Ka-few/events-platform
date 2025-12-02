import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRSVPResponse {
  fieldName: string;
  value: string | number | boolean;
}

export interface IRSVP extends Document {
  _id: mongoose.Types.ObjectId;
  event: mongoose.Types.ObjectId;
  guest: mongoose.Types.ObjectId;
  guestList: mongoose.Types.ObjectId; // Reference to GuestList entry
  attending: 'yes' | 'no' | 'maybe';
  numberOfAttendees: number;
  responses: IRSVPResponse[]; // Dynamic RSVP field responses
  message?: string; // Optional message from guest
  submittedAt: Date;
  updatedAt: Date;
  createdAt: Date;
}

const RSVPResponseSchema = new Schema<IRSVPResponse>({
  fieldName: {
    type: String,
    required: true
  },
  value: {
    type: Schema.Types.Mixed,
    required: true
  }
});

const RSVPSchema = new Schema<IRSVP>(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    },
    guest: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    guestList: {
      type: Schema.Types.ObjectId,
      ref: 'GuestList',
      required: true
    },
    attending: {
      type: String,
      enum: ['yes', 'no', 'maybe'],
      required: true
    },
    numberOfAttendees: {
      type: Number,
      default: 1,
      min: [0, 'Number of attendees cannot be negative']
    },
    responses: [RSVPResponseSchema],
    message: {
      type: String,
      maxlength: [500, 'Message cannot exceed 500 characters']
    },
    submittedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Compound index - one RSVP per guest per event
RSVPSchema.index({ event: 1, guest: 1 }, { unique: true });
RSVPSchema.index({ event: 1 });
RSVPSchema.index({ guest: 1 });

const RSVP: Model<IRSVP> = mongoose.models.RSVP || mongoose.model<IRSVP>('RSVP', RSVPSchema);

export default RSVP;