import mongoose from "mongoose";

const favoriteMigration = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "User is required"],
  }, // Người dùng yêu thích

  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "room",
    required: [true, "Room is required"],
  }, // Phòng được yêu thích
};

export default favoriteMigration;