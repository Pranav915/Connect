const User = require("../../models/User");
const FriendInvitation = require("../../models/FriendInvitation");
const serverStore = require("../../serverStore");

const updateFriendsPendingInvitations = async (userId) => {
  try {
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate("senderId", "_id username email");

    // All active connections of this userId.
    const receiverList = serverStore.getActiveConnections(userId);
    // console.log(receiverList);

    const io = serverStore.getSocketServerInstance();

    receiverList.forEach((receiverSocketId) => {
      // Emitting event
      io.to(receiverSocketId).emit("friends-invitations", {
        pendingInvitations: pendingInvitations ? pendingInvitations : [],
      });
    });
  } catch (error) {
    console.log("error", error);
  }
};

const updateFriends = async (userId) => {
  try {
    // Active connections
    const receiverList = serverStore.getActiveConnections(userId);

    if (receiverList.length > 0) {
      const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
        "friends",
        "_id username email"
      );

      if (user) {
        const friendsList = user.friends.map((f) => {
          return {
            id: f._id,
            email: f.email,
            username: f.username,
          };
        });

        const io = serverStore.getSocketServerInstance();
        receiverList.forEach((receiverSocketId) => {
          io.to(receiverSocketId).emit("friends-list", {
            friends: friendsList ? friendsList : [],
          });
        });
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = { updateFriendsPendingInvitations, updateFriends };
