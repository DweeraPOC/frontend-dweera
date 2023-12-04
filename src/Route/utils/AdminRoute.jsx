import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from '../../AdminSpace/pages/login/AdminLogin'
import AdminHome from '../../AdminSpace/pages/home/Home'
import AdminOffersList from '../../AdminSpace/pages/list/OffersList'
import Signup from '../../AdminSpace/pages/signup/AdminSignUp'
import ProtectRoutes from '../ProtectRoutes'
import ProtectAuth from '../ProtectAuth'

export default function AdminRoute() {
  return (
    <>
        <Routes>
          <Route element={<ProtectAuth />}>
            <Route path='/login' element={<AdminLogin />} />
          </Route>
          <Route element={<ProtectRoutes />}>
            <Route exact path='/' element={<AdminHome />} />
            <Route path='/offers' element={<AdminOffersList />} />
            <Route path='/create-admins' element={<Signup />} />
          </Route>
        </Routes>
    </>
  )
}
