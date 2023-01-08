import Message from "../models/MessageModel.js";
import { Server } from "socket.io";

const room = ["general", "finance", "tech", "crypto"];

export const getRoom = async (req, res) => {
  res.json(room);
};
