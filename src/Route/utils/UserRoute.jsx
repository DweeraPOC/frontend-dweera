import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import AddOffer from "../../Containers/AddOffer/AddOffer";
import MyOffers from "../../Containers/Offers/MyOffers";
import MyBookings from "../../Containers/myBooking/MyBookings";
import BookingRequest from "../../Containers/BookingRequest/BookingRequest";
import ProfileSetting from "../../Containers/ProfileSettings/ProfileSetting";
import ChangePassword from "../../Containers/ChangePassword/ChangePassword";
import CheckOut from "../../Containers/CheckOut/CheckOut";
import Signup from "../../Containers/SignUp/Signup";
import Login from "../../Containers/LoginPage/Login";
import HomePage from "../../Containers/HomePage/HomePage";
import ProductDetails from "../../Containers/Products/ProductDetails";
import NotFound from "../../Containers/NotFound/NotFound";
import Navbar from "../../Containers/Navbar/Navbar";
import SideBar from "../../Containers/Navbar/SideBar";
import ProtectRoutes from "../ProtectRoutes";
import ProtectAuth from "../ProtectAuth";
import CompleteProfile from "../../Containers/CompleteProfile/CompleteProfile";
import { getCookie } from "../../Hooks/Cookies/getCookie";

export default function UserRoute() {
  const location = useLocation();
  const RenderIfVerify = () => {
    if (getCookie("verify"))
      return (
        <>
          <Route path="/add-new-offer" element={<AddOffer />} />
          <Route path="/manage-my-offers" element={<MyOffers />} />
          <Route path="/manage-my-bookings" element={<MyBookings />} />
          <Route path="/booking-requests" element={<BookingRequest />} />
          <Route path="/profile-settings" element={<ProfileSetting />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/check-out/:id" element={<CheckOut />} />
        </>
      );
    else return null;
  };
  return (
    <>
      {/*Navbar must be inside Router because it uses navlinks (links should always be inside router component*/}
      {location.pathname === "/login" ||
      location.pathname === "/signup" ? null : (
        <div className="sticky top-0 z-40">
          <Navbar />
          {location.pathname === "/" ? <SideBar /> : null}
        </div>
      )}
      {getCookie("jwt-token") && !getCookie("verify") ? (
        <CompleteProfile />
      ) : null}
      <Routes>
        {/**
         * protect route from any unauth user
         */}
        <Route element={<ProtectRoutes />}>{RenderIfVerify()}</Route>

        <Route element={<ProtectAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route exact path="/" element={<HomePage />} />
        <Route path="/offer-details/:id" element={<ProductDetails />} />
        {/*<Route path="/soon" element={<Soon />} />*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
