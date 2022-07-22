const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const chatUpdates = require("./updates/chat");

const directChatHistoryHandler = async (socket, data) => {
  try {
    const { userId } = socket.user;
    const { receiverId, content } = data;

    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverId] },
      type: "DIRECT",
    });

    if (conversation) {
      // perform update to sender and receiver if online.
      chatUpdates.updateChatHistory(conversation._id.toString(), socket.id);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = directChatHistoryHandler;
