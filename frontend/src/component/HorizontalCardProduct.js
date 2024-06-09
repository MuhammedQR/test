import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayAEDCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
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
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll custom-scroll transition-all"
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
                <div className="w-full min-w-[310px] md:min-w-[340px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex mx-auto">
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                  <div className="p-2 grid w-full gap-2">
                    <h2 className=" font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 bg-slate-200  animate-pulse rounded-full"></h2>
                    <p className=" capitalize text-slate-500 p-1 bg-slate-200  animate-pulse rounded-full"></p>
                    <div className="flex gap-3 w-full">
                      <p className=" text-green-600 font-medium p-1 bg-slate-200 w-full  animate-pulse rounded-full"></p>
                      <p className=" text-slate-500 line-through p-1 bg-slate-200 w-full  animate-pulse rounded-full"></p>
                    </div>
                    <button className="text-sm   text-white px-3 py-0.5 mx-4 rounded-full bg-slate-200  animate-pulse rounded-full "></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={"product/" + product._id}
                  className="w-full min-w-[310px] md:min-w-[340px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow  flex "
                >
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] ">
                    <img
                      src={product.productImage[0]}
                      className=" object-scale-down h-full hover:scale-110 transition-all"
                    />
                  </div>
                  <div className="p-2 grid">
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
                      className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-0.5 mx-4 rounded-full"
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

export default HorizontalCardProduct;
