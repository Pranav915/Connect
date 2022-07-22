import { styled } from "@mui/system";
import React, { useEffect } from "react";
import { getDirectChatHistory } from "../../RealtimeCommunication.js/socketConnection";
import Messages from "./Messages/Messages";
import NewMessageInput from "./NewMessageInput";

const Wrapper = styled("div")({
  flexGrow: 1,
});

const MessengerContent = ({ chosenChatDetails }) => {
  useEffect(() => {
    // To fetch the chat history of chosen user.
    getDirectChatHistory({
      receiverId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);
  return (
    <Wrapper>
      <Messages />
      <NewMessageInput />
    </Wrapper>
  );
};

export default MessengerContent;
