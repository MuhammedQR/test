import React from "react";
import { IoMdClose } from "react-icons/io";

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed">
      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto p-4">
        <div
          className=" w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
          onClick={onClose}
        >
          <IoMdClose />
        </div>
        <div className="flex justify-center p-4 max-w-[80vh] max-h-[80vh] ">
          <img src={imgUrl} className="w-full h-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
