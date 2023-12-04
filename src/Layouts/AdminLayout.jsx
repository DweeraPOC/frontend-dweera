import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AsideBar from '../AdminSpace/components/AsideBar/AsideBar'
import { UserProvider } from '../AdminSpace/context/UserContext';
import SideBarMobile from '../AdminSpace/components/AsideBar/SideBarMobile';
import Menu from '../AdminSpace/components/Menu/Menu';
import { Bars4Icon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function AdminLayout() {
  const location = useLocation().pathname;
  const [isOpen,setIsOpen] = useState(false)
  return (
   <>
      <div className='w-screen h-screen flex flex-col justify-start lg:flex-row'>
        {
          location!=="/admin/login" && location!=="/admin/login/" ? (
            <div className='lg:w-1/6 w-auto'>
              <button type='button' onClick={() => setIsOpen(true)} className='flex lg:hidden justify-center mt-4 ml-4 mb-4 items-center text-gray-800 bg-gray-100 rounded-md overflow-hidden px-2 py-2'>
                <Bars4Icon className='block w-7 h-7' />
              </button>
              <div className='w-full h-full'>
                <Menu />
                <SideBarMobile isOpen={isOpen} setIsOpen={setIsOpen} />
              </div>
            </div>
          ) : null
        }
        <div id='main' className='lg:w-5/6 w-full h-full bg-gray-50 px-4 py-4'>
          <UserProvider>
            <Outlet />
          </UserProvider>
        </div>
      </div>
   </>
  )
}
