import React from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const getFormValidMessage = () => {
  return "Enter valid email address & password!";
};

const getFormNotValidMessage = () => {
  return "Click to Register!";
};

const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
  const navigate = useNavigate();

  const handlePushToLoginPage = () => {
    navigate("/login");
  };

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label={"Register"}
            additionalStyles={{ marginTop: "30px" }}
            disabled={isFormValid}
            onClick={handleRegister}
          />
          <RedirectInfo
            text={"Already have an account?"}
            redirectText={"Register"}
            additionalStyles={{ marginTop: "5px" }}
            redirectHandler={handlePushToLoginPage}
          />
        </div>
      </Tooltip>
    </>
  );
};

export default RegisterPageFooter;
