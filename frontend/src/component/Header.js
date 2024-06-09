import React, { useContext, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }
    if (data.error) {
      toast.error(data.message);
    }
  };
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-16 shadow-md bg-[rgb(18,35,45)] sticky top-0 z-50">
      <div className="h-full container mx-auto flex items-center justify-between px-4 ">
        <div className="">
          <Link to={"/"}>
            <h2 className="text-[rgb(197,145,99)] font-bold font-serif border-x-4 p-2 border-green-600 rounded-full">
              Sama store
            </h2>
          </Link>
        </div>
        <div className="hidden md:flex item-center w-full justify-between max-w-sm">
          <input
            type="text"
            placeholder="Search project here ..."
            className="w-full outline-none pl-2 border border-green-600 rounded-l-full focus-within:shadow bg-[rgb(255,255,255)]"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-green-600 flex items-center justify-center rounded-r-full text-[rgb(18,35,45)]">
            <LuSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className=" relative flex justify-center ">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center "
                onClick={() => setMenuDisplay((preve) => !preve)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className=" absolute z-10 top-12 bg-white h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"admin-panel/all-products"}
                      className=" whitespace-nowrap hover:bg-slate-100 p-2 hidden md:block"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      Admin panel
                    </Link>
                  )}
                  <Link
                    to={"/order"}
                    onClick={() => setMenuDisplay((preve) => !preve)}
                    className=" whitespace-nowrap hover:bg-slate-100 p-2 hidden md:block"
                  >
                    Orders list
                  </Link>
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <FaCartShopping className="text-[rgb(255,255,255)]" />
              </span>
              <div className="bg-red-500 text-white flex items-center justify-center rounded-full w-5 h-5 p-1 absolute -top-3 -right-3 ">
                <p className="text-xs">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="bg-green-600 text-white px-3 py-1  rounded-full hover:bg-[rgb(223,158,101)] "
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="bg-green-600 text-white px-3 py-1  rounded-full hover:bg-[rgb(231,161,100)] "
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
