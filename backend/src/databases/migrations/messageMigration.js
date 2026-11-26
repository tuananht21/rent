import mongoose from "mongoose";

const messageMigration = {
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: [true, "Chat is required"],
  }, // Cuộc trò chuyện chứa tin nhắn

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "User is required"],
  }, // Người gửi tin nhắn

  content: {
    type: String,
    default: "",
    max: [2000, "Message cannot exceed 2000 characters"],
  }, // Nội dung tin nhắn

  images: {
    type: [String],
    default: [],
  }, // Hình ảnh đính kèm

  isRead: {
    type: Boolean,
    default: false,
  }, // Trạng thái đã đọc
};

export default messageMigration;