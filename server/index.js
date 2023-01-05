import "./config/DataBase.js";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import UserRoute from "./routes/UserRoute.js";
import { Server } from "socket.io";

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
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("custom event", (data) => {
    console.log(data);
  });
});

app.use(express.static("public"));
app.use(express.json());
app.use(UserRoute);

httpServer.listen(PORT, () => {
  console.log("Listening To Port ", PORT);
});
