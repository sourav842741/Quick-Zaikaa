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

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();

  const handleSignIn = async () => {
    if (!email || !password) {
      setErrorMsg("Please fill in both email and password.");
      return;
    }
    setErrorMsg("");
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || "Sign in failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMsg("");
    try {
      const result = await signInWithPopup(auth, provider);
      if (result) {
        const { data } = await axios.post(
          `${serverUrl}/api/auth/googleauth`,
          {
            fullName: result.user.displayName || "User",
            email: result.user.email,
            role: "user",
            mobile: result.user.phoneNumber || "",
          },
          { withCredentials: true }
        );
        dispatch(setUserData(data));
      }
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || "Google sign in failed.");
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
            Welcome back! Sign in to order your favorite dishes
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
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

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-xs font-bold text-[#E23744] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full bg-[#E23744] hover:bg-[#C92C38] text-white font-bold py-3 rounded-xl text-sm shadow-sm transition-all active:scale-98 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-xs text-gray-400 font-semibold uppercase tracking-wider">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleAuth}
            className="w-full bg-white hover:bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 transition-all shadow-2xs active:scale-98 cursor-pointer"
          >
            <FcGoogle size={18} />
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Sign Up Footer */}
        <p className="mt-6 text-center text-xs text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="font-bold text-[#E23744] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
