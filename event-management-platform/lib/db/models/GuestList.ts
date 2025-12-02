import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGuestList extends Document {
  event: mongoose.Types.ObjectId;
  guest: mongoose.Types.ObjectId | null; // null if guest hasn't registered yet
  guestEmail: string;
  guestPhone?: string;
  guestName?: string;
  inviteToken: string; // Unique token for private event access
  invitedAt: Date;
  status: 'pending' | 'invited' | 'viewed' | 'responded';
  isApproved: boolean; // For events requiring approval
  createdAt: Date;
  updatedAt: Date;
}

const GuestListSchema = new Schema<IGuestList>(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    },
    guest: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    guestEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    guestPhone: {
      type: String,
      trim: true
    },
    guestName: {
      type: String,
      trim: true
    },
    inviteToken: {
      type: String,
      required: true,
      unique: true
    },
    invitedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'invited', 'viewed', 'responded'],
      default: 'pending'
    },
    isApproved: {
      type: Boolean,
      default: true // Auto-approved unless event requires manual approval
    }
  },
  {
    timestamps: true
  }
);

// Compound index - one guest per event
GuestListSchema.index({ event: 1, guestEmail: 1 }, { unique: true });
GuestListSchema.index({ inviteToken: 1 });
GuestListSchema.index({ event: 1 });

const GuestList: Model<IGuestList> = mongoose.models.GuestList || mongoose.model<IGuestList>('GuestList', GuestListSchema);

export default GuestList;
