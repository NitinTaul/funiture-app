import mongoose from "mongoose";
import dotenv from "dotenv";
import WhyChoose from "../models/Why.js";

dotenv.config();




const whyData = [
  {
    title: "PREMIUM QUALITY",
    desc: "Hand-Picked Materials, Tested For Durability.",
    icon: `why/vertical-wood-samples-arranged-to-showcase-diverse-natural-textures-photo 1.png`
  },
  {
    title: "ELEGANT DESIGNS",
    desc: "A Perfect Blend Of Modern & Traditional.",
    icon: `why/0_Pf_AVFORZGI-VSVC 1.png`
  },
  {
    title: "CUSTOMIZATION",
    desc: "Made To Fit Your Style And Space.",
    icon: `why/IMG_4979-1100x738 1.png`
  },
  {
    title: "FAST DELIVERY",
    desc: "From Our Store To Your Door – Safely & Quickly.",
    icon: `why/Delivering Indoor Sofa 1 1.png`
  },
  {
    title: "TRUSTED SERVICE",
    desc: "Dedicated Support At Every Step.",
    icon: `why/5_ed981c48-cda6-494c-8d62-4df0e4e79046 1.png`
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
