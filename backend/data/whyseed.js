import mongoose from "mongoose";
import dotenv from "dotenv";
import WhyChoose from "../models/Why.js";

dotenv.config();


const BACKEND_URL = process.env.BACKEND_URL;


const whyData = [
  {
    title: "PREMIUM QUALITY",
    desc: "Hand-Picked Materials, Tested For Durability.",
    icon: `${BACKEND_URL}/why/vertical-wood-samples-arranged-to-showcase-diverse-natural-textures-photo 1.png`
  },
  {
    title: "ELEGANT DESIGNS",
    desc: "A Perfect Blend Of Modern & Traditional.",
    icon: `${BACKEND_URL}/why/0_Pf_AVFORZGI-VSVC 1.png`
  },
  {
    title: "CUSTOMIZATION",
    desc: "Made To Fit Your Style And Space.",
    icon: `${BACKEND_URL}/why/IMG_4979-1100x738 1.png`
  },
  {
    title: "FAST DELIVERY",
    desc: "From Our Store To Your Door – Safely & Quickly.",
    icon: `${BACKEND_URL}/why/Delivering Indoor Sofa 1 1.png`
  },
  {
    title: "TRUSTED SERVICE",
    desc: "Dedicated Support At Every Step.",
    icon: `${BACKEND_URL}/why/5_ed981c48-cda6-494c-8d62-4df0e4e79046 1.png`
  }
];

const seedWhy = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    await WhyChoose.deleteMany({});
    console.log("🗑️ Old WhyChoose data cleared");

    await WhyChoose.insertMany(whyData);
    console.log("🌱 Why Choose Us data seeded successfully!");

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedWhy();
