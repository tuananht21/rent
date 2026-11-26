import mongoose from "mongoose";

const reviewMigration = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  }, // Người đánh giá

  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: [true, "Room is required"],
  }, // Phòng được đánh giá

  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"],
  }, // Điểm đánh giá (1-5 sao)

  comment: {
    type: String,
    trim: true,
    default: "",
    max: [1000, "Comment cannot exceed 1000 characters"],
  }, // Nội dung nhận xét
};

export default reviewMigration;
