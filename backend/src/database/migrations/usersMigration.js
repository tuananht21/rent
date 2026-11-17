import mongoose from 'mongoose';

const usersMigration = {

  userName: { 
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    min: [3, 'Username must be at least 3 characters'],
    max: [50, 'Username must not exceed 50 characters'],
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'],
  },

  phone: {
    type: String,
    default: null,
    min: [10, 'Phone number must be at least 10 characters long'],
    max: [10, 'Phone number must be at most 10 characters long'],
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
    min: [6, 'Password must be at least 6 characters'],
  },

  avatar: {
    type: String,
    default: null,
  },

  role: {
    type: String,
    enum: ['user', 'landlord', 'admin'],
    default: 'user',
  },

  googleId: {
    type: String,
    default: null,
  },

  provider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local',
  },

  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  isOnline: {
    type: Boolean,
    default: false,
  },

  status: {
    type: String,
    enum: ['active', 'inactive', 'banned'],
    default: 'active',
  },

  lastLoginAt: {
    type: Date,
    default: null,
  },

  deletedAt: {
    type: Date,
    default: null,
  },
};

export default usersMigration;
