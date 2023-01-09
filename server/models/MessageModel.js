import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  content: { type: String },
  from: { type: Object },
  socketid: { type: String },
  time: { type: String },
  date: { type: String },
  to: { type: String },
});

const Message = mongoose.model("Message", MessageSchema);

export default Message;
