const User = require("../../models/User");
const FriendInvitation = require("../../models/FriendInvitation");
const friends = require("../../socketHandlers/updates/friends");

const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body;

  const { userId, email } = req.user;

  if (email.toLowerCase() === targetMailAddress.toLowerCase()) {
    return res
      .status(409)
      .send("Sorry, you cannot send invitation to yourself.");
  }

  const targetUser = await User.findOne({
    email: targetMailAddress.toLowerCase(),
  });

  if (!targetUser) {
    return res
      .status(404)
      .send("User not found. Please check the email address.");
  }

  // Check if invitation has been already sent.
  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });

  if (invitationAlreadyReceived) {
    return res.status(409).send("Invitation has been already sent!");
  }

  // Check if user which we would like to invite is already our friend.

  const userAlreadyFriend = await targetUser.friends.find(
    (friendId) => friendId.toString() === userId.toString()
  );

  if (userAlreadyFriend) {
    return res
      .status(409)
      .send("Friend already added. Please check your friends list");
  }

  // Create new invitation and save in database.

  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  // If invitation successfully created. Update friends invitation if other user is online
  // Send pending invitations update to specific user.
  console.log(userId);
  friends.updateFriendsPendingInvitations(targetUser._id.toString());
  console.log(targetUser._id.toString());

  return res.status(201).send("Invitation has been sent.");
};

module.exports = postInvite;
