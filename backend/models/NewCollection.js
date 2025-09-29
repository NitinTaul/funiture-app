import mongoose from "mongoose";

const newCollectionSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  image: String,
  price: Number,
  badges: [String],
  colors: [String],
  rating: Number,
  slug: String,
  createdAt: { type: Date, default: Date.now },
});

const NewCollection = mongoose.model("NewCollection", newCollectionSchema);
export default NewCollection;
