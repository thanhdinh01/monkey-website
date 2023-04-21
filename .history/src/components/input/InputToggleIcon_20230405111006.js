import React, { useState } from "react";
import { IconEyeClose, IconEyeOpen } from "../icon";

const InputToggleIcon = ({ control }) => {
  const [toggleEye, setToggleEye] = useState(true);

  const handleToggleEye = () => {
    setToggleEye(!toggleEye);
  };
  return (
    <InputToggleIcon
      className="input"
      type={toggleEye ? "password" : "text"}
      name="password"
      control={control}
      placeholder="Please enter your password"
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
    </InputToggleIcon>
  );
};

export default InputToggleIcon;
