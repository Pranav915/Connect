import React from "react";
import { Button, Typography } from "@mui/material";
import Avatar from "../../../shared/components/Avatar";
import OnlineIndicator from "./OnlineIndicator";
import { chatTypes } from "../../../app/actions/chatActions";
import { connect } from "react-redux";
import { getActions } from "../../../app/actions/chatActions";

const FriendsListItem = ({ id, username, isOnline, setChosenChatDetails }) => {
  const handleChooseActiveConversation = () => {
    console.log("id", id);
    setChosenChatDetails({ id: id, name: username }, chatTypes.DIRECT);
  };

  return (
    <div>
      <Button
        onClick={handleChooseActiveConversation}
        style={{
          width: "100%",
          height: "42px",
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          textTransform: "none",
          color: "black",
          position: "relative",
        }}
      >
        <Avatar username={username} />
        <Typography
          sx={{
            marginLeft: "7px",
            fontWeight: "700",
            color: "#8e9297",
          }}
          variant="subtitle1"
          align="left"
        >
          {username}
        </Typography>
        {isOnline && <OnlineIndicator />}
      </Button>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(FriendsListItem);
