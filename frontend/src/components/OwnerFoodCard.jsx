import axios from 'axios';
import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setShop } from '../redux/userSlice';

export default function OwnerFoodCard({ item}) {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleDelete=async ()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/item/delete/${item._id}`,{withCredentials:true})
dispatch(setShop(result.data.shop))
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="flex bg-white rounded-2xl shadow-xs overflow-hidden border border-gray-200/80 w-full max-w-2xl hover:shadow-md transition-all">
      <div className="w-36 h-auto min-h-[120px] flex-shrink-0 bg-gray-50">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-between p-4 flex-1">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900">{item.name}</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
              {item.category || 'General'}
            </span>
          </div>
          {item.description && (
            <p className="text-gray-500 text-xs mt-1 line-clamp-2">{item.description}</p>
          )}
          <div className="mt-2 text-xs text-gray-500 flex items-center gap-3">
            <span className="font-semibold text-gray-600">
              Type: <span className={item.type === "veg" ? "text-emerald-600 font-bold" : "text-red-600 font-bold"}>{item.type || 'N/A'}</span>
            </span>
            <span>•</span>
            <span>
              {item.availability ? (
                <span className="text-emerald-600 font-bold">In Stock</span>
              ) : (
                <span className="text-red-500 font-bold">Out of Stock</span>
              )}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
          <span className="text-gray-900 font-black text-base">₹{item.price}</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => navigate(`/editItem/${item._id}`)}
              className="p-2 rounded-xl hover:bg-gray-100 text-gray-700 transition cursor-pointer"
              title="Edit Dish"
            >
              <FiEdit size={16} />
            </button>
            <button
              className="p-2 rounded-xl hover:bg-red-50 text-red-600 transition cursor-pointer"
              onClick={handleDelete}
              title="Delete Dish"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
