import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon,ChevronDownIcon, HomeIcon,UserIcon,QueueListIcon,PlusIcon,ArrowRightOnRectangleIcon,InboxArrowDownIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Middlewares/AuthContext';

export default function AsideBar() {
    const src = "https://api.dweera.ma/images/users/user_default.png";
    const Menu = [
        {
            type : "link",
            name : "Dashboard",
            path : "/admin/",
            icon : <HomeIcon 
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
            type : "link",
            name : "Offers",
            path : "/admin/manage-offers",
            icon : <QueueListIcon 
                aria-hidden='true'
                className='block w-5 h-5'            
            />
        },
        {
            type : "link",
            name : "Users",
            path : '/admin/manage-users',
            icon : <UserIcon 
                aria-hidden='true'
                className='block w-5 h-5'            
            />
        }
        ,
        {
            type : "link",
            name : "Create Admins",
            path : "/admin/create-admins",
            icon : <PlusIcon 
                aria-hidden='true'
                className='block w-5 h-5'            
            />
        },
    ]
    const auth = useAuth();
    const navigate = useNavigate();
    const Logout = () => {
        auth.Logout();
        navigate('/admin/',{replace : true});
    }
  return (
    <>
        <div className='h-full w-1/6 bg-gray-100 lg:flex flex-col gap-3 items-center hidden'>
            <header className='flex py-6 w-full bg-lime-500 justify-center items-center'>
                <h1 className='text-2xl text-gray-100 font-semibold'>Admin Space</h1>
            </header>
            <section className='flex py-5 w-full h-full'>
                <div className='w-full flex flex-col gap-4'>
                    {
                        Menu && Menu?.map((m) => 
                            m.type==="link"
                            ? (
                                <Disclosure key={m.name}>
                                    {({ open }) => (
                                        <>
                                            <NavLink
                                                to={m.path}
                                                className={({ isActive }) =>
                                                    isActive
                                                    ? `text-gray-100 font-medium w-full no-underline py-2
                                                    hover:no-underline focus:no-underline bg-gray-200 hover:bg-gray-200`
                                                    : "bg-gray-100 font-medium hover:bg-gray-200 hover:no-underline text-gray-600 w-full py-2"
                                                }
                                            >
                                                <Disclosure.Button className="w-full px-4 bg-gray flex gap-2 justify-start items-center text-lg text-gray-600 font-semibold">
                                                    {
                                                        m.icon
                                                    }
                                                    <span>
                                                        { m.name }
                                                    </span>
                                                </Disclosure.Button>
                                            </NavLink>
                                        </>
                                    )}
                                </Disclosure>
                            ) : (
                                <Disclosure key={m.name}>
                                    {({ open }) => (
                                        <>
                                            <div 
                                                className={
                                                    "bg-gray-400 font-medium hover:no-underline text-gray-800 w-full py-2"
                                            }
                                            >
                                                <Disclosure.Button className="w-full px-4 bg-gray flex justify-between items-center text-lg text-white">
                                                    <div className='flex gap-2 justify-start items-center w-full'>
                                                        {
                                                            m.icon
                                                        }
                                                        <span>
                                                            { m.name }
                                                        </span>
                                                    </div>
                                                    {
                                                        !open 
                                                        ? (
                                                            <ChevronDownIcon 
                                                                aria-hidden='true'
                                                                className='block w-5 h-5'            
                                                            />
                                                        )
                                                        : (
                                                            <ChevronUpIcon 
                                                                aria-hidden='true'
                                                                className='block w-5 h-5'            
                                                            />
                                                        )
                                                    }
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500 w-full flex justify-center items-center">
                                                    {
                                                        m.children && m.children?.map((c) => 
                                                            <NavLink
                                                                key={c.name}
                                                                to={c.path}
                                                                className={({ isActive }) =>
                                                                    isActive
                                                                    ? `text-gray-100 font-medium w-full no-underline py-2 px-6 flex justify-start items-center 
                                                                        gap-2 hover:no-underline focus:no-underline bg-lime-500 hover:bg-lime-600 hover:text-gray-100 focus:text-gray-100`
                                                                    : `bg-gray-400 font-medium no-underline hover:no-underline text-gray-100 py-2 px-6 flex justify-start items-center 
                                                                    gap-2 focus:no-underline w-full hover:text-gray-100 focus:text-gray-100`
                                                                }
                                                            >
                                                                {
                                                                    c.icon
                                                                }
                                                                <span>
                                                                    {
                                                                        c.name
                                                                    }
                                                                </span>
                                                            </NavLink>
                                                        )
                                                    }
                                                </Disclosure.Panel>
                                            </div>
                                        </>
                                    )}
                                </Disclosure>
                            )
                        )
                    }
                </div>
            </section>
            <footer className='bottom-0 w-full h-20 bg-gray-400 justify-center items-center flex'>
                <button className='h-full w-full px-2 gap-3 flex justify-center items-center bg-red-700 hover:bg-red-800' type='button' onClick={Logout}>
                    <ArrowRightOnRectangleIcon 
                        aria-hidden='true'
                        className='block w-7 h-7 text-white'            
                    />
                    <span className='text-xl text-white font-semibold'>Logout</span>
                </button>
            </footer>
        </div>
    </>
  )
}
