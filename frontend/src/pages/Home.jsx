import React from 'react'
import { useSelector } from 'react-redux'
import UserDashboard from '../components/UserDashboard'

import DeliveryBoy from '../components/DeliveryBoy'
import { FaUtensils } from "react-icons/fa";
import OwnerDashboard from '../components/OwnerDashboard';
import Footer from '../components/Footer';
function Home() {
    const {userData}=useSelector(state=>state.user)
  return (
    <div className='w-full min-h-screen flex flex-col bg-[#F9FAFB]'>
      {userData?.role === "user" && <UserDashboard />}
      {userData?.role === "owner" && <OwnerDashboard />}
      {userData?.role === "deliveryBoy" && <DeliveryBoy />}
      <Footer />
    </div>
  );
}

export default Home
