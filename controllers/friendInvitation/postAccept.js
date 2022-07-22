const FriendInvitation = require("../../models/FriendInvitation");
const User = require("../../models/User");
const {
  updateFriendsPendingInvitations,
  updateFriends,
} = require("../../socketHandlers/updates/friends");

const postAccept = async (req, res) => {
  try {
    const { id } = req.body;
    const invitation = await FriendInvitation.findById(id);

    if (!invitation) {
      return res.status(401).send("Error Occured. Please try again.");
    }

    // Add friends to both users.
    const { senderId, receiverId } = invitation;
    const sender = await User.findById(senderId);
    sender.friends = [...sender.friends, receiverId];

    const receiver = await User.findById(receiverId);
    receiver.friends = [...receiver.friends, senderId];

    await sender.save();
    await receiver.save();

    // Delete the invitation
    await FriendInvitation.findByIdAndDelete(id);

    // Update friends list if users are online.
    updateFriends(receiverId.toString());
    updateFriends(senderId.toString());

    updateFriendsPendingInvitations(receiverId.toString());

    return res.status(200).send("Friend request accepted");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong! Please try again.");
  }
};

module.exports = postAccept;
