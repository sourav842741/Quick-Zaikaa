import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMinus, FaPlus, FaTrash, FaArrowLeft, FaShoppingBag, FaShieldAlt } from "react-icons/fa";
import { updateQuantity, removeFromCart } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useSelector((state) => state.user);

  const handleIncrease = (id, currentQty) => {
    dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
  };

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Top Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#E23744] hover:border-[#E23744]/40 shadow-xs transition-colors cursor-pointer"
          >
            <FaArrowLeft size={14} />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Review Your Cart
            </h1>
            <p className="text-xs text-gray-500">
              {cartItems?.length || 0} item{cartItems?.length !== 1 ? "s" : ""} selected
            </p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white border border-gray-200/80 rounded-3xl p-12 text-center flex flex-col items-center justify-center shadow-sm mt-4">
            <div className="w-20 h-20 rounded-full bg-red-50 text-[#E23744] flex items-center justify-center text-3xl mb-4">
              <FaShoppingBag />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Your cart is empty</h2>
            <p className="text-sm text-gray-500 max-w-sm mb-6">
              Looks like you haven't added anything to your cart yet. Explore delicious dishes from top restaurants!
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-[#E23744] hover:bg-[#C92C38] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer"
            >
              Browse Restaurants
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-2 space-y-3.5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between gap-4"
                >
                  {/* Left: Image & Info */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-xl border border-gray-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        ₹{item.price} each
                      </p>
                      <p className="font-extrabold text-gray-900 text-sm sm:text-base mt-1">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Right: Quantity Stepper & Remove */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-1 py-1 font-bold">
                      <button
                        onClick={() => handleDecrease(item.id, item.quantity)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-lg transition active:scale-90 text-gray-700 cursor-pointer"
                      >
                        <FaMinus size={9} />
                      </button>
                      <span className="px-2.5 text-xs sm:text-sm font-extrabold text-gray-900 min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrease(item.id, item.quantity)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-lg transition active:scale-90 text-gray-700 cursor-pointer"
                      >
                        <FaPlus size={9} />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition cursor-pointer"
                      title="Remove item"
                    >
                      <FaTrash size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Order Summary & Checkout */}
            <div className="lg:col-span-1">
              <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm sticky top-24 space-y-4">
                <h3 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3">
                  Bill Details
                </h3>

                <div className="space-y-2.5 text-xs sm:text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Item Total</span>
                    <span className="font-semibold text-gray-900">₹{totalAmount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Delivery Fee</span>
                    <span>FREE</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span className="text-gray-900 font-semibold">₹5.00</span>
                  </div>

                  <div className="border-t border-gray-100 pt-3 flex justify-between items-center text-base font-extrabold text-gray-900">
                    <span>To Pay</span>
                    <span className="text-[#E23744] text-lg font-black">
                      ₹{(totalAmount + 5).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-[#E23744] hover:bg-[#C92C38] text-white py-3 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                </button>

                <div className="flex items-center gap-2 text-[11px] text-gray-400 justify-center pt-1">
                  <FaShieldAlt className="text-emerald-600" />
                  <span>100% Secure Checkout</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
