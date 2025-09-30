

import WhyChoose from "../models/Why.js";


export const getWhyChooseItems = async (req, res) => {
  try {
    const data = await WhyChoose.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching why choose items:", error);
    res.status(500).json({ message: "Server error fetching data", error: error.message });
  }
};