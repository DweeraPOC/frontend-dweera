import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { useAuth } from '../Middlewares/AuthContext';

export default function ProtectRoutes() {
    const auth = useAuth();
  return (
    <>
    {
      auth?.user.token 
      ? <Outlet /> 
      : <Navigate to="/login" replace={true} />
    }
    </>
  )
}
