import React, { useContext } from "react";
import { Link } from "react-router-dom";
import scrollTop from "../helpers/scrollTop";
import displayAEDCurrency from "../helpers/displayCurrency";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };
  return (
    <div className=" grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between  md:gap-4 overflow-x-scroll scrollbar-none transition-all">
      {loading
        ? loadingList.map((product, index) => {
            return (
              <div
                className=" w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow "
                onClick={scrollTop}
              >
                <div className="bg-slate-200 p-1  min-w-[280px] md:min-w-[145px] h-48 flex justify-center items-center animate-pulse"></div>
                <div className="p-4 grid gap-3">
                  <h2 className=" w-full font-medium p-1 text-base md:text-lg text-ellipsis line-clamp-1 text-black animate-pulse rounded-full bg-slate-200 py-2"></h2>
                  <p className=" w-full capitalize p-1 text-slate-500 animate-pulse rounded-full bg-slate-200 py-2"></p>
                  <div className="flex gap-3 w-full">
                    <p className=" w-full text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 py-2"></p>
                    <p className=" w-full text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 py-2"></p>
                  </div>
                  <button className="w-auto text-sm text-white px-3 mx-4 animate-pulse rounded-full bg-slate-200 py-2"></button>
                </div>
              </div>
            );
          })
        : data.map((product, index) => {
            return (
              <Link
                to={"/product/" + product?._id}
                className="w-full min-w-[280px]  md:min-w-[300px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow "
                onClick={scrollTop}
              >
                <div className="bg-slate-200  p-4 min-w-[280px] md:min-w-[145px] h-48 flex justify-center items-center ">
                  <img
                    src={product?.productImage[0]}
                    className=" object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply  "
                  />
                </div>
                <div className="p-2 grid gap-3">
                  <h2 className=" font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className=" capitalize text-slate-500">
                    {product?.category}
                  </p>
                  <div className="flex gap-3">
                    <p className=" text-green-600 font-medium">
                      {displayAEDCurrency(product?.sellingPrice)}
                    </p>
                    <p className=" text-slate-500 line-through">
                      {displayAEDCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className="text-sm bg-green-600 hover:bg-red-700 text-white px-3 py-0.5 mx-4 rounded-full"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            );
          })}
    </div>
  );
};

export default VerticalCard;
