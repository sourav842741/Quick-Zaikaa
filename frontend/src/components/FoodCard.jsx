import React, { useState } from "react";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity, removeFromCart } from "../redux/userSlice";

function FoodCard({ data }) {
  const { cartItems } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const cartItem = cartItems?.find((i) => i.id === data._id);
  const qty = cartItem ? cartItem.quantity : 0;

  const handleAddFirstTime = (e) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        id: data._id,
        name: data.name,
        shop: data.shop,
        price: data.price,
        quantity: 1,
        image: data.image,
        type: data.type,
      })
    );
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    if (!cartItem) {
      handleAddFirstTime(e);
    } else {
      dispatch(updateQuantity({ id: data._id, quantity: qty + 1 }));
    }
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    if (qty === 1) {
      dispatch(removeFromCart(data._id));
    } else if (qty > 1) {
      dispatch(updateQuantity({ id: data._id, quantity: qty - 1 }));
    }
  };

  return (
    <div className="group w-[250px] sm:w-[265px] bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden shrink-0">
      {/* Top Image Container */}
      <div className="relative w-full h-[175px] bg-gray-100 overflow-hidden">
        {/* Authentic Veg / Non-Veg Indicator */}
        <div className="absolute top-3 left-3 z-10">
          {data.type === "veg" ? (
            <div
              className="w-4 h-4 border-[2px] border-emerald-600 p-[2px] flex items-center justify-center rounded-[3px] bg-white shadow-sm"
              title="Pure Veg"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
            </div>
          ) : (
            <div
              className="w-4 h-4 border-[2px] border-red-600 p-[2px] flex items-center justify-center rounded-[3px] bg-white shadow-sm"
              title="Non-Veg"
            >
              <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[6px] border-b-red-600"></div>
            </div>
          )}
        </div>

        {/* Dish Image */}
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Pill Tag */}
        {data.category && (
          <span className="absolute bottom-2.5 left-2.5 bg-black/60 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-none tracking-wide">
            {data.category}
          </span>
        )}
      </div>

      {/* Content Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between gap-3">
        <div>
          <h3 className="font-bold text-gray-900 text-base line-clamp-1 group-hover:text-[#E23744] transition-colors">
            {data.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1">
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-1.5 py-0.5 rounded-md">
              <FaStar className="text-[10px] text-emerald-600" />
              {data.rating?.average ? Number(data.rating.average).toFixed(1) : "4.0"}
            </span>
            <span className="text-gray-400 text-xs">
              ({data.rating?.count || 12}+ reviews)
            </span>
          </div>
        </div>

        {/* Price & Action Button (Swiggy / Zomato style) */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <span className="text-[11px] text-gray-500 block leading-tight font-medium">Price</span>
            <span className="font-extrabold text-gray-900 text-lg">
              ₹{data.price}
            </span>
          </div>

          {/* ADD / Quantity Stepper Button */}
          {qty === 0 ? (
            <button
              onClick={handleAddFirstTime}
              className="bg-white border-2 border-[#E23744] text-[#E23744] hover:bg-[#E23744] hover:text-white px-4 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm transition-all duration-200 flex items-center gap-1 active:scale-95 cursor-pointer"
            >
              <span>ADD</span>
              <FaPlus size={10} />
            </button>
          ) : (
            <div className="flex items-center bg-[#E23744] text-white rounded-xl shadow-sm px-1 py-1 font-bold text-sm">
              <button
                onClick={handleDecrease}
                className="w-7 h-7 flex items-center justify-center hover:bg-black/15 rounded-lg transition active:scale-90 cursor-pointer"
              >
                <FaMinus size={10} />
              </button>
              <span className="px-2 min-w-[20px] text-center text-sm font-extrabold">
                {qty}
              </span>
              <button
                onClick={handleIncrease}
                className="w-7 h-7 flex items-center justify-center hover:bg-black/15 rounded-lg transition active:scale-90 cursor-pointer"
              >
                <FaPlus size={10} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
