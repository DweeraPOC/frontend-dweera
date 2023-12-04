import React, { useCallback, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import SideBar from "../Components/Navbar/SideBar";
import { useDispatch } from "react-redux";
import { SET_SEARCH_POSITION } from "../Redux/Actions/actions";
import VerifecationBar from "../Components/VerifecationBar/VerifecationBar";
import VerificationOtp from "../Components/VerificationOtp/VerificationOtp";
import jwt_decode from "jwt-decode";
import { useAuth } from "../Middlewares/AuthContext";

export default function AppLayout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useAuth();
  const GetGeolocation = useCallback(() => {
    navigator.geolocation.watchPosition(
      (position) => {
        navigator.geolocation.getCurrentPosition((position) => {
          const p = position.coords;
          var lat = p.latitude;
          var lng = p.longitude;
          dispatch(SET_SEARCH_POSITION(lat, lng, true));
        });
      },
      function (error) {
        if (error.code === error.PERMISSION_DENIED) var lat = 33.5731104;
        var lng = -7.589843399999999;
        dispatch(SET_SEARCH_POSITION(lat, lng, false));
      }
    );
  }, []);

  const getToken = () => {
    if(auth?.user?.token){
      return {
        success : true,
        info : jwt_decode(auth?.user?.token)
      }
    }
    return {
      success : false,
      info : null
    }
  } 
  useEffect(() => {
    GetGeolocation();
  }, [GetGeolocation]);
  return (
    <div className="relative z-50">
      {
        (getToken()?.info?.status==="inactive") && (
          <div className="absolute z-50 flex justify-center items-center h-screen bg-gray-100 w-full">
            <VerificationOtp email={getToken()?.info?.email} />
          </div>
        )
      }
      <div className="top-0 z-50 w-full">
        {!["/login/", "/login", "/signup", "/signup/",]?.includes(location?.pathname) ? (
          <>
            <Navbar />
          </>
        ) : null}
      </div>
      <div id="main">
        <Outlet />
      </div>
    </div>
  );
}
