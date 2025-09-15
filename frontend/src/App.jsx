import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'

// Pages
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import EditShop from './pages/EditShop'
import AddItem from './pages/AddItem'
import EditItem from './pages/editItem'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckOutPage'
import OrderPlaced from './pages/OrderPlaced'
import MyOrders from './pages/MyOrders'
import PendingOrders from './pages/PendingOrders'
import TrackOrderPage from './pages/TrackOrderPage'
import MyDeliveredOrders from './pages/MyDeliveredOrders'
import ShopItems from './pages/ShopItems'

// Hooks
import getCurrentUser from './hooks/getCurrentUser'
import getCity from './hooks/getCity'
import getAllShops from './hooks/getAllShops'
import getCurrentShop from './hooks/getCurrentShop'
import getShopsByCity from './hooks/getShopsByCity'
import getItemsByCity from './hooks/getItemsByCity'
import getOwnerPendingOrders from './hooks/getOwnerPendingOrders'
import updateLocation from './hooks/updateLocation'

// Redux
import { setSocket } from './redux/userSlice'

// Server URL
export const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://quick-zaikaa.onrender.com"
    : "http://localhost:8000";

function App() {
  const { userData } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  // Call hooks once on mount
  useEffect(() => {
    getCurrentUser()
    getCity()
    getCurrentShop()
    getShopsByCity()
    getItemsByCity()
    getOwnerPendingOrders()
    updateLocation()
  }, [])

  // Socket setup
  useEffect(() => {
    const socketInstance = io(serverUrl, { withCredentials: true })
    dispatch(setSocket(socketInstance))

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id)
      if (userData?._id) {
        socketInstance.emit("identify", { userId: userData._id })
      }
    })

    return () => {
      socketInstance.disconnect()
    }
  }, [userData?._id, dispatch])

  return (
    <Routes>
      <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
      <Route path='/signin' element={!userData ? <SignIn /> : <Navigate to={"/"} />} />
      <Route path='/forgot-password' element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
      <Route path='/' element={userData ? <Home /> : <Navigate to={"/signin"} />} />
      <Route path='/editshop' element={userData ? <EditShop /> : <Navigate to={"/signin"} />} />
      <Route path='/additem' element={userData ? <AddItem /> : <Navigate to={"/signin"} />} />
      <Route path='/edititem/:itemId' element={userData ? <EditItem /> : <Navigate to={"/signin"} />} />
      <Route path='/cart' element={userData ? <CartPage /> : <Navigate to={"/signin"} />} />
      <Route path='/checkout' element={userData ? <CheckoutPage /> : <Navigate to={"/signin"} />} />
      <Route path='/order-placed' element={userData ? <OrderPlaced /> : <Navigate to={"/signin"} />} />
      <Route path='/my-orders' element={userData ? <MyOrders /> : <Navigate to={"/signin"} />} />
      <Route path='/pending-orders' element={userData ? <PendingOrders /> : <Navigate to={"/signin"} />} />
      <Route path='/my-delivered-orders' element={userData ? <MyDeliveredOrders /> : <Navigate to={"/signin"} />} />
      <Route path='/track-order/:orderId' element={userData ? <TrackOrderPage /> : <Navigate to={"/signin"} />} />
      <Route path='/shop-items/:shopId' element={userData ? <ShopItems /> : <Navigate to={"/signin"} />} />
    </Routes>
  )
}

export default App
