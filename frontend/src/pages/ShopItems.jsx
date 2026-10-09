import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { serverUrl } from "../App";
import FoodCard from "../components/FoodCard";
import Nav from "../components/Nav";
import { FaMapMarkerAlt, FaUtensils, FaStore, FaStar, FaArrowLeft, FaShoppingBag, FaMotorcycle } from "react-icons/fa";

function ShopItems() {
  const { shopId } = useParams();
  const [items, setItems] = useState([]);
  const [shop, setShop] = useState(null);
  const [dietFilter, setDietFilter] = useState("all");
  const { cartItems, totalAmount } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleGetShopItems = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/item/getitemsbyshop/${shopId}`,
        { withCredentials: true }
      );
      setItems(result.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetShop = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/shop/getshopbyid/${shopId}`,
        { withCredentials: true }
      );
      setShop(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetShopItems();
    handleGetShop();
  }, [shopId]);

  const filteredItems = items.filter((item) => {
    if (dietFilter === "all") return true;
    return item.type === dietFilter;
  });

  const totalCartCount = cartItems?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col pb-24 pt-[74px]">
      <Nav />

      {/* Shop Hero Banner */}
      <div className="w-full bg-white border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          
          {/* Back Navigation */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#E23744] mb-4 transition-colors cursor-pointer"
          >
            <FaArrowLeft size={11} />
            <span>Back to Restaurants</span>
          </button>

          {shop ? (
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="flex gap-4 sm:gap-6 items-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0 shadow-xs">
                  {shop.image ? (
                    <img
                      src={shop.image}
                      alt={shop.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#E23744]">
                      <FaStore size={32} />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    {shop.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-[#E23744] shrink-0" />
                    <span>{shop.address || `${shop.city}, ${shop.state}`}</span>
                  </p>

                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-md">
                      <FaStar className="text-[10px]" />
                      4.3
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                      <FaMotorcycle className="text-[#E23744]" /> 30-35 mins
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs font-semibold text-emerald-600">
                      Free Delivery
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-pulse h-24 bg-gray-100 rounded-2xl w-full"></div>
          )}
        </div>
      </div>

      {/* Menu & Dishes */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col gap-6">
        
        {/* Menu Bar & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              <FaUtensils className="text-[#E23744] text-lg" />
              <span>Full Menu</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {filteredItems.length} delicious item{filteredItems.length !== 1 ? "s" : ""} available to order
            </p>
          </div>

          {/* Diet Filters */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDietFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                dietFilter === "all"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDietFilter("veg")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                dietFilter === "veg"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-emerald-700 border-gray-200 hover:border-emerald-300"
              }`}
            >
              Veg Only
            </button>
            <button
              onClick={() => setDietFilter("non-veg")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                dietFilter === "non-veg"
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-red-700 border-gray-200 hover:border-red-300"
              }`}
            >
              Non-Veg Only
            </button>
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
            {filteredItems.map((item) => (
              <FoodCard data={item} key={item._id} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-2">
            <span className="text-3xl">🍽️</span>
            <h3 className="font-bold text-gray-800 text-base">No items available</h3>
            <p className="text-gray-500 text-xs">
              This restaurant hasn't added items in this filter yet.
            </p>
          </div>
        )}
      </main>

      {/* Floating Bottom Cart Bar (Swiggy / Zomato style) */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-5 inset-x-0 z-40 max-w-xl mx-auto px-4">
          <div
            onClick={() => navigate("/cart")}
            className="bg-[#E23744] hover:bg-[#C92C38] text-white p-3.5 rounded-2xl shadow-xl flex items-center justify-between cursor-pointer transition-all active:scale-98"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <FaShoppingBag className="text-white text-sm" />
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-orange-100">
                  {totalCartCount} ITEM{totalCartCount !== 1 ? "S" : ""} ADDED
                </p>
                <p className="text-sm font-black">₹{totalAmount.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider bg-white text-[#E23744] px-4 py-2 rounded-xl">
              <span>View Cart</span>
              <span>→</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopItems;
