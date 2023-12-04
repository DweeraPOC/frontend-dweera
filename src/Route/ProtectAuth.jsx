import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { useAuth } from '../Middlewares/AuthContext';

export default function ProtectAuth() {
    const auth = useAuth();
  return (
    <>
    {
      !auth?.user.token ? <Outlet /> : <Navigate to={"/"} replace={true} />
    }
    </>
  )
}
