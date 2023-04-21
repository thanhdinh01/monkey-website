import React from "react";

const ImageUpload = () => {
  return (
    <div className="w-full h-[250px] flex items-center justify-center">
      <input type="file" />
      <img
        src="../../../images/img-upload.png"
        alt=""
        className="w-full h-full"
      />
      <h3>Choose photo</h3>
    </div>
  );
};

export default ImageUpload;
