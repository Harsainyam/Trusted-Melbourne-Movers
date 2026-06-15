const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    movingFrom: {
      type: String,
      required: [true, 'Moving from location is required'],
      trim: true,
    },
    movingTo: {
      type: String,
      required: [true, 'Moving to location is required'],
      trim: true,
    },
    moveDate: {
      type: Date,
      required: [true, 'Move date is required'],
    },
    homeSize: {
      type: String,
      required: [true, 'Home size is required'],
      enum: ['Studio', '1 Bedroom', '2 Bedrooms', '3 Bedrooms', '4+ Bedrooms', 'Business Move'],
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'booked', 'completed', 'cancelled'],
      default: 'new',
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt automatically
  }
);

module.exports = mongoose.model('Quote', quoteSchema);