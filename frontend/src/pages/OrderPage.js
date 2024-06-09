import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import displayAEDCurrency from "../helpers/displayCurrency";

const OrderPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const fetchOrderDetails = async () => {
    setIsLoading(true); // Set loading state to true before fetching
    setError(null); // Clear any previous errors

    try {
      const response = await fetch(SummaryApi.getOrder.url, {
        method: SummaryApi.getOrder.method,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError(error.message); // Set error message for display
    } finally {
      setIsLoading(false); // Set loading state to false after fetching (regardless of success/error)
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []); // Empty dependency array to run only once

  return (
    <div>
      {isLoading && (
        <p className="text-center font-medium p-2">Loading orders...</p>
      )}
      {error && <p className="text-center font-medium p-2">Error: {error}</p>}
      {data.length === 0 && (
        <p className="text-center p-2 font-medium bg-slate-200">
          No orders available.
        </p>
      )}

      {data.length > 0 && (
        <div className="p-4 flex flex-col justify-center max-w-[1200px] mx-auto transition-all">
          {data.map((item, index) => (
            <div key={item.id || `${item.userId}-${index}`}>
              {/* Use item.id if available */}
              <p className=" font-medium text-lg">
                {moment(item.createdAt).format("LLL")}
              </p>
              <div className="border rounded-md shadow flex flex-col sm:flex-row justify-between md:items-center p-2">
                <div className="grid gap-1">
                  {item?.productDetails.map((product, index) => {
                    return (
                      <div
                        key={product.productId + index}
                        className="flex gap-3 bg-slate-100"
                      >
                        <img
                          src={product.image[0]}
                          className="w-28 h-28 bg-slate-200  object-scale-down p-2"
                        />
                        <div>
                          <div className=" font-medium text-lg text-ellipsis line-clamp-1">
                            {product.name}
                          </div>
                          <div className="flex items-center gap-5 mt-1">
                            <div className=" text-lg text-green-500 ">
                              {displayAEDCurrency(product.price)}
                            </div>
                            <p>Quantity : {product.quantity}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col  gap-4 p-2">
                  <div>
                    <div className="text-lg font-medium">Payment Details :</div>
                    <p className=" font-medium ml-1">
                      Payment method :{" "}
                      {item.paymentDetails.payment_method_type[0]}
                    </p>
                    <p className=" font-medium ml-1">
                      Payment Status : {item.paymentDetails.payment_status}
                    </p>
                  </div>
                  <div>
                    <div className="text-lg font-medium">
                      Shipping Details :
                    </div>
                    {item?.shipping_options.map((shipping, index) => {
                      return (
                        <div
                          key={shipping.shipping_rate}
                          className=" font-medium ml-1"
                        >
                          Shipping Amount : {shipping.shipping_amount}
                        </div>
                      );
                    })}
                  </div>
                  <div className=" font-semibold ml-auto w-fit text-lg text-green-400">
                    Total Amount : {displayAEDCurrency(item.totalAmount)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
