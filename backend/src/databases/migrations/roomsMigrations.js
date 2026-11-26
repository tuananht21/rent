import mongoose from "mongoose";

const roomsMigration = {
  // tiêu đề phòng
  title: {
    type: String,
    required: [true, "Room title is required"],
    min: [5, "Title must be at least 5 characters"],
    max: [150, "Title cannot exceed 150 characters"],
  },

  // Mô tả phòng
  description: {
    type: String,
    required: [true, "Room description is required"],
    trim: true,
    max: [2000, "Description cannot exceed 2000 characters"],
  },

  // Danh mục phòng
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },

  // Người đăng phòng
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Room owner is required"],
  },

  // Giá thuê
  price: {
    type: Number,
    required: [true, "Room price is required"],
    min: [0, "Price cannot be negative"],
  },

  // Diện tích (m²)
  area: {
    type: Number,
    required: [true, "Room area is required"],
    min: [1, "Area must be greater than 0"],
  },

  // Địa chỉ phòng
  address: {
    type: String,
    required: [true, "Room address is required"],
    trim: true,
  },

  // Danh sách ảnh
  images: {
    type: [String],
    default: [],
  },

  // Tiện ích: wifi, máy lạnh, máy giặt...
  utilities: {
    type: [String],
    default: [],
  },

  // Trạng thái cho thuê
  status: {
    type: String,
    enum: ["available", "reserved", "rented", "hidden"],
    default: "available",
  },
};

export default roomsMigration;
