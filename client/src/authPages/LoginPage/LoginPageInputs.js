import React from "react";
import InputWithLabel from "../../shared/components/InputWithLabel";

const LoginPageInputs = (props) => {
  return (
    <>
      <InputWithLabel
        value={props.email}
        setValue={props.setEmail}
        label="Email"
        type="text"
        placeholder="Enter your email address"
      />
      <InputWithLabel
        value={props.password}
        setValue={props.setPassword}
        label="Password"
        type="password"
        placeholder="Enter your password"
      />
    </>
  );
};

export default LoginPageInputs;
