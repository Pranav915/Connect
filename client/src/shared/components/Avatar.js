import { styled } from "@mui/material";
import { fontWeight } from "@mui/system";
import React from "react";

const AvatarPreview = styled("div")({
  height: "38px",
  width: "38px",
  backgroundColor: "#5465f2",
  borderRadius: "42px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
  fontWeight: "700",
  marginLeft: "5px",
  color: "white",
});

const Avatar = ({ username, large }) => {
  return (
    <AvatarPreview style={large ? { height: "80px", width: "80px" } : {}}>
      {username.substring(0, 2)}
    </AvatarPreview>
  );
};

export default Avatar;
