import mongoose from "mongoose";
import validator from "validator";
import argon2 from "argon2";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `Can't be blank`],
    },
    email: {
      type: String,
      required: [true, `Can't be blank`],
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "invalid email"],
    },
    password: {
      type: String,
      required: [true, `Can't be blank`],
    },
    img: {
      type: String,
    },
    newMessage: {
      type: Object,
      default: {},
    },
    status: {
      type: String,
      default: "Online",
    },
    newUser: {
      type: Boolean,
      default: true,
    },
    friendRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FriendRequest",
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { minimize: false }
);

const User = mongoose.model("User", UserSchema);

export default User;
