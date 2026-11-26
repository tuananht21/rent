import mongoose from "mongoose";

const usersMigration = {

  userName: {
    type: String,
    required: [true, 'Username is required'],
    min: [3, 'Username must be at least 3 characters long'],
    max: [50, 'Username must be at most 50 characters long'],
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email format',
    }
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
    min: [8, 'Password must be at least 8 characters long'],
    max: [50, 'Password must be at most 50 characters long'],
  },

  role: {
    type: String,
    enum: ["user", "landlord", "admin"],
    default: "user",
  },

  plan: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'pricingplans',
    type: String,
    default: null,
  },

  refreshToken: {
    type: String,
    default: null,
  },

  isOnline: {
    type: Boolean,
    default: false, // 0 offline 1 online
  },

  status: {
    type: String,
    enum: ["active", "inactive", "banned"],
    default: "active",
  },

  avatar: {
    type: String,
    default: null,
  },

  isDelete: {
    type: Date,
    default: null,
  },


};


export default usersMigration;
//