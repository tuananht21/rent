import mongoose from "mongoose";

const categoriesMigration = {
  name: {
    type: String,
    required: [true, "Category name is required"],
  },

  slug: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
    default: "",
  },

  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },

  isActive: {
    type: Boolean,
    default: true,
  },
};

export default categoriesMigration;