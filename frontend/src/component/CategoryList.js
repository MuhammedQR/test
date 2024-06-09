import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";
import productCategory from "../helpers/productCategory";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const DataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(DataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);
  return (
    <div className=" mx-auto p-4  bg-[rgb(18,35,45)] border-y-2 text-white ">
      <div className="flex items-center justify-between gap-4 overflow-scroll scrollbar-none ">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div
                  className="h-16 -w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse "
                  key={"categoryLoading" + index}
                ></div>
              );
            })
          : categoryProduct.map((product, index) => {
              return (
                <Link
                  to={"/product-category/?category=" + product?.category}
                  className=" cursor-pointer hover:text-green-600 "
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200  p-3 flex justify-center items-center">
                    <img
                      src={product?.productImage[0]}
                      alt={product?.category}
                      className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all "
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize my-1 ">
                    {product?.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
