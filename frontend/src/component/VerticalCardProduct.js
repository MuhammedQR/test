import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayAEDCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";
import Context from "../context";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };
  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLift = () => {
    scrollElement.current.scrollLeft -= 300;
  };
  return (
    <div className=" container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-2">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className=" bg-white  shadow-md rounded-full p-1 hover:p-2 hover:bg-red-600 hover:text-white transition-all absolute left-0 text-lg hidden md:block"
          onClick={scrollLift}
        >
          <FaAngleLeft />
        </button>
        <button
          className=" bg-white  shadow-md rounded-full p-1 hover:p-2 hover:bg-red-600 hover:text-white transition-all absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div className="w-full min-w-[310px]  md:min-w-[340px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow ">
                  <div className="bg-slate-200 p-1 p-4 min-w-[280px] md:min-w-[145px] h-48 flex justify-center items-center animate-pulse"></div>
                  <div className="p-2 grid gap-3">
                    <h2 className=" w-full font-medium p-1 text-base md:text-lg text-ellipsis line-clamp-1 text-black animate-pulse rounded-full bg-slate-200 py-2"></h2>
                    <p className=" w-full capitalize p-1 text-slate-500 animate-pulse rounded-full bg-slate-200 py-2"></p>
                    <div className="flex gap-3 w-full">
                      <p className=" w-full text-green-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 py-2"></p>
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
                  to={"product/" + product?._id}
                  className="w-full min-w-[310px]  md:min-w-[340px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow "
                >
                  <div className="bg-slate-200  p-4 min-w-[280px] md:min-w-[145px] h-48 flex justify-center items-center ">
                    <img
                      src={product.productImage[0]}
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
                      className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-2 mx-4 rounded-full"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
