const serverStore = require("../serverStore");
const friends = require("./updates/friends");

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  // Update pending invitations list.
  friends.updateFriendsPendingInvitations(userDetails.userId);

  friends.updateFriends(userDetails.userId);
};

module.exports = newConnectionHandler;
