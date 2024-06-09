import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
    // console.log( "data User",dataResponse);
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    /* user details */
    fetchUserDetails();
    /* user details Cart product */
    fetchUserAddToCart();
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails /* user details fetch*/,
          cartProductCount, // current user add to cart product count
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position="bottom-right" />
        <Header />
        <main className="min-h-[calc(100vh-148px)]">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
