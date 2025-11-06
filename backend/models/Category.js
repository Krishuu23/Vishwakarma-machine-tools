import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // no duplicate categories
      trim: true
    },
   
  },
  { timestamps: true } // auto adds createdAt & updatedAt
);

export default mongoose.model("Category", categorySchema);
