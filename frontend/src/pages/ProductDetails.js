import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayAEDCurrency from "../helpers/displayCurrency";
import CategoryWiseProductDisplay from "../component/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const params = useParams();
  const [loding, setLoding] = useState(false);
  const productImageListLoding = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImagecoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setLoding(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoding(false);
    const dataResponse = await response.json();
    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImage[0]);
  };
  console.log(data);
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    scrollToTop();
    fetchProductDetails();
  }, [params]);
  const handelMouseEnterProduct = (imgUrl) => {
    setActiveImage(imgUrl);
  };
  const handelZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomImageCoordinate({
        x,
        y,
      });
    },

    [zoomImagecoordinate]
  );
  const handelLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-200px  flex flex-col lg:flex-row gap-4 ">
        {/* product Image */}
        <div className="h-96 flex  flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] flex justify-center  lg:h-96 lg:w-96 bg-slate-200 relative p-2 ">
            <img
              src={activeImage}
              className="h-full w-full object-contain mix-blend-multiply"
              onMouseMove={handelZoomImage}
              onMouseLeave={handelLeaveImageZoom}
            />
            {/* product zoom */}
            {zoomImage && (
              <div className=" hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500] mix-blend-multiply scale-125"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImagecoordinate.x * 100}% ${
                      zoomImagecoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {loding ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none">
                {productImageListLoding.map((el, index) => {
                  return (
                    <div
                      className="w-20 h-20 bg-slate-200 rounded"
                      key={"lodingImage" + index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none">
                {data?.productImage?.map((imgUrl, index) => {
                  return (
                    <div
                      className="w-20 h-20 bg-slate-200 rounded p-1"
                      key={imgUrl}
                    >
                      <img
                        src={imgUrl}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handelMouseEnterProduct(imgUrl)}
                        onClick={() => handelMouseEnterProduct(imgUrl)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* product Details */}
        {loding ? (
          <div className=" grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block "></p>
            <h2 className="text-2xl lg:text-4xl font-medium  h-6 lg:h-8 w-full rounded-full animate-pulse bg-slate-200"></h2>
            <p className=" capitalize text-slate-400 bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full">
              {" "}
            </p>
            <div className=" text-yellow-400 flex items-center gap-1 bg-slate-200 animate-pulse h-6 w-full lg:h-8 rounded-full"></div>
            <div className="flex items-center gap-2 text-2xl font-medium my-1">
              <p className="text-green-600 bg-slate-200 animate-pulse h-6 w-full lg:h-8 "></p>
              <p className="text-slate-400 line-through bg-slate-200 animate-pulse h-6 w-full lg:h-8"></p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button className=" border-2 bg-slate-200 animate-pulse h-6 lg:h-8 rounded px-3 py-1 min-w-[120px] text-green-600 font-medium "></button>
              <button className=" border-2 bg-slate-200 animate-pulse h-6 w--full lg:h-8 rounded px-3 py-1 min-w-[120px] font-medium text-white "></button>
            </div>
            <div className="w-full">
              <p className="text-slate-900 font-medium my-1  animate-pulse bg-slate-200 h-10 "></p>
              <p className="bg-slate-200 rounded animate-pulse h-10 lg:h-12 w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-green-200 text-green-600  px-2 rounded-full inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data?.productName}
            </h2>
            <p className=" capitalize text-slate-400"> {data?.category}</p>
            <div className=" text-yellow-400 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-2 text-2xl font-medium my-1">
              <p className="text-green-600">
                {" "}
                {displayAEDCurrency(data?.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {" "}
                {displayAEDCurrency(data?.price)}
              </p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button
                className=" border-2 border-green-600 rounded px-3 py-1 min-w-[120px] text-green-600 font-medium hover:bg-green-600 hover:text-white "
                onClick={(e) => handleBuyProduct(e, data?._id)}
              >
                Buy
              </button>
              <button
                className=" border-2 border-green-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-green-600 hover:text-green-600 hover:bg-white"
                onClick={(e) => handleAddToCart(e, data?._id)}
              >
                Add to cart
              </button>
            </div>
            <div>
              <p className="text-slate-900 font-medium my-1">Description :</p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>
      {data.category && (
        <CategoryWiseProductDisplay
          category={data.category}
          heading={"Recommended Product"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
