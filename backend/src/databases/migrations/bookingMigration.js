import mongoose from "mongoose";

const bookingMigration = {
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: [true, "Room is required"],
  }, // Phòng được đặt lịch xem

  renterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Renter is required"],
  }, // Người thuê phòng

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Owner is required"],
  }, // Chủ phòng

  bookingDate: {
    type: Date,
    required: [true, "Booking date is required"],
  }, // Ngày xem phòng

  bookingTime: {
    type: String,
    required: [true, "Booking time is required"],
  }, // Giờ xem phòng

  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed", "rejected"],
    default: "pending",
  }, // Trạng thái đặt lịch

  note: {
    type: String,
    trim: true,
    default: "",
    max: [500, "Note cannot exceed 500 characters"],
  }, // Ghi chú của người thuê
};

export default bookingMigration;
