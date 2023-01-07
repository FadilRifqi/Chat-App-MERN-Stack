import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session) {
    return res.status(401).json({ msg: "Mohon Login" });
  }
  const user = await User.findOne({ _id: req.session.user_id });
  if (!user) return res.status(404).json({ msg: "User Ga Ada" });
  req.user_id = user._id;
  next();
};
