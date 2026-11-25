import mongoose from "mongoose";

const reportMigration = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "User is required"],
  }, // Người gửi báo cáo

  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    default: null,
  }, // Phòng bị báo cáo

  reason: {
    type: String,
    enum: ["fake", "scam", "spam", "other"],
    required: [true, "Report reason is required"],
  }, // Lý do báo cáo

  description: {
    type: String,
    trim: true,
    default: "",
    max: [1000, "Description cannot exceed 1000 characters"],
  }, // Nội dung chi tiết

  status: {
    type: String,
    enum: ["pending", "reviewing", "resolved", "rejected"],
    default: "pending",
  }, // Trạng thái xử lý
};

export default reportMigration;
