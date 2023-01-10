import FriendRequest from "../models/FriendRequestModel.js";
import User from "../models/UserModel.js";

export const getFriendRequest = async (req, res) => {
  try {
    const requests = await FriendRequest.find({ receiver: req.params.id });
    const senderId = [];
    const senderData = [];

    const filteredReq = requests.filter(
      (request) => request.status === "pending"
    );

    filteredReq.forEach((req) => {
      senderId.push(req.sender);
    });

    for (let i = 0; i < senderId.length; i++) {
      const user = await User.findOne({ _id: senderId[i] }).select(
        "-password -friendRequests -__v -status -newUser -friends"
      );
      if (!user) return res.status(404).json({ msg: "Not Found" });
      senderData.push({ user: user, id: filteredReq[i]._id });
    }
    res.status(200).json(senderData);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const { sender } = req.body;
    const receiverUser = await User.findOne({ _id: req.params.id });
    const senderUser = await User.findOne({ _id: sender });

    const verRequest = await FriendRequest.findOne({
      $and: [{ sender: senderUser._id }, { receiver: receiverUser._id }],
    });

    if (verRequest.status === "accepted" || "pending")
      return res.status(400).json(verRequest);

    if (receiverUser._id === senderUser._id)
      return res.status(403).json({ msg: "Diri sendiri" });
    const request = new FriendRequest({
      sender: senderUser._id,
      receiver: receiverUser._id,
    });
    request.save();

    receiverUser.friendRequests.push(request._id);
    senderUser.friendRequests.push(request._id);
    receiverUser.save();
    senderUser.save();

    res.status(201).json({ msg: "Request Terkirim" });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const request = await FriendRequest.findOne({ _id: req.params.id });
    if (!request) return res.status(404).json({ msg: "Request Not Found" });
    if (
      request.status === "pending" &&
      request.receiver.toString() == req.session.user_id
    ) {
      request.status = "accepted";
      const me = await User.findOne({ _id: request.receiver });
      const friend = await User.findOne({ _id: request.sender });
      me.friends.push(request.sender);
      friend.friends.push(request.receiver);
      friend.save();
      me.save();
      request.save();
      await User.updateOne(
        { _id: me._id },
        { $pull: { friendRequests: request._id } }
      );
      await User.updateOne(
        { _id: friend._id },
        { $pull: { friendRequests: request._id } }
      );
      res.status(201).json({ msg: "Anda Menerima Pertemanan" });
    } else {
      return res.status(403).json({ msg: "Access Denied", request: request });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const rejectFriendRequest = async (req, res) => {
  try {
    const request = await FriendRequest.findOne({ _id: req.params.id });
    if (!request) return res.status(404).json({ msg: "Request Not Found" });
    if (
      request.status === "pending" &&
      request.receiver.toString() == req.session.user_id
    ) {
      request.status = "rejected";
      request.save();
      const me = await User.findOne({ _id: request.receiver });
      const friend = await User.findOne({ _id: request.sender });

      await User.updateOne(
        { _id: me._id },
        { $pull: { friendRequests: request._id } }
      );
      await User.updateOne(
        { _id: friend._id },
        { $pull: { friendRequests: request._id } }
      );
      res.status(201).json({ msg: "Anda Menolak Pertemanan" });
    } else {
      res.status(403).json({ msg: request.receiver, me: req.session.user_id });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.session.user_id).select("friends");
    if (!user) return res.status(404).json({ msg: "User Not Found" });
    const friendData = [];
    for (let friend of user.friends) {
      const data = await User.findById(friend._id).select(
        "_id name newMessage email status friends friendRequests"
      );
      friendData.push(data);
    }
    res.status(200).json({ data: friendData });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteFriendReq = async (req, res) => {
  try {
    await FriendRequest.deleteMany({ receiver: req.params.id });
    res.status(201).json({ msg: "ok" });
  } catch (error) {
    res.status(400).json(error);
  }
};
