import "./config/DataBase.js";
import express from "express";
import cors from "cors";
import session from "express-session";
import { createServer } from "http";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
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
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: "auto",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(express.json());
app.use(express.static("public"));
app.use(UserRoute);
app.use(AuthRoute);

httpServer.listen(PORT, () => {
  console.log("Listening To Port ", PORT);
});
