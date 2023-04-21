import React, { Fragment } from "react";

const ImageUpload = ({ onChange, progress, imageURL }) => {
  return (
    <label className="group relative w-full h-[250px] flex items-center justify-center cursor-pointer rounded-lg overflow-hidden">
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
        <Fragment>
          <div className="w-full h-full">
            <img src={imageURL} alt="" className="w-full h-full object-cover" />
          </div>
          <button
            type="button"
            className="icon-image w-full h-full absolute flex items-center justify-center text-red-500 bg-slate-600 bg-opacity-70 group-hover:opacity-100 group-hover:visible opacity-0 invisible transition-all"
          >
            <span className="rounded-full p-7 bg-slate-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 font-bold"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </span>
          </button>
        </Fragment>
      )}
      {progress === 100 && (
        <div
          className="progress absolute bottom-0 left-0 bg-green-400 h-1"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      )}
    </label>
  );
};

export default ImageUpload;