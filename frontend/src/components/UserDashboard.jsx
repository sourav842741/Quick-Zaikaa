import React, { useRef, useState, useEffect } from 'react';
import Nav from './Nav';
import { categories } from '../category';
import { FaChevronLeft, FaChevronRight, FaFire, FaMotorcycle, FaTag, FaShieldAlt } from 'react-icons/fa';
import CategoryCard from './CategoryCard';
import ShopCard from './ShopCard';
import FoodCard from './FoodCard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeroCarousel from './HeroCarousel';

function UserDashboard() {
  const { city, shopsOfCity, itemsOfCity, searchItems } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const cateScrollRef = useRef(null);
  const shopScrollRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dietFilter, setDietFilter] = useState('all'); // 'all', 'veg', 'non-veg'
  const [showCateLeft, setShowCateLeft] = useState(false);
  const [showCateRight, setShowCateRight] = useState(true);
  const [showShopLeft, setShowShopLeft] = useState(false);
  const [showShopRight, setShowShopRight] = useState(true);

  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  const updateButtons = (ref, setLeft, setRight) => {
    const el = ref.current;
    if (!el) return;
    setLeft(el.scrollLeft > 10);
    setRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -280 : 280,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const cateEl = cateScrollRef.current;
    const shopEl = shopScrollRef.current;

    const cateScrollListener = () =>
      updateButtons(cateScrollRef, setShowCateLeft, setShowCateRight);
    const shopScrollListener = () =>
      updateButtons(shopScrollRef, setShowShopLeft, setShowShopRight);

    if (cateEl) {
      updateButtons(cateScrollRef, setShowCateLeft, setShowCateRight);
      cateEl.addEventListener('scroll', cateScrollListener);
    }
    if (shopEl) {
      updateButtons(shopScrollRef, setShowShopLeft, setShowShopRight);
      shopEl.addEventListener('scroll', shopScrollListener);
    }

    return () => {
      if (cateEl) cateEl.removeEventListener('scroll', cateScrollListener);
      if (shopEl) shopEl.removeEventListener('scroll', shopScrollListener);
    };
  }, [categories, shopsOfCity]);

  // Compute filtered items
  const filteredItems = (itemsOfCity || []).filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesDiet =
      dietFilter === 'all' || item.type === dietFilter;
    return matchesCategory && matchesDiet;
  });

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F9FAFB] pt-[74px]">
      <Nav />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col gap-10">

        {/* 🔎 Search Results Section */}
        {searchItems && searchItems.length > 0 && (
          <section className="w-full bg-white border border-gray-200/80 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                  Search Results
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Found {searchItems.length} dishes matching your query
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
              {searchItems.map((item, index) => (
                <FoodCard data={item} key={item._id || index} />
              ))}
            </div>
          </section>
        )}

        {/* 🌟 Dynamic Auto-Sliding Hero Carousel */}
        <section className="w-full">
          <HeroCarousel city={city} onSelectCategory={handleFilter} />
        </section>

        {/* 🍕 Section 1: "What's on your mind?" (Categories) */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                Inspiration for your first order
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Explore delicious cravings across top cuisines
              </p>
            </div>

            {/* Scroll Navigation Controls */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scrollHandler(cateScrollRef, 'left')}
                disabled={!showCateLeft}
                className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transition-all ${
                  showCateLeft
                    ? 'bg-white hover:bg-gray-100 text-gray-700 shadow-sm cursor-pointer'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
              >
                <FaChevronLeft size={12} />
              </button>
              <button
                onClick={() => scrollHandler(cateScrollRef, 'right')}
                disabled={!showCateRight}
                className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transition-all ${
                  showCateRight
                    ? 'bg-white hover:bg-gray-100 text-gray-700 shadow-sm cursor-pointer'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
              >
                <FaChevronRight size={12} />
              </button>
            </div>
          </div>

          <div
            ref={cateScrollRef}
            className="flex overflow-x-auto gap-4 sm:gap-6 py-2 scroll-smooth items-center select-none"
          >
            {categories?.map((cate, index) => (
              <CategoryCard
                key={index}
                name={cate.category}
                image={cate.image}
                isActive={selectedCategory === cate.category}
                onClick={() => handleFilter(cate.category)}
              />
            ))}
          </div>
        </section>

        {/* 🏬 Section 2: "Best Restaurants in {city}" */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                Top Restaurants in {city || "Your City"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Handpicked places serving delicious meals near you
              </p>
            </div>

            {/* Scroll Controls */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scrollHandler(shopScrollRef, 'left')}
                disabled={!showShopLeft}
                className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transition-all ${
                  showShopLeft
                    ? 'bg-white hover:bg-gray-100 text-gray-700 shadow-sm cursor-pointer'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
              >
                <FaChevronLeft size={12} />
              </button>
              <button
                onClick={() => scrollHandler(shopScrollRef, 'right')}
                disabled={!showShopRight}
                className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transition-all ${
                  showShopRight
                    ? 'bg-white hover:bg-gray-100 text-gray-700 shadow-sm cursor-pointer'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
              >
                <FaChevronRight size={12} />
              </button>
            </div>
          </div>

          {shopsOfCity && shopsOfCity.length > 0 ? (
            <div
              ref={shopScrollRef}
              className="flex overflow-x-auto gap-5 pb-3 pt-1 scroll-smooth"
            >
              {shopsOfCity.map((shop, index) => (
                <ShopCard
                  key={shop._id || index}
                  shop={shop}
                  onClick={() => navigate(`/shop-items/${shop._id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-gray-500 text-sm">
              No registered restaurants found in {city || "this city"} yet. Check back soon!
            </div>
          )}
        </section>

        {/* 🍲 Section 3: "Popular Dishes / Recommended For You" */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                Recommended Dishes
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                {selectedCategory !== 'All' ? `Filtered by ${selectedCategory}` : 'Delicious food curated for you'}
              </p>
            </div>

            {/* Veg / Non-Veg & Category Reset Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setDietFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  dietFilter === 'all'
                    ? 'bg-gray-900 text-white border-gray-900 shadow-xs'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
              >
                All Foods
              </button>

              <button
                onClick={() => setDietFilter('veg')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  dietFilter === 'veg'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white text-emerald-700 border-gray-200 hover:border-emerald-300'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                Pure Veg
              </button>

              <button
                onClick={() => setDietFilter('non-veg')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  dietFilter === 'non-veg'
                    ? 'bg-red-600 text-white border-red-600 shadow-xs'
                    : 'bg-white text-red-700 border-gray-200 hover:border-red-300'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
                Non-Veg
              </button>

              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-[#E23744] hover:bg-red-50 transition-colors cursor-pointer"
                >
                  Clear Category (✕)
                </button>
              )}
            </div>
          </div>

          {/* Dishes Grid */}
          {filteredItems?.length > 0 ? (
            <div className="flex flex-wrap gap-5 justify-center sm:justify-start pt-2">
              {filteredItems.map((item, index) => (
                <FoodCard data={item} key={item._id || index} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-2">
              <span className="text-4xl">🍽️</span>
              <h3 className="font-bold text-gray-800 text-base">No dishes found</h3>
              <p className="text-gray-500 text-xs max-w-sm">
                Try selecting a different category or changing the veg/non-veg filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setDietFilter('all');
                }}
                className="mt-2 bg-[#E23744] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#C92C38] transition"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default UserDashboard;
