import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: String,
  image: String,
  slug: String,
});

export default mongoose.model("Room", roomSchema);
