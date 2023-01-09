import FriendRequest from "../models/FriendRequestModel.js";
import User from "../models/UserModel.js";

export const sendFriendRequest = async (req, res) => {
  try {
    const { sender } = req.body;
    const receiverUser = await User.findOne({ _id: req.params.id });
    const senderUser = await User.findOne({ _id: sender });
    for (let friend of receiverUser.friends) {
      if (friend === senderUser._id)
        return res.status(400).json({ msg: "Sudah Berteman" });
    }
    if (receiverUser._id === senderUser._id)
      return res.status(403).json({ msg: "Diri sendiri" });
    const request = new FriendRequest({
      sender: senderUser._id,
      receiver: receiverUser._id,
    });
    request.save();

    receiverUser.friendRequests.push(request._id);
    receiverUser.save();
    senderUser.save();
    if (!receiverUser) return res.status(404).json({ msg: "User Not Found" });
    res.status(200).json({ receiver: receiverUser, sender: senderUser });
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
      request.receiver.toString() === req.session.user_id
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
      res.status(201).json({ me: me, friend: friend });
    } else {
      return res.status(403).json({ msg: "Access Denied" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const rejectFriendRequest = async (req, res) => {
  try {
    const request = await FriendRequest.findOne({ _id: req.params.id });
    if (!request) return res.status(404).json({ msg: "Request Not Found" });
    if (request.status === "pending") {
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
      res.status(201).json({ request: request, me: me, friend: friend });
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
