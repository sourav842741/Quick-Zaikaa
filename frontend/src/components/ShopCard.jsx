import React from 'react';
import { FaStar, FaMapMarkerAlt, FaArrowRight, FaStore } from 'react-icons/fa';

function ShopCard({ shop, onClick }) {
  if (!shop) return null;

  return (
    <div
      onClick={onClick}
      className="group w-[260px] sm:w-[280px] bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col shrink-0"
    >
      {/* Shop Image Container */}
      <div className="relative h-[160px] w-full bg-gray-100 overflow-hidden">
        {shop.image ? (
          <img
            src={shop.image}
            alt={shop.name || 'Restaurant'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-orange-50/50">
            <FaStore className="w-10 h-10 text-[#E23744]/40 mb-1" />
            <span className="text-xs font-medium text-gray-500">Quick Zaika Partner</span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="bg-[#E23744] text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-sm tracking-wide uppercase">
            Top Rated
          </span>
        </div>

        {/* Bottom Time Overlay (Swiggy/Zomato style) */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5 pt-6 flex items-center justify-between text-white text-xs font-semibold">
          <span className="tracking-wide">25-35 MINS</span>
          <span className="text-orange-200">FREE DELIVERY</span>
        </div>
      </div>

      {/* Shop Details */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-2">
        <div>
          <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate group-hover:text-[#E23744] transition-colors">
            {shop.name}
          </h3>

          {/* Rating & City */}
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-md">
              <FaStar className="text-[10px]" />
              4.2
            </span>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-xs font-medium text-gray-600 truncate">
              {shop.city || 'Local Restaurant'}
            </span>
          </div>

          {/* Address */}
          <p className="text-xs text-gray-500 truncate mt-1 flex items-center gap-1">
            <FaMapMarkerAlt className="text-gray-400 shrink-0 text-[10px]" />
            <span className="truncate">{shop.address || `${shop.city}, ${shop.state}`}</span>
          </p>
        </div>

        {/* View Menu CTA */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#E23744]">
          <span>View Menu & Dishes</span>
          <FaArrowRight className="text-[11px] transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}

export default ShopCard;
