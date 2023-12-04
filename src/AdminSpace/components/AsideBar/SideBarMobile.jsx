import React from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink, useNavigate } from 'react-router-dom'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { HomeIcon, PlusIcon, QueueListIcon, RectangleStackIcon, UserIcon } from '@heroicons/react/24/solid'
import { useAuth } from '../../../Middlewares/AuthContext'

export default function SideBarMobile({isOpen,setIsOpen}) {
  const MenuList = [
    {
      type: "link",
      name: "Dashboard",
      path: "/admin/",
      icon: <HomeIcon
        aria-hidden='true'
        className='block w-5 h-5'
      />
    },
    // {
    //     type : "link",
    //     name : "Registered Email",
    //     path : "/admin/registered-email",
    //     icon : <InboxArrowDownIcon 
    //         aria-hidden='true'
    //         className='block w-5 h-5'            
    //     />
    // },
    {
      type: "link",
      name: "Offers",
      path: "/admin/manage-offers",
      icon: <QueueListIcon
        aria-hidden='true'
        className='block w-5 h-5'
      />
    },
    {
      type: "link",
      name: "Users",
      path: '/admin/manage-users',
      icon: <UserIcon
        aria-hidden='true'
        className='block w-5 h-5'
      />
    },
    {
      type: "link",
      name: "Bookings",
      path: '/admin/manage-bookings',
      icon: <RectangleStackIcon
        aria-hidden='true'
        className='block w-5 h-5'
      />
    },
    {
      type: "link",
      name: "Create Admins",
      path: "/admin/create-admins",
      icon: <PlusIcon
        aria-hidden='true'
        className='block w-5 h-5'
      />
    },
    {
      type: "link",
      name: "Change Password",
      path: "/admin/change-password",
      icon: <VpnKeyIcon
        aria-hidden='true'
        className='block w-5 h-5'
      />
    },
  ]

  const auth = useAuth();
  const navigate = useNavigate();
  const Logout = () => {
    auth.Logout();
    navigate('/admin/', { replace: true });
  }
  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden block" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="-translate-x-full"
                  enterTo="-translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="-translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-sm">
                    <div className="flex h-full flex-col overflow-hidden bg-white shadow-xl w-full px-5 py-8 overflow-y-auto">
                      <div className='w-full flex flex-row justify-end items-end text-end px-4 py-2'>
                        <button type='button' onClick={() => setIsOpen(false)} className='flex justify-center items-center bg-gray-100 rounded-full overflow-hidden px-2 py-2'>
                          <XMarkIcon className='block w-7 h-7 font-medium text-gray-500' />
                        </button>
                      </div>
                      <div>
                        <NavLink className={'no-underline hover:no-underline'} to={"/admin"}>
                          <img
                            className="w-auto h-10"
                            src="/images/logo_image.png"
                            alt=""
                          />
                        </NavLink>
                        <div className="flex flex-col justify-between flex-1 mt-6 relative h-full">
                          <nav className="-mx-3 space-y-6 w-full h-full flex flex-col justify-between">
                            <div className="space-y-3 h-full">
                              {
                                MenuList && MenuList?.map((_v,i) => 
                                  <>
                                    <NavLink
                                      className={({isActive}) => isActive ? "flex cursor-pointer items-center px-3 py-2 focus:text-lime-500 rounded-lg hover:text-lime-700 text-lime-500" : "flex items-center cursor-pointer px-3 py-2 focus:text-gray-700 text-gray-600 rounded-lg hover:text-gray-700"}
                                      to={_v?.path}
                                    >
                                      {_v?.icon}
                                      <span className="mx-2 text-sm font-medium">{_v?.name}</span>
                                    </NavLink>
                                  </>
                                )
                              }
                            </div>
                            <div className='bottom-0 absolute w-full'>
                              <button onClick={Logout} className='w-full px-4 py-2 bg-[#DA0037] hover:bg-[#c3123f] text-white font-bold text-lg rounded-md'>
                                Logout
                              </button>
                            </div>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
