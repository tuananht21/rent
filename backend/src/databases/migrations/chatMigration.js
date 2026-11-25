import mongoose from "mongoose";

const chatMigration = {
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    default: null,
  }, // Phòng liên quan đến cuộc trò chuyện

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ], // Danh sách thành viên tham gia

  lastMessage: {
    type: String,
    default: "",
  }, // Tin nhắn cuối cùng

  lastMessageAt: {
    type: Date,
    default: null,
  }, // Thời gian tin nhắn cuối cùng
};

export default chatMigration;