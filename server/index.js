import "./config/DataBase.js";
import express from "express";
import cors from "cors";
import session from "express-session";
import { createServer } from "http";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import { Server } from "socket.io";
import User from "./models/UserModel.js";
import mongoose from "mongoose";
const rooms = ["general", "finance", "tech", "crypto"];
import MongoStore from "connect-mongo";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

const PORT = 5000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get("/rooms", (req, res) => {
  res.json(rooms);
});

const getLastMessageFromRoom = async (room) => {
  let roomMessages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } },
  ]);
  return roomMessages;
};

const sortRoomMessagesByDate = (messages) => {
  return messages.sort((a, b) => {
    let date1 = a._id.split("/");
    let date2 = n._id.split("/");

    date1 = date1[2] + date1[0] + date1[1];
    date2 = date2[2] + date2[0] + date2[1];

    return date1 < date2 ? -1 : 1;
  });
};

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("new-user", async () => {
    const members = await User.find().select(
      "_id name email status newMessage"
    );
    io.emit("new-user", members);
  });

  socket.on("join-room", async (room) => {
    socket.join(room);
    let roomMessages = await getLastMessageFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit("room-messages", roomMessages);
  });

  socket.on("custom event", (data) => {
    console.log(data);
  });
});
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      dbName: process.env.DB_USER,
      collectionName: "sessions",
      stringify: false,
      autoRemove: "interval",
      autoRemoveInterval: 1,
    }),
  })
);
app.use(express.json());
app.use(express.static("public"));
app.use(UserRoute);
app.use(AuthRoute);

httpServer.listen(PORT, () => {
  console.log("Listening To Port ", PORT);
});
