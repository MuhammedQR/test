/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import UploadProduct from "../component/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../component/AdminProductCard";

function AllProducts() {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);
  return (
    <>
      <div className="bg-white py-2 px-2 flex justify-between items-center">
        <h2 className="font-bold text-lg">Products</h2>
        <button
          className=" border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white  transition-all py-1 px-2 rounded-full"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* All Product */}
      <div className="flex items-center gap-5 py-4 flex-wrap h-[calc(100vh-190px)] overflow-y-scroll">
        {allProduct.map((product, index) => {
          return (
            <AdminProductCard
              data={product}
              key={index + "allProduct"}
              fetchData={fetchAllProduct}
            />
          );
        })}
      </div>

      {/* Upload Product component */}

      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </>
  );
}

export default AllProducts;
