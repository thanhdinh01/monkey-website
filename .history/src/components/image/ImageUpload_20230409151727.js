import React from "react";

const ImageUpload = ({ onChange, progress, imageURL }) => {
  return (
    <label className="relative w-full h-[250px] flex items-center justify-center cursor-pointer rounded-lg overflow-hidden">
      <input type="file" onChange={onChange} className="hidden" />
      {!imageURL && (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200">
          <img
            src="../../../images/img-upload.png"
            alt=""
            className="max-w-[80px]"
          />
          <h3 className="font-semibold text-lg">Choose photo</h3>
        </div>
      )}
      {imageURL && (
        <div className="w-full h-full">
          <img src={imageURL} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div
        className="progress absolute bottom-0 left-0 bg-green-400 h-1"
        style={{
          width: `${progress}%`,
        }}
      ></div>
    </label>
  );
};

export default ImageUpload;
