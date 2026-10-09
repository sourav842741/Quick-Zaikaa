import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaUtensils } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();

  const handleSignUp = async () => {
    if (!fullName || !email || !password) {
      setErrorMsg("Please fill in your name, email, and password.");
      return;
    }
    setErrorMsg("");
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { fullName, email, mobile, password, role },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMsg("");
    try {
      let mobileNumber = mobile;
      if (!mobileNumber) {
        mobileNumber = prompt("Please enter your mobile number:") || "";
        setMobile(mobileNumber);
      }

      const result = await signInWithPopup(auth, provider);
      if (result) {
        const { data } = await axios.post(
          `${serverUrl}/api/auth/googleauth`,
          {
            fullName: result.user.displayName || "User",
            email: result.user.email,
            mobile: mobileNumber,
            role,
          },
          { withCredentials: true }
        );
        dispatch(setUserData(data));
      }
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || "Google sign up failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 selection:bg-[#E23744]/20 selection:text-[#E23744]">
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-lg w-full max-w-md p-6 sm:p-8">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#E23744] flex items-center justify-center text-white shadow-sm mb-3">
            <FaUtensils className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Quick<span className="text-[#E23744]">Zaika</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Create an account to begin ordering delicious meals
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-3.5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:bg-white focus:border-[#E23744] focus:ring-2 focus:ring-[#E23744]/15 transition-all"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:bg-white focus:border-[#E23744] focus:ring-2 focus:ring-[#E23744]/15 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              placeholder="e.g. 9876543210"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:bg-white focus:border-[#E23744] focus:ring-2 focus:ring-[#E23744]/15 transition-all"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 pr-10 text-sm text-gray-800 placeholder-gray-400 outline-none focus:bg-white focus:border-[#E23744] focus:ring-2 focus:ring-[#E23744]/15 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              I want to join as:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "user", label: "Customer" },
                { id: "owner", label: "Restaurant" },
                { id: "deliveryBoy", label: "Delivery" },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    role === r.id
                      ? "bg-[#E23744] text-white border-[#E23744] shadow-xs"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            onClick={handleSignUp}
            disabled={loading}
            className="w-full mt-2 bg-[#E23744] hover:bg-[#C92C38] text-white font-bold py-3 rounded-xl text-sm shadow-sm transition-all active:scale-98 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-3">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-xs text-gray-400 font-semibold uppercase tracking-wider">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Google Sign Up */}
          <button
            onClick={handleGoogleAuth}
            className="w-full bg-white hover:bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 transition-all shadow-2xs active:scale-98 cursor-pointer"
          >
            <FcGoogle size={18} />
            <span>Sign up with Google</span>
          </button>
        </div>

        {/* Sign In Footer */}
        <p className="mt-6 text-center text-xs text-gray-500">
          Already have an account?{" "}
          <Link to="/signin" className="font-bold text-[#E23744] hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
