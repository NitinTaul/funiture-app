import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import collectionsRoutes from "./routes/collectionsRoutes.js";
import whyChooseRoutes from "./routes/whyChooseRoutes.js";
import roomTypesRoutes from "./routes/roomTypesRoutes.js";

 
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const __dirname = path.resolve();
// ✅ serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use('/why', express.static(path.join(__dirname, 'public/why')));
app.use('/rooms', express.static(path.join(__dirname, 'public/rooms')));


// ✅ Use the new collections route
app.use("/api/collections", collectionsRoutes);
app.use("/api/whychooseus", whyChooseRoutes);
app.use("/api/rooms", roomTypesRoutes);



// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
