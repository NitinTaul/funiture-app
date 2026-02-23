// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes");


// import collectionsRoutes from "./routes/collectionsRoutes.js";
// import whyChooseRoutes from "./routes/whyChooseRoutes.js";
// import roomTypesRoutes from "./routes/roomTypesRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";

 
// import path from "path";
// import { fileURLToPath } from "url";

// connectDB();
// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());

// const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);
// const __dirname = path.resolve();
// // serve uploads folder
// app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
// app.use('/why', express.static(path.join(__dirname, 'public/why')));
// app.use('/rooms', express.static(path.join(__dirname, 'public/rooms')));
// app.use("/category", express.static(path.join(__dirname, "public/category")));


// // Use the new collections route
// app.use("/api/collections", collectionsRoutes);
// app.use("/api/whychooseus", whyChooseRoutes);
// app.use("/api/rooms", roomTypesRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/auth", authRoutes);



// //  Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// console.log("MONGO_URI:", process.env.MONGO_URI);


import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import collectionsRoutes from "./routes/collectionsRoutes.js";
import whyChooseRoutes from "./routes/whyChooseRoutes.js";
import roomTypesRoutes from "./routes/roomTypesRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

// Load env variables FIRST
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static folders
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use("/why", express.static(path.join(__dirname, "public/why")));
app.use("/rooms", express.static(path.join(__dirname, "public/rooms")));
app.use("/category", express.static(path.join(__dirname, "public/category")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/collections", collectionsRoutes);
app.use("/api/whychooseus", whyChooseRoutes);
app.use("/api/rooms", roomTypesRoutes);
app.use("/api/categories", categoryRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});