import React from 'react';

function CategoryCard({ image, name, onClick, isActive }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center gap-2 cursor-pointer group shrink-0 select-none transition-transform"
    >
      <div
        className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-white shadow-sm border ${
          isActive
            ? 'border-[#E23744] ring-4 ring-[#E23744]/15 shadow-md scale-105'
            : 'border-gray-200/80 hover:border-gray-300'
        } group-hover:scale-105 group-hover:shadow-md transition-all duration-300 relative`}
      >
        <img
          src={image}
          alt={name || 'Category'}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <span
        className={`text-xs sm:text-sm font-semibold text-center max-w-[100px] truncate transition-colors ${
          isActive
            ? 'text-[#E23744] font-bold'
            : 'text-gray-700 group-hover:text-[#E23744]'
        }`}
      >
        {name}
      </span>
    </div>
  );
}

export default CategoryCard;