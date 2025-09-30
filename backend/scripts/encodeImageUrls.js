import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// ensure backend .env is loaded even when script is run from repo root
dotenv.config({ path: path.resolve(process.cwd(), "backend/.env") });
// fallback to default lookup if needed
if (!process.env.MONGO_URI) dotenv.config();

import NewCollection from "../models/NewCollection.js";
import Product from "../models/Product.js";
import Category from "../models/category.js";
import Why from "../models/Why.js";
import RoomType from "../models/RoomType.js";

const targets = [
  { name: "newcollections", Model: NewCollection },
  { name: "products", Model: Product },
  { name: "categories", Model: Category },
  { name: "why", Model: Why },
  { name: "rooms", Model: RoomType },
];

(async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found in environment. Check backend/.env");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      // options kept for compatibility; mongoose may ignore deprecated options
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    for (const { name, Model } of targets) {
      if (!Model) {
        console.log(`[${name}] model not found — skipping`);
        continue;
      }

      const docs = await Model.find({ image: { $exists: true, $ne: null } }).lean();
      let updated = 0;

      for (const doc of docs) {
        const img = String(doc.image || "");
        if (!img) continue;

        const encoded = encodeURI(img);
        if (encoded !== img) {
          await Model.updateOne({ _id: doc._id }, { $set: { image: encoded } });
          updated++;
          console.log(`[${name}] updated ${doc._id}:`);
          console.log("  from:", img);
          console.log("  to:  ", encoded);
        }
      }

      console.log(`[${name}] done — updated ${updated} documents.`);
    }

    await mongoose.disconnect();
    console.log("Finished");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    try {
      await mongoose.disconnect();
    } catch (e) {}
    process.exit(1);
  }
})();