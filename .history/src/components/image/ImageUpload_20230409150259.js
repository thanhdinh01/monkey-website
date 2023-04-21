import React from "react";

const ImageUpload = ({ onChange }) => {
  return (
    <label className="w-full h-[250px] flex items-center justify-center">
      <input type="file" onChange={onChange} />
      <div className="flex items-center justify-center">
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
