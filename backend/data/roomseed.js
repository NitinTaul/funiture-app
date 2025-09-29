import mongoose from "mongoose";
import dotenv from "dotenv";
import Room from "../models/RoomType.js";

dotenv.config();

const BACKEND_URL = process.env.BACKEND_URL;

const roomData = [
  {
    name: "Living Room",
    slug: "Where Conversations Flow",
    image: `${BACKEND_URL}/rooms/8-Living-Room-Furniture-Ideas-for-Your-New-Home 1.png`,
  },
  {
    name: "Bed Room",
    slug: "Where Comfort Meets Style",
    image: `${BACKEND_URL}/rooms/B4350_8aee5560-621a-4527-b5cb-b66c3bf95c9e 1.png`,
  },
  {
    name: "Dining Room",
    slug: "where Every Meal Becomes a Memory",
    image: `${BACKEND_URL}/rooms/hq720 1.png`,
  },
  {
    name: "Office Furniture",
    slug: "Designed For Work,Built For Comfort",
    image: `${BACKEND_URL}/rooms/Untitled_design_4_03094fa7-ecb9-49c6-9fec-533c3ed17b5a_930x 1.png`,
  },
  {
    name: "Outdoor Furniture",
    slug: "Breathe Fresh,Sir Fresh",
    image: `${BACKEND_URL}/rooms/collection_outdoor_furniture_1bbf079f-4252-49f2-8be8-39b6310e76ae 1.png`,
  },
  {
    name: "Decor & Accessories",
    slug: "The Finishing Touches of Home",
    image: `${BACKEND_URL}/rooms/32 1.png`,
  },
];

const seedRooms = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    await Room.deleteMany({});
    console.log("🗑️ Old Room data cleared");

    await Room.insertMany(roomData);
    console.log("🌱 Room data seeded successfully!");

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedRooms();
