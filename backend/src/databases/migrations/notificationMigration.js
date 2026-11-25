import mongoose from "mongoose";

const notificationMigration = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "User is required"],
  }, // Người nhận thông báo

  title: {
    type: String,
    required: [true, "Notification title is required"],
    trim: true,
    max: [100, "Title cannot exceed 100 characters"],
  }, // Tiêu đề thông báo

  content: {
    type: String,
    required: [true, "Notification content is required"],
    trim: true,
    maxlength: [500, "Content cannot exceed 500 characters"],
  }, // Nội dung thông báo

  type: {
    type: String,
    enum: ["booking", "message", "room", "system"],
    required: [true, "Notification type is required"],
  }, // Loại thông báo

  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  }, // ID đối tượng liên quan

  isRead: {
    type: Boolean,
    default: false,
  }, // Trạng thái đã đọc
};

export default notificationMigration;