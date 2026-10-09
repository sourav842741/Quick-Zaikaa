import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import {  setShopsOfCity, setUserData } from '../redux/userSlice'

function updateLocation() {
const {userData,socket}=useSelector(state=>state.user)
  useEffect(() => {
    if (!userData) return;

    async function updateMyLocation(lat, lng) {
      try {
        await axios.post(
          serverUrl + "/api/user/update-location",
          {
            latitude: lat,
            longitude: lng,
          },
          { withCredentials: true }
        );

        socket?.emit("user:location:update", {
          latitude: lat,
          longitude: lng,
        });
      } catch (err) {
        // Location update error handled quietly
      }
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        updateMyLocation(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => console.error(err),
      { enableHighAccuracy: false }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [userData, socket]);
}

export default updateLocation

