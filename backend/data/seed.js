import mongoose from "mongoose";
import dotenv from "dotenv";
import NewCollection from "../models/NewCollection.js";


dotenv.config();
const BACKEND_URL = process.env.BACKEND_URL;


const seedData = [
  {
    title: "4 Seater Dining Set In Antique Oak",
    subtitle: "Antique Oak Dining Set",
    image:`${BACKEND_URL}/uploads/wooden-luxury-dining-table-isolated-on-transparent-background-free-png 1.png`,
    price: 70900,
    badges: ["Deal Price"],
    colors: ["#5d4037", "#a1887f", "#000000"],
    rating: 4.3,
    slug: "4-seater-dining-set-in-antique-oak",
  },
   {
    title: "Main Hall 3 Seater Leather Sofa",
    subtitle: "Leather Sofa",
    image:`${BACKEND_URL}/uploads/gray-sofa-isolated-on-a-transparent-background-png 1.png`,
    price: 48989,
    badges: ["Deal Price"],
    colors: ["#000000", "#d32f2f", "#ffffff"],
    rating: 4.5,
    slug: "main-hall-3-seater-leather-sofa",
  },
  {
    title: "One Seater Manual Leather Recliner",
    subtitle: "Leather Recliner",
    image:` ${BACKEND_URL}/uploads/recliner-sofa-comfortable-png 1.png`,
    price: 32900,
    badges: ["Deal Price"],
    colors: ["#795548", "#000000", "#9e9e9e"],
    rating: 4.4,
    slug: "one-seater-manual-leather-recliner",
  },
  {
    title: "Queen Size Hydraulic Storage Bed",
    subtitle: "Hydraulic Storage Bed",
    image: `${BACKEND_URL}/uploads/comfortable-gray-bed-isolated-on-transparent-background-png 1.png`,
    price: 90900,
    badges: ["Deal Price"],
    colors: ["#212121", "#607d8b", "#9e9e9e"],
    rating: 4.6,
    slug: "queen-size-hydraulic-storage-bed",
  },
  
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    await NewCollection.deleteMany({});
    console.log("🗑️ Old data cleared");

    await NewCollection.insertMany(seedData);
    console.log("🌱 4 new collections seeded successfully!");

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedDB();
