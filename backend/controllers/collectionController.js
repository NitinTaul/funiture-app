// backend/controllers/collectionsController.js
import NewCollection from "../models/NewCollection.js";

// ✅ Get latest 4–6 new collection products
export const getNewCollections = async (req, res) => {
  try {
    const collections = await NewCollection.find()
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json(collections);
  } catch (error) {
    console.error("❌ Error fetching new collections:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
