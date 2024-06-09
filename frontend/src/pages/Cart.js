import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayAEDCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const lodingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };
  const handleLoading = async () => {
    setLoading(true);
    await fetchData();
    setLoading(false);
  };

  useEffect(() => {
    handleLoading();
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };
  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };
  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const handlePayment = async () => {
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartItems: data,
      }),
    });

    const responseData = await response.json();

    if(responseData?.id) {
      stripePromise.redirectToCheckout({sessionId :responseData?.id})
    }

    console.log("payment response", responseData);
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  return (
    <div className=" container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* view product */}
        <div className="w-full max-w-3xl">
          <div>
            {loading
              ? lodingCart.map((el, index) => {
                  return (
                    <div
                      key={el + "add To cart Loading" + index}
                      className="w-full bg-slate-200
                h-32 my-2 border border-slate-300 animate-pulse rounded"
                    ></div>
                  );
                })
              : data.map((product, index) => {
                  return (
                    <div
                      key={product?._id + "add To cart Loading"}
                      className="w-full bg-white
                h-32 my-2 border border-slate-300 rounded  grid grid-cols-[120px,1fr]"
                    >
                      <div className="w-32 h-32 bg-slate-200 ">
                        <img
                          src={product?.productId?.productImage[0]}
                          className="w-full h-full object-cover object-scale-down p-1 mix-blend-multiply"
                        />
                      </div>
                      <div className="px-4 py-2 relative">
                        {/* delete Product */}
                        <div
                          className=" absolute right-1 border border-red-200 text-red-600 rounded p-1 hover:bg-red-600 hover:text-white transition-all"
                          onClick={() => deleteCartProduct(product?._id)}
                        >
                          <MdDelete />
                        </div>
                        <h2 className="text-sm lg:text-xl text-ellipsis line-clamp-1">
                          {product?.productId?.productName}
                        </h2>
                        <p className=" capitalize text-slate-500">
                          {product?.productId?.category}
                        </p>
                        <p className="text-green-600 font-medium text-lg">
                          {displayAEDCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <button
                            className=" border border-green-600 text-green-600 hover:bg-green-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                            onClick={() =>
                              decraseQty(product?._id, product?.quantity)
                            }
                          >
                            -
                          </button>
                          <span>{product?.quantity}</span>
                          <button
                            className=" border border-green-600 text-green-600 hover:bg-green-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                            onClick={() =>
                              increaseQty(product?._id, product?.quantity)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
        {/* Summary */}
        {data[0] && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className=" h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
              <div className=" h-35 bg-white">
                <h2 className=" text-white bg-green-600 px-4 py-1">Summary</h2>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Quantity :</p>
                  <p>{totalQty}</p>
                </div>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Total Price :</p>
                  <p>{displayAEDCurrency(totalPrice)}</p>
                </div>
                <button
                  className="bg-blue-600 p-2 text-white w-full"
                  onClick={handlePayment}
                >
                  Payment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
