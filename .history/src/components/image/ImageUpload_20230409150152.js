import React from "react";

const ImageUpload = () => {
  return (
    <label className="w-full h-[250px] flex items-center justify-center">
      <input type="file" />
      <img src="../../../images/img-upload.png" alt="" className="max-w-80px" />
      <h3>Choose photo</h3>
    </label>
  );
};

export default ImageUpload;
