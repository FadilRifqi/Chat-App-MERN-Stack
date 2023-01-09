import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select(
      "name email newMessage status password img friendRequests"
    );

    const friends = await User.findById(req.session.user_id).select(
      "friends -_id"
    );

    const friendId = friends.friends;
    const filteredUser = users.filter((user) => !friendId.includes(user._id));

    res.status(200).json(filteredUser);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select(
      "name email newMessage status img friendRequests friends"
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createUsers = async (req, res) => {
  try {
    const { name, email, password, img } = req.body;
    if (!name) return res.status(404).json({ msg: "Isi Username" });
    if (!email) return res.status(404).json({ msg: "Isi email" });
    if (!password) return res.status(404).json({ msg: "Isi password" });
    if (password.length < 8)
      return res.status(404).json({ msg: "Password Must 8 Character or More" });
    const hashPassword = await argon2.hash(password);
    const user = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      img: img,
    });
    req.session.user_id = user._id;
    req.session.email = user.email;
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      res.status(404).json({ msg: "Email Sudah Terdaftar" });
    } else if (error.errors.email) {
      res.status(400).json({ msg: error.errors.email.message });
    } else {
      res.status(400).json({ msg: "Something Went Wrong" });
    }
  }
};

export const updateUser = async (req, res) => {
  const { name, email, password, img } = req.body;
  try {
    const user = await User.findOne({ _id: req.params.id });
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: name || user.name,
        email: email || user.email,
        password: password || user.password,
        newUser: false,
        img: img,
      }
    );
    const updatedUser = await User.findOne({ _id: req.params.id }).select(
      "_id name status newMessage newUser email img"
    );
    console.log(req.body);
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    console.log(user);
    if (!user) return res.status(404).json({ msg: "User Not Found" });
    if (user.email !== req.session.email)
      return res.status(403).json({ msg: "Akses Terlarang" });
    await User.deleteOne({
      _id: req.params.id,
    });
    res.status(201).json({ msg: "Berhasil" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
