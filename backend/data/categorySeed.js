import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/category.js";

dotenv.config();

const BACKEND_URL = process.env.BACKEND_URL;

const categoryData = [
  {
    name: "SOFAS",
    slug: "Where Comfort Takes Shape",
    image: `${BACKEND_URL}/category/compressed_314e97a866713cf95633c2be96376073 1.png`,
  },
  {
    name: "RECLINERS",
    slug: "Lean Back, Relax, Repeat",
    image: `${BACKEND_URL}/category/pngtree-modern-comfort-3d-stylish-recliner-chair-design-png-image_14907798 1.png`,
  },
  {
    name: "CHAIRS",
    slug: "Small Seat, Big Comfort",
    image: `${BACKEND_URL}/category/pngtree-the-pink-cushion-chair-made-with-velvet-png-image_13826492 1.png`,
  },
  {
    name: "BEDS",
    slug: "Where Dreams Begin",
    image: `${BACKEND_URL}/category/opulent-black-bed-adorned-with-luxurious-dark-bedding-and-contrasting-white-pillows-offering-a-sophisticated-bedroom-aesthetic-double-bed-on-transparent-background-front-view-ai-generated-png 1.png`,
  },
  {
    name: "WARDROBES",
    slug: "Organize With Elegance",
    image: `${BACKEND_URL}/category/modern-closet-top-view-full-length-isolate-on-transparent-background-png 1.png`,
  },
  {
    name: "DINING TABLES SETS",
    slug: "Dine In Style, Every Time",
    image: `${BACKEND_URL}/category/wooden-luxury-dining-table-isolated-on-transparent-background-free-png 2.png`,
  },
  {
    name: "TV UNITS",
    slug: "Your Screen’s Perfect Stage",
    image: `${BACKEND_URL}/category/modern-tv-stand-with-transparent-background-perfect-for-any-living-room-decor-png 1.png`,
  },
  {
    name: "OUTDOOR FURNITURE",
    slug: "Relax Outside, Naturally",
    image: `${BACKEND_URL}/category/comfortable-rattan-furniture-elegant-outdoor-seating-free-png 1.png`,
  },
  {
    name: "STUDY TABLES",
    slug: "Built For Bright Minds",
    image: `${BACKEND_URL}/category/computer-table-alpha-background-free-png 1.png`,
  },
  {
    name: "OFFICE CHAIRS",
    slug: "Work Smarter, Sit Better",
    image: `${BACKEND_URL}/category/black-office-chair-in-png 1.png`,
  },
  {
    name: "POOJA UNITS",
    slug: "Where Devotion Finds AHome",
    image: `${BACKEND_URL}/category/PT02_31428ca6-0b77-4583-a27c-e5b76a34e588 1.png`,
  },
  {
    name: "HOME DECOR",
    slug: "Complete Your Home’s Story",
    image: `${BACKEND_URL}/category/elegant-decorative-vases-and-planters-with-succulents-and-other-plants-on-transparent-background-interior-accessories-cut-out-home-decor-front-view-ai-generated-png 1.png`,
  },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    await Category.deleteMany({});
    console.log("🗑️ Old category data cleared");

    await Category.insertMany(categoryData);
    console.log("🌱 Category data seeded successfully!");

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedCategories();
