import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  rating: Number,
  text: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Review", reviewSchema);
