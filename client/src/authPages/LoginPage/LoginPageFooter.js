import React from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const getFormValidMessage = () => {
  return "Enter valid email address & password!";
};

const getFormNotValidMessage = () => {
  return "Click to log in!";
};

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
  const navigate = useNavigate();

  const handlePushToRegisterPage = () => {
    navigate("/register");
  };
  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label={"Login"}
            additionalStyles={{ marginTop: "30px" }}
            disabled={isFormValid}
            onClick={handleLogin}
            onKeyDown={handleKeyPressed}
          />
          <RedirectInfo
            text={"Need an account?"}
            redirectText={"Create an account"}
            additionalStyles={{ marginTop: "10px" }}
            redirectHandler={handlePushToRegisterPage}
          />
        </div>
      </Tooltip>
    </>
  );
};

export default LoginPageFooter;
