import React, { useEffect, useState, useRef } from 'react';
import { FaLocationDot, FaUtensils } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { IoIosSearch } from "react-icons/io";
import { LuShoppingCart, LuLogOut } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { serverUrl } from '../App';
import axios from 'axios';
import { setSearchItems, setShop, setUserData } from '../redux/userSlice';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { TbReceipt2 } from "react-icons/tb";

function Nav() {
  const { city, userData, cartItems, pendingOrdersCount, totalAmount } = useSelector(state => state.user);
  const [showSearch, setShowSearch] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowInfo(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true });
      dispatch(setUserData(null));
      dispatch(setShop(null));
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchItems = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/search-items?city=${city}&query=${input}`,
        { withCredentials: true }
      );
      dispatch(setSearchItems(result.data));
    } catch (error) {
      dispatch(setSearchItems(null));
      console.log(error);
    }
  };

  useEffect(() => {
    if (input) {
      handleSearchItems();
    } else {
      dispatch(setSearchItems(null));
    }
  }, [input]);

  const totalCartCount = cartItems?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white border-b border-gray-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[74px] flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-[#E23744] flex items-center justify-center text-white shadow-sm">
            <FaUtensils className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight leading-none">
              Quick<span className="text-[#E23744]">Zaika</span>
            </span>
            <span className="text-[10px] font-bold text-gray-600 tracking-widest uppercase mt-0.5">
              Food Delivery
            </span>
          </div>
        </div>

        {/* Center Search & Location Pill (Swiggy / Zomato style) */}
        {userData?.role === "user" && (
          <div className="hidden md:flex items-center bg-gray-50 hover:bg-gray-100/80 border border-gray-200 rounded-2xl px-3 py-1.5 w-full max-w-lg transition-all shadow-xs focus-within:bg-white focus-within:border-[#E23744] focus-within:ring-2 focus-within:ring-[#E23744]/15">
            {/* Location */}
            <div className="flex items-center gap-1.5 px-2 text-gray-700 font-semibold text-xs border-r border-gray-200 shrink-0 max-w-[140px] truncate">
              <FaLocationDot className="w-3.5 h-3.5 text-[#E23744] shrink-0" />
              <span className="truncate">{city || "Locating..."}</span>
            </div>

            {/* Search Input */}
            <div className="flex items-center gap-2 w-full pl-2">
              <IoIosSearch className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search for restaurants, dishes or cuisines..."
                className="w-full bg-transparent text-xs sm:text-sm text-gray-800 placeholder-gray-600 outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              {input && (
                <button
                  onClick={() => setInput("")}
                  className="text-gray-400 hover:text-gray-600 p-0.5 rounded-full"
                >
                  <RxCross2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          
          {/* Mobile search toggle icon */}
          {userData?.role === "user" && (
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="md:hidden p-2 text-gray-600 hover:text-[#E23744] rounded-xl hover:bg-gray-100"
            >
              {showSearch ? <RxCross2 className="w-5 h-5" /> : <IoIosSearch className="w-5 h-5" />}
            </button>
          )}

          {/* Role: Owner UI */}
          {userData?.role === "owner" ? (
            <>
              <button
                onClick={() => navigate("/additem")}
                className="flex items-center gap-1.5 bg-[#E23744] hover:bg-[#C92C38] text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <FiPlus size={16} />
                <span className="hidden sm:inline">Add Food Item</span>
              </button>

              <button
                onClick={() => navigate("/pending-orders")}
                className="relative flex items-center gap-1.5 border border-gray-200 hover:border-gray-300 bg-gray-50 text-gray-800 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
              >
                <TbReceipt2 className="w-4 h-4 text-[#E23744]" />
                <span className="hidden sm:inline">Orders</span>
                {pendingOrdersCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#E23744] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                    {pendingOrdersCount}
                  </span>
                )}
              </button>
            </>
          ) : userData?.role === "deliveryBoy" ? (
            <button
              onClick={() => navigate("/my-delivered-orders")}
              className="flex items-center gap-1.5 bg-[#E23744] hover:bg-[#C92C38] text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all"
            >
              <TbReceipt2 className="w-4 h-4" />
              <span>Deliveries</span>
            </button>
          ) : (
            <>
              {/* User: My Orders */}
              {userData?.role === "user" && (
                <button
                  onClick={() => navigate("/my-orders")}
                  className="hidden sm:flex items-center gap-1.5 text-gray-700 hover:text-[#E23744] font-semibold text-xs sm:text-sm px-2.5 py-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <TbReceipt2 className="w-4 h-4 text-gray-500" />
                  <span>My Orders</span>
                </button>
              )}

              {/* User: Cart Pill */}
              <button
                onClick={() => navigate("/cart")}
                className="relative flex items-center gap-2 bg-[#E23744] hover:bg-[#C92C38] text-white px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <LuShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                <span className="bg-white text-[#E23744] text-xs font-black px-1.5 py-0.2 rounded-full min-w-[20px] text-center">
                  {totalCartCount}
                </span>
              </button>
            </>
          )}

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setShowInfo((prev) => !prev)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-900 text-white text-sm font-bold shadow-sm cursor-pointer hover:ring-2 hover:ring-[#E23744]/40 transition-all select-none"
            >
              {userData?.fullName?.slice(0, 1)?.toUpperCase() || "U"}
            </div>

            {/* Profile Dropdown Menu */}
            {showInfo && (
              <div className="absolute right-0 top-12 w-60 bg-white rounded-2xl shadow-xl border border-gray-150 py-2 z-50 animate-in fade-in duration-150">
                <div className="px-4 py-2.5 border-b border-gray-100">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {userData?.fullName || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{userData?.email}</p>
                  <span className="inline-block mt-1.5 text-[10px] font-bold text-[#E23744] bg-red-50 border border-red-100 rounded-md px-2 py-0.5 uppercase tracking-wide">
                    {userData?.role === "owner" ? "Restaurant Partner" : userData?.role === "deliveryBoy" ? "Delivery Partner" : "Customer"}
                  </span>
                </div>

                <div className="py-1">
                  {userData?.role === "user" && (
                    <button
                      onClick={() => {
                        setShowInfo(false);
                        navigate("/my-orders");
                      }}
                      className="w-full text-left px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <TbReceipt2 className="w-4 h-4 text-gray-400" />
                      <span>My Orders</span>
                    </button>
                  )}

                  {userData?.role === "owner" && (
                    <button
                      onClick={() => {
                        setShowInfo(false);
                        navigate("/editshop");
                      }}
                      className="w-full text-left px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <FaUtensils className="w-4 h-4 text-gray-400" />
                      <span>Manage Restaurant</span>
                    </button>
                  )}
                </div>

                <div className="pt-1 border-t border-gray-100">
                  <button
                    onClick={handleLogOut}
                    className="w-full text-left px-4 py-2 text-xs sm:text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <LuLogOut className="w-4 h-4 text-red-600" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar Expansion */}
      {showSearch && userData?.role === "user" && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 shadow-md flex items-center gap-2">
          <div className="flex items-center gap-2 w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
            <IoIosSearch className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search dishes or restaurants..."
              className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-600 outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
            {input && (
              <button onClick={() => setInput("")} className="text-gray-400 p-0.5">
                <RxCross2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Nav;
