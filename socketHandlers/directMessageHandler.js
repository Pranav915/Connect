const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const chatUpdates = require("./updates/chat");

const directMessageHandler = async (socket, data) => {
  try {
    const { userId } = socket.user;
    const { receiverId, content } = data;

    // Create new message

    const message = await Message.create({
      content: content,
      author: userId,
      date: new Date(),
      type: "DIRECT",
    });

    // Find if conversation exists between these users.

    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverId] },
    });

    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();

      // perform update to sender and receiver if online.
      chatUpdates.updateChatHistory(conversation._id.toString());
    } else {
      const newConversation = await Conversation.create({
        participants: [userId, receiverId],
        messages: [message._id],
      });
      await newConversation.save();

      // perform update to sender and receiver if online.
      chatUpdates.updateChatHistory(newConversation._id.toString());
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = directMessageHandler;
