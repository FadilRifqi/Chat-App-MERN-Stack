import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createUsers = async (req, res) => {
  try {
    const { name, email, password, img } = req.body;
    await User.create({
      name: name,
      email: email,
      password: password,
      img: img,
    });
    console.log(req.body);
    res.status(201).json({ msg: "Berhasil" });
  } catch (error) {
    res.status(400).json(error.message);
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
        img: img,
      }
    );
    console.log(req.body);
    res.status(201).json({ msg: "Berhasil" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({
      _id: req.params.id,
    });
    res.status(201).json({ msg: "Berhasil" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
