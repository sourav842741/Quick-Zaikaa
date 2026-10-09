import React from 'react';
import { FaUtensils, FaHeart, FaMotorcycle, FaStore } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-950 text-white w-full border-t border-gray-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-gray-800 text-xs sm:text-sm">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#E23744] flex items-center justify-center text-white">
                <FaUtensils className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Quick<span className="text-[#E23744]">Zaika</span>
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Fast, fresh and hygienic food delivered from your favorite local restaurants straight to your doorstep.
            </p>
          </div>

          {/* About & Navigation */}
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-gray-200 text-sm uppercase tracking-wider mb-1">Company</h4>
            <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">About Us</span>
            <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Team & Careers</span>
            <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Quick Zaika Blog</span>
          </div>

          {/* For Partners */}
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-gray-200 text-sm uppercase tracking-wider mb-1">Partner With Us</h4>
            <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
              <FaStore className="text-[#E23744]" />
              <span>Register Your Restaurant</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
              <FaMotorcycle className="text-[#E23744]" />
              <span>Ride With Us (Delivery)</span>
            </div>
          </div>

          {/* Service & Safety */}
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-gray-200 text-sm uppercase tracking-wider mb-1">Help & Support</h4>
            <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">FAQs</span>
            <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact Support</span>
            <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Terms & Conditions</span>
            <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} Quick Zaika Food Technologies. All rights reserved.</p>
          <p className="flex items-center gap-1 justify-center">
            Delivering smiles & food with <FaHeart className="text-[#E23744] text-[11px]" />
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
