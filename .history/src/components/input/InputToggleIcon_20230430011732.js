import React, { useState } from "react";
import { IconEyeClose, IconEyeOpen } from "../icon";
import Input from "./Input";

const InputToggleIcon = ({
  control,
  placeholder = "Please enter your password",
  name = "password",
  ...props
}) => {
  const [toggleEye, setToggleEye] = useState(true);

  const handleToggleEye = () => {
    setToggleEye(!toggleEye);
  };
  return (
    <Input
      className="input"
      type={toggleEye ? "password" : "text"}
      name={name}
      control={control}
      placeholder={placeholder}
      {...props}
    >
      {toggleEye ? (
        <IconEyeOpen
          onClick={handleToggleEye}
          className="input-icon"
        ></IconEyeOpen>
      ) : (
        <IconEyeClose
          onClick={handleToggleEye}
          className="input-icon"
        ></IconEyeClose>
      )}
    </Input>
  );
};

export default InputToggleIcon;
