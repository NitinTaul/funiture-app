// controller/roomController.js

import RoomType from "../models/RoomType.js";

export const getRoomTypes = async (req, res) => {
  try {
    const data = await RoomType.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({
      message: "Server error fetching room data",
      error: error.message,
    });
  }
};
