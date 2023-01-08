import User from "../models/UserModel.js";
import argon2 from "argon2";

export const logIn = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) return res.status(404).json({ msg: "Isi Username/Email" });
    if (!email) return res.status(404).json({ msg: "Isi Username/Email" });
    if (!password) return res.status(404).json({ msg: "Isi password" });
    const user = await User.findOne({
      $or: [{ name: name }, { email: email }],
    });
    if (!user) return res.status(404).json({ msg: "User Not Found" });
    const match = await argon2.verify(user.password, password);
    if (match) {
      user.status = "Online";
      user.newUser = false;
      req.session.user_id = user._id;
      req.session.email = user.email;
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
        newMessage: user.newMessage,
        newUser: user.newUser,
        img: user.img,
      });
    } else {
      res.status(403).json({ msg: "Password Tidak Cocok" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const logOut = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "tidak dapat Logout" });
    res.status(200).json({ msg: "Anda Telah Logout" });
  });
};

export const me = async (req, res) => {
  if (!req.session.user_id) {
    return res.status(401).json({ msg: "Mohon Login" });
  }
  const user = await User.findOne({
    _id: req.session.user_id,
  }).select("_id name newMessage email status");
  if (!user)
    return res.status(404).json({ msg: "User Ga Ada", user: req.session });
  res.status(200).json({ user: user, session: req.session });
};
