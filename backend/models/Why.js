import mongoose from "mongoose";

const whyChooseSchema = new mongoose.Schema({
  title: String,
  desc: String,
  icon: String
});

export default mongoose.model("WhyChoose", whyChooseSchema);
