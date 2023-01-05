import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose.set("strictQuery", true);
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.r0psljc.mongodb.net/?retryWrites=true&w=majority`,
  (error) => {
    if (error) console.error(error);
    else console.log("Connect to MongoDB");
  }
);
