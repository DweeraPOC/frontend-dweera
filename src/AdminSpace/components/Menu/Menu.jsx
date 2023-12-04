import { Bars4Icon, HomeIcon, PlusIcon, QueueListIcon, RectangleStackIcon, UserIcon } from '@heroicons/react/24/solid';
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Middlewares/AuthContext';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

export default function Menu() {
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
      {/* component */}
      <aside className="lg:flex hidden flex-col w-full h-full px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l">
        <NavLink className={'no-underline hover:no-underline'} to={"/admin"}>
          <img
            className="w-auto h-10"
            src="/images/logo_image.png"
            alt=""
          />
        </NavLink>
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className="-mx-3 space-y-6 ">
            <div className="space-y-3 ">
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
          </nav>
        </div>
        <div>
          <button onClick={Logout} className='w-full px-4 py-2 bg-[#DA0037] hover:bg-[#c3123f] text-white font-bold text-lg rounded-md'>
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
