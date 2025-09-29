import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import collectionsRoutes from "./routes/collectionsRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));


// ✅ Use the new collections route
app.use("/api/collections", collectionsRoutes);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
