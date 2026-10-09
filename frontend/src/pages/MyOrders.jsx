import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setMyOrders } from "../redux/userSlice";
import { FaArrowLeft, FaReceipt, FaShoppingBag, FaStore, FaClock } from "react-icons/fa";

export default function MyOrders() {
  const { myOrders, socket } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/order/getmy`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setMyOrders(res.data.orders));
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Realtime status updates via socket
  useEffect(() => {
    if (!socket) return;
    const handleStatus = (data) => {
      dispatch(
        setMyOrders(
          (myOrders || []).map((order) => {
            if (order._id === data.orderId) {
              return {
                ...order,
                shopOrders: order.shopOrders.map((so) =>
                  so._id === data.shopOrder._id
                    ? { ...so, status: data.shopOrder.status }
                    : so
                ),
              };
            }
            return order;
          })
        )
      );
    };

    socket.on("orders:statusUpdated", handleStatus);
    return () => socket.off("orders:statusUpdated", handleStatus);
  }, [socket, myOrders, dispatch]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "delivered") {
      return (
        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
          Delivered
        </span>
      );
    }
    if (s === "pending" || s === "preparing") {
      return (
        <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
          <FaClock size={10} />
          {status}
        </span>
      );
    }
    return (
      <span className="bg-orange-50 text-[#E23744] border border-orange-200 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
        {status || "Active"}
      </span>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#E23744] hover:border-[#E23744]/40 shadow-xs transition-colors cursor-pointer"
          >
            <FaArrowLeft size={14} />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              My Orders
            </h1>
            <p className="text-xs text-gray-500">
              Track active deliveries & view past meals
            </p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl h-36 border border-gray-100"></div>
            ))}
          </div>
        ) : !myOrders || myOrders.length === 0 ? (
          <div className="bg-white border border-gray-200/80 rounded-3xl p-12 text-center flex flex-col items-center justify-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-red-50 text-[#E23744] flex items-center justify-center text-2xl mb-3">
              <FaReceipt />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No orders yet</h3>
            <p className="text-xs text-gray-500 max-w-xs mb-5">
              You haven't placed any food orders yet. Start exploring delicious restaurants!
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-[#E23744] hover:bg-[#C92C38] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              Order Food Now
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {myOrders.map((order) => (
              <div
                key={order?._id}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-5 sm:p-6 space-y-4"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-gray-900 text-sm sm:text-base">
                        Order #{order?._id?.slice(-6)?.toUpperCase()}
                      </span>
                      {getStatusBadge(order?.shopOrders?.[0]?.status)}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {formatDate(order?.createdAt)} • Paid via {order?.paymentMethod?.toUpperCase()}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-gray-500 block">Total Amount</span>
                    <span className="text-base sm:text-lg font-black text-gray-900">
                      ₹{order?.totalAmount?.toFixed ? order.totalAmount.toFixed(2) : order?.totalAmount}
                    </span>
                  </div>
                </div>

                {/* Shop Orders */}
                {order?.shopOrders?.map((shopOrder, idx) => (
                  <div key={idx} className="bg-gray-50/70 border border-gray-150 rounded-xl p-3.5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FaStore className="text-[#E23744] text-xs" />
                        <span className="font-bold text-gray-800 text-sm">
                          {shopOrder?.shop?.name || "Restaurant"}
                        </span>
                      </div>

                      {order?._id && (
                        <button
                          onClick={() => navigate(`/track-order/${order._id}`)}
                          className="bg-white border border-gray-200 hover:border-[#E23744] text-[#E23744] px-3 py-1 rounded-lg text-xs font-bold transition-all shadow-2xs cursor-pointer"
                        >
                          Live Track
                        </button>
                      )}
                    </div>

                    {/* Ordered Items list */}
                    <div className="flex gap-3 overflow-x-auto pb-1">
                      {shopOrder?.items?.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="flex items-center gap-2.5 bg-white border border-gray-150 rounded-xl p-2 shrink-0 min-w-[170px]"
                        >
                          {item?.item?.image && (
                            <img
                              src={item.item.image}
                              alt={item?.item?.name}
                              className="w-10 h-10 object-cover rounded-lg shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-gray-800 truncate">
                              {item?.item?.name}
                            </p>
                            <p className="text-[11px] text-gray-500">
                              Qty: {item?.quantity} × ₹{item?.item?.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
