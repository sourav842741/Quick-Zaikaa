import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaFire, FaMotorcycle, FaTag, FaArrowRight } from 'react-icons/fa';

function HeroCarousel({ city, onSelectCategory }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const slides = [
    {
      id: 1,
      tag: "MEGA DEAL OF THE DAY",
      tagIcon: FaFire,
      title: `Authentic Dum Biryani, Hot & Fresh in ${city || "Your City"}`,
      description: "Tender marinated meat, aromatic long-grain basmati & royal spices from top local kitchens.",
      coupon: "USE CODE: BIRYANI50 (50% OFF)",
      cta: "Order Biryani Now",
      category: "Main Course",
      bgGradient: "from-[#B91C1C] via-[#DC2626] to-[#E23744]",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop",
      badge: "Kolkata Dum Special"
    },
    {
      id: 2,
      tag: "WEEKEND CHEESE FEST",
      tagIcon: FaTag,
      title: "Cheesy Hand-Tossed Pizzas Starting at ₹199",
      description: "Baked fresh with 100% mozzarella, rich garlic crust and loaded farm-fresh toppings.",
      coupon: "BUY 1 GET 1 FREE (CODE: CHEESEFEST)",
      cta: "Explore Hot Pizzas",
      category: "Pizza",
      bgGradient: "from-[#C2410C] via-[#EA580C] to-[#F97316]",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop",
      badge: "Wood-Fired Crust"
    },
    {
      id: 3,
      tag: "SUPERFAST 25 MINS DELIVERY",
      tagIcon: FaMotorcycle,
      title: "Crunchy Burgers, Peri Peri Fries & Grilled Rolls",
      description: "Juicy patties, melted cheddar & crisp sides delivered piping hot to satisfy quick cravings.",
      coupon: "FREE DELIVERY ON ORDERS ABOVE ₹149",
      cta: "Grab Quick Bites",
      category: "Burgers",
      bgGradient: "from-[#881337] via-[#9F1239] to-[#E11D48]",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
      badge: "Top Rated Burgers"
    },
    {
      id: 4,
      tag: "SWEET CRAVINGS SPECIAL",
      tagIcon: FaFire,
      title: "Warm Gulab Jamuns, Cakes & Bengali Sweets",
      description: "Finish your meal with delectable desserts from the finest authentic local confectioneries.",
      coupon: "FLAT 30% OFF ON ALL DESSERTS",
      cta: "Satisfy Sweet Tooth",
      category: "Desserts",
      bgGradient: "from-[#78350F] via-[#92400E] to-[#D97706]",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop",
      badge: "Pure Ghee Sweets"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-play timer (slides every 4.5 seconds)
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 4500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, slides.length]);

  const handleCtaClick = (category) => {
    if (onSelectCategory && category) {
      onSelectCategory(category);
    }
  };

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden shadow-lg select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides Track */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => {
          const TagIcon = slide.tagIcon;
          return (
            <div
              key={slide.id}
              className={`w-full shrink-0 bg-gradient-to-r ${slide.bgGradient} text-white p-6 sm:p-8 md:p-10 relative flex flex-col md:flex-row items-center justify-between gap-6 min-h-[300px] sm:min-h-[340px]`}
            >
              {/* Subtle ambient lighting circles */}
              <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute left-1/3 -top-10 w-52 h-52 bg-yellow-300/10 rounded-full blur-xl pointer-events-none"></div>

              {/* Left Column: Text & CTA */}
              <div className="relative z-10 max-w-xl flex flex-col gap-3 text-left">
                {/* Badge Tag */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 bg-white/20 border border-white/30 text-white text-[11px] sm:text-xs font-extrabold px-3 py-1 rounded-full w-fit tracking-wide uppercase">
                    <TagIcon className="text-yellow-300 text-xs" />
                    <span>{slide.tag}</span>
                  </span>
                  <span className="inline-block bg-black/25 text-yellow-200 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {slide.badge}
                  </span>
                </div>

                {/* Main Headline */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                  {slide.title}
                </h2>

                {/* Subtitle */}
                <p className="text-white/90 text-xs sm:text-sm font-medium line-clamp-2 max-w-lg">
                  {slide.description}
                </p>

                {/* Coupon Code Pill */}
                <div className="pt-1">
                  <span className="inline-block bg-black/30 border border-white/20 text-yellow-300 font-mono font-bold text-xs sm:text-sm px-3 py-1 rounded-xl shadow-xs">
                    🏷️ {slide.coupon}
                  </span>
                </div>

                {/* Action CTA Button */}
                <div className="pt-2">
                  <button
                    onClick={() => handleCtaClick(slide.category)}
                    className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-yellow-300 font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <span>{slide.cta}</span>
                    <FaArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* Right Column: Appetizing Food Image Cutout */}
              <div className="relative z-10 shrink-0 flex items-center justify-center">
                <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl relative bg-black/20 group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prev / Next Arrow Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/25 hover:bg-white text-white hover:text-gray-900 border border-white/40 flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-20 backdrop-blur-none"
        title="Previous Offer"
      >
        <FaChevronLeft size={13} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/25 hover:bg-white text-white hover:text-gray-900 border border-white/40 flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-20 backdrop-blur-none"
        title="Next Offer"
      >
        <FaChevronRight size={13} />
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentSlide === idx
                ? "w-7 bg-white shadow-sm"
                : "w-2 bg-white/45 hover:bg-white/70"
            }`}
            title={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;
