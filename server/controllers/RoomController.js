import Message from "../models/MessageModel.js";

const room = ["general", "finance", "tech", "crypto"];

export const getRoom = async (req, res) => {
  res.json(room);
};
