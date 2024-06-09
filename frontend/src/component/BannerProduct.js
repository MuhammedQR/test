import React, { useEffect, useState } from "react";
import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";
import image1Mobile from "../assest/banner/img1_mobile.jpg";
import image2Mobile from "../assest/banner/img2_mobile.webp";
import image3Mobile from "../assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/banner/img4_mobile.jpg";
import image5Mobile from "../assest/banner/img5_mobile.png";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((preve) => preve + 1);
    }
  };
  const preveImage = () => {
    if (currentImage !== 0) {
      setCurrentImage((preve) => preve - 1);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="container mx-auto px-4 rounded ">
      <div className=" h-60 md:h-72 w-full bg-slate-200 relative">
        <div className=" absolute z-10 h-full w-full md:flex items-center hidden">
          <div className=" flex justify-between w-full text-2xl">
            <button
              onClick={preveImage}
              className=" bg-white  shadow-md rounded-full p-1 hover:p-2 hover:bg-red-600 hover:text-white transition-all "
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className=" bg-white  shadow-md rounded-full p-1 hover:p-2 hover:bg-red-600 hover:text-white transition-all "
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        {/* desctop and tablet version */}
        <div className=" hidden md:flex w-full h-full overflow-hidden">
          {desktopImages.map((imageUrl, index) => {
            return (
              <div
                className="w-full h-full min-h-full min-w-full transition-all"
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
                key={imageUrl}
              >
                <img src={imageUrl} className="w-full h-full" />
              </div>
            );
          })}
        </div>
        {/* mobile version */}
        <div className="flex w-full h-full overflow-hidden md:hidden">
          {mobileImages.map((imageUrl, index) => {
            return (
              <div
                className="w-full h-full min-h-full min-w-full transition-all"
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
                key={imageUrl}
              >
                <img src={imageUrl} className="w-full h-full object-cover" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
