import React from "react";

const ImageUpload = ({ onChange }) => {
  return (
    <label className="w-full h-[250px] flex items-center justify-center">
      <input type="file" onChange={onChange} className="hidden" />
      <div className="flex flex-col items-center justify-center bg-gray-200">
        <img
          src="../../../images/img-upload.png"
          alt=""
          className="max-w-[80px]"
        />
        <h3>Choose photo</h3>
      </div>
    </label>
  );
};

export default ImageUpload;
