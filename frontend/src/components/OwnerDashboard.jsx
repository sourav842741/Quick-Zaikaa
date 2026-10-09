import React from 'react'
import Nav from './Nav'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaUtensils, FaPen, FaPlus } from "react-icons/fa";
import Footer from './Footer'
import OwnerFoodCard from './OwnerFoodCard'
import { useEffect } from 'react';
import { setPendingOrdersCount } from '../redux/userSlice';

function OwnerDashboard() {
  const { shop,ownerPendingOrders } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch=useDispatch()
useEffect(()=>{
    const pending = ownerPendingOrders.filter(order => order.shopOrder.status === "pending");
        dispatch(setPendingOrdersCount(pending.length));
},[ownerPendingOrders])
  return (
    <div className='w-full min-h-screen bg-[#F9FAFB] flex flex-col items-center pb-12 pt-[74px]'>
      <Nav />

      {/* If no shop */}
      {!shop && (
        <div className="flex justify-center items-center p-4 sm:p-6 my-auto">
          <div className="w-full max-w-md bg-white shadow-sm rounded-3xl p-8 border border-gray-200/80 hover:shadow-md transition-all text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-[#E23744] flex items-center justify-center mx-auto mb-4">
              <FaUtensils className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">
              Register Your Restaurant
            </h2>
            <p className="text-gray-500 mb-6 text-xs sm:text-sm leading-relaxed">
              Join Quick Zaika's food delivery network and start getting orders from customers in your city.
            </p>
            <button
              className="bg-[#E23744] hover:bg-[#C92C38] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer"
              onClick={() => navigate("/editshop")}
            >
              Get Started Now
            </button>
          </div>
        </div>
      )}

      {/* If shop exists but no items */}
      {shop && shop?.items?.length === 0 && (
        <div className='w-full flex flex-col items-center gap-6 px-4 sm:px-6 max-w-4xl'>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-2 mt-6 text-center">
            <FaUtensils className="text-[#E23744]" /> Welcome to {shop.name}
          </h1>

          {/* Shop Card */}
          <div className="bg-white shadow-xs rounded-3xl overflow-hidden border border-gray-200/80 w-full relative">
            <button
              onClick={() => navigate("/editshop")}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 p-2.5 rounded-full shadow-md transition-all cursor-pointer"
              title="Edit Restaurant Info"
            >
              <FaPen size={14} />
            </button>
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-48 sm:h-64 object-cover"
            />
            <div className="p-5 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1">{shop.name}</h2>
              <p className="text-gray-500 text-sm mb-2">{shop.city}, {shop.state}</p>
              <p className="text-gray-700 text-sm mb-4">{shop.address}</p>
              <div className="text-xs text-gray-400">
                <p>Created: {new Date(shop.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Add Item Section */}
          <div className="flex items-center justify-center w-full">
            <div className="bg-white border border-gray-200/80 shadow-xs rounded-3xl p-6 sm:p-8 w-full text-center">
              <FaUtensils className="text-[#E23744] text-3xl mx-auto mb-3" />
              <h2 className="text-xl font-bold text-gray-900 mb-1">Add Your Food Items</h2>
              <p className="text-gray-500 mb-5 text-xs sm:text-sm">
                Share your delicious creations with hungry customers by adding them to the menu.
              </p>
              <button
                className="inline-flex items-center gap-2 bg-[#E23744] hover:bg-[#C92C38] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                onClick={() => navigate("/additem")}
              >
                <FaPlus size={12} /> Add First Dish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* If shop and items exist */}
      {shop && shop?.items?.length > 0 && (
        <div className='w-full flex flex-col gap-6 items-center px-4 sm:px-6 max-w-4xl mb-6'>
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-2">
                <FaUtensils className="text-[#E23744]" /> {shop.name}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                {shop.items.length} active dish{shop.items.length !== 1 ? "es" : ""} on your menu
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/additem")}
                className="inline-flex items-center gap-1.5 bg-[#E23744] hover:bg-[#C92C38] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
              >
                <FaPlus size={11} /> Add Food
              </button>
              <button
                onClick={() => navigate("/editshop")}
                className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                <FaPen size={11} /> Edit Shop
              </button>
            </div>
          </div>

          {/* Food Items */}
          <div className="flex flex-col items-center gap-3 w-full">
            {shop?.items.map((item, index) => (
              <OwnerFoodCard key={item._id || index} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default OwnerDashboard
