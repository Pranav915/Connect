const FriendInvitation = require("../../models/FriendInvitation");
const {
  updateFriendsPendingInvitations,
} = require("../../socketHandlers/updates/friends");

const postReject = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;

    // Delete the invitation from collection.
    const invitationExists = await FriendInvitation.exists({ _id: id });

    if (invitationExists) {
      await FriendInvitation.findByIdAndDelete(id);
    }

    await updateFriendsPendingInvitations(userId);

    return res.status(200).send("Invitation successfully rejected");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong! Please try again.");
  }
};

module.exports = postReject;
