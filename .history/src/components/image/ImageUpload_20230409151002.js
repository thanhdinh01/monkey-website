import React from "react";

const ImageUpload = ({ onChange, progress }) => {
  return (
    <label className="relative w-full h-[250px] flex items-center justify-center cursor-pointer rounded-lg overflow-hidden">
      <input type="file" onChange={onChange} className="hidden" />
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200">
        <img
          src="../../../images/img-upload.png"
          alt=""
          className="max-w-[80px]"
        />
        <h3 className="font-semibold text-lg">Choose photo</h3>
      </div>
      <div
        className="progress absolute bottom-0 left-0 bg-green-400 h-[3px]"
        style={{
          //   width: `${progress}px`,
          width: "10px",
        }}
      ></div>
    </label>
  );
};

export default ImageUpload;
