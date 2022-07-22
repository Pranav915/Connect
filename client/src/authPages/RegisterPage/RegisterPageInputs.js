import React from "react";
import InputWithLabel from "../../shared/components/InputWithLabel";

const RegisterPageInputs = (props) => {
  const { email, setEmail, password, setPassword, username, setUsername } =
    props;

  return (
    <>
      <InputWithLabel
        value={username}
        setValue={setUsername}
        label="Username"
        type="text"
        placeholder="Set your username"
      />
      <InputWithLabel
        value={email}
        setValue={setEmail}
        label="Email"
        type="text"
        placeholder="Enter your email address"
      />

      <InputWithLabel
        value={password}
        setValue={setPassword}
        label="Password"
        type="password"
        placeholder="Enter your password"
      />
    </>
  );
};

export default RegisterPageInputs;
