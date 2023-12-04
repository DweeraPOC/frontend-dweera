import React from 'react'
import { Route, Routes } from 'react-router-dom'

import AppLayout from '../Layouts/AppLayout'
import HomePage from '../Containers/HomePage/HomePage'
import AdminLayout from '../Layouts/AdminLayout'
import AdminHome from '../AdminSpace/pages/home/Home'
import ProtectedRoutes from './ProtectedRoutes'
import { useAuth } from './AuthContext'
import AdminLogin from '../AdminSpace/pages/login/AdminLogin'
import NotFound from '../Containers/NotFound/NotFound'
import ChangePassword from '../Containers/ChangePassword/ChangePassword'
import ProfileSetting from '../Containers/ProfileSettings/ProfileSetting'
import BookingRequest from '../Containers/BookingRequest/BookingRequest'
import Signup from '../Containers/SignUp/Signup'
import Login from '../Containers/LoginPage/Login'
import MyOffers from '../Containers/Offers/MyOffers'
import UserPage from '../Containers/myBooking/MyBookings'
import AdminOffersList from '../AdminSpace/pages/list/OffersList'
import AdminSignUp from '../AdminSpace/pages/signup/AdminSignUp'
import UsersPage from '../AdminSpace/pages/Users/UsersPage'
import MarketingPage from '../AdminSpace/pages/MarketingPage/MarketingPage'
import ForgotPassword from '../Containers/ForgetPassword/forgetPassword'
import ResetPassword from '../Containers/ResetPassword/ResetPassword'
import PrivacyPolicy from '../Containers/PrivacyPolicy/PrivacyPolicy'
import NewCheckOut from '../Containers/CheckOut/NewCheckOut'
import NewOffre from '../Containers/AddOffer/newOffre'
import EditOffer from '../Containers/EditOffer/EditOffer'
import ContactUs from '../Containers/ContactUs/ContactUs'
import OfferDetails from '../Components/OfferDetails/OfferDetails'
import ProfilePage from '../Containers/ProfilePage/ProfilePage'
import Statistics from '../Containers/Statistics/Statistics'
import Payment from '../Containers/Statistics/Childs/Payment'
import Analytics from '../Containers/Statistics/Childs/Analytics'
import CGV from '../Components/CGV/CGV'
import Bookings from '../AdminSpace/pages/Bookings/Bookings'
import Test from './Test'
import PaymentSuccess from '../Containers/Payment/PaymentSuccess'
import PaymentFail from '../Containers/Payment/PaymentFail'
import ChangePasswordAdmin from '../AdminSpace/pages/ChangePassword'

export default function BrowserRoutes() {
    const auth = useAuth();
  return (
    <div className=''>
        <Routes >
          {/** app basename */}
          {
            (auth?.user.role!=="admin" && auth?.user.role!=="super_admin")
            ? (
                <Route path="" element={<AppLayout />}>
                    <Route index element={<HomePage />} />
                    {/*<Route path="/test-dweera" element={<Test />} />*/}
                    <Route path="callback" element={<div>CMI callback</div>} />
                    <Route element={<ProtectedRoutes redirectPath={`/`} authorized={!auth?.user.token}/>}>
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/forgotPasword" element={<ForgotPassword />} />
                      <Route path="/resetPasword/:id" element={<ResetPassword />} />
                    </Route>

                    <Route element={<ProtectedRoutes redirectPath={`/login`} authorized={auth?.user.token}/>}>
                      <Route path="/add-new-offer" element={<NewOffre />} />
                        {/*<Route path="/edit-offer" element={<EditOffer />} />*/}
                        <Route path="/manage-my-offers" element={<MyOffers />} />
                        <Route path="/manage-my-bookings" element={<UserPage />} />
                        <Route path="/booking-requests" element={<BookingRequest />} />
                        <Route path="/profile-settings" element={<ProfileSetting />} />
                        {<Route path="/analytics" element={<Statistics />} />}
                        <Route path="/change-password" element={<ChangePassword />} />
                        <Route path="/check-out/:id" element={<NewCheckOut />} />
                        {<Route path="/user/:id" element={<ProfilePage />} />}
                        <Route path="payment-process-success/:token" element={<PaymentSuccess />} />
                        <Route path="payment-process-fail" element={<PaymentFail />} />
                    </Route>

                    {/*<Route element={<ProtectedRoutes redirectPath={'/'} authorized={auth?.user.token && auth?.user.verify==="new"} />}>
                      <Route path='/complete-profile' element={<CompleteProfile />} />
                    </Route>*/}
                    <Route path="/Contact-Us" element={<ContactUs />} />
                    <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-sales" element={<CGV />} />
                    <Route path="/offer-details/:id" element={<OfferDetails />} />
                    <Route path="*" element={<NotFound redirectPath={'/'} />} />
                </Route>
            )
            : null
          }

          {/** admin basename */}
          {
            (auth?.user.role!=="user")
            ? (
              
                <Route path="/admin" element={<AdminLayout />}>
                    <Route element={<ProtectedRoutes redirectPath={'/admin/login'} authorized={auth?.user.token && auth?.user.role!=="user"}/>}>
                        <Route index element={<AdminHome />} />
                        <Route path="/admin/manage-offers" element={<AdminOffersList />} />
                        <Route path="/admin/manage-users" element={<UsersPage />} />
                        <Route path="/admin/manage-bookings" element={<Bookings />} />
                        <Route path="/admin/create-admins" element={<AdminSignUp />} />
                        <Route path="/admin/registered-email" element={<MarketingPage />} />
                        <Route path="/admin/change-password" element={<ChangePasswordAdmin />} />
                        <Route path="/admin/*" element={<NotFound redirectPath={'/admin'} />} />
                    </Route>
                    <Route element={<ProtectedRoutes redirectPath={"/admin"} authorized={!auth?.user.token}/>}>
                        <Route path='/admin/login' element={<AdminLogin />} />
                    </Route>
                    <Route path="*" element={<NotFound redirectPath={'/admin'} />} />
                </Route>
            )
            : null
          }

          {/** root basename */}
          {/*<Route path="/" element={<RootLayout />}>
            <Route index element={<Soon />} />
          </Route>*/}
          {
            (auth?.user?.role==="user")
            ?  <Route path="*" element={<NotFound redirectPath={'/'} />} />
            :  <Route path="*" element={<NotFound redirectPath={'/admin'} />} />
          }

          {/** general error element*/}
          {/*<Route path='*' element={<NotFound redirectPath={'/'} />} />*/}
        </Routes>
    </div>
  )
}
