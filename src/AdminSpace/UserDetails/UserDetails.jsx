import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useUser } from '../context/UserContext'
import default_picture from "../../assets/images/default_profile_picture.png"


export default function UserDetails() {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const user = useUser();
    const selected = user?.selected;
    const closeModal = () => {
        user?.RestUser();
    }
  return (
    <>
        <Transition appear show={user?.selected.isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                    <Dialog.Panel 
                        className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all
                        flex flex-col gap-3"
                    >
                        <div id='body'
                            className='flex w-full gap-3 justify-start items-start relative py-2'
                        >
                            <div className='w-1/5'>
                                <div className={classNames('w-40 h-40 flex justify-center items-center overflow-hidden rounded-full relative ring-4',
                                    `${selected?.user?.status===null || selected?.user?.status==="active" ? "ring-lime-500" : "ring-red-500"}`
                                )}>
                                    <img
                                        className='flex justify-center items-center object-cover object-center rounded-full overflow-hidden' 
                                        src={
                                            selected?.user?.profile_photo 
                                            ? `${process.env.REACT_APP_MAIN_URL}/images/users/${selected?.user?.profile_photo}` 
                                            : default_picture
                                        }
                                    />
                                    <div className='absolute bottom-0'>
                                        <span className={classNames("text-xs font-medium px-2.5 py-0.5 rounded",
                                            `${selected?.user?.status===null || selected?.user?.status==="active" ? "bg-lime-500 text-lime-100" : "bg-red-500 text-red-100"}`
                                        )}>
                                            {
                                                selected?.user?.status===null || selected?.user?.status==="active" ? "active" : "blocked"
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='w-4/5'>
                                <div className="grid gap-6 mb-6 md:grid-cols-2 w-full">
                                    <div className='w-full'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">First name</label>
                                        <span 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                                        >
                                            {selected?.user?.first_name || 'null'}
                                        </span>
                                    </div>
                                    <div className='w-full'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Last name</label>
                                        <span 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                                        >
                                            {selected?.user?.last_name || 'null'}
                                        </span>
                                    </div>
                                    <div className='w-full'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Telephone</label>
                                        <span 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                                        >
                                            {selected?.user?.telephone || 'null'}
                                        </span>
                                    </div>
                                    <div className='w-full'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Gender</label>
                                        <span 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                                        >
                                            {selected?.user?.gender || 'null'}
                                        </span>
                                    </div>
                                    <div className='w-full col-span-2'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                        <span 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                                        >
                                            {selected?.user?.email || 'null'}
                                        </span>
                                    </div>
                                    <div className='w-full col-span-2'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Address</label>
                                        <span 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg h-20 w-full p-2.5 flex justify-start items-start" 
                                        >
                                            {selected?.user?.address || 'null'}
                                        </span>
                                    </div>
                                    <div className='w-full'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Rating</label>
                                        <span 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                                        >
                                            {selected?.user?.Rating || '1.0'}
                                        </span>
                                    </div>
                                    <div className='w-full'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Referral</label>
                                        <span 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                                        >
                                            {selected?.user?.referral || 'null'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id='footer' 
                            className='flex w-full justify-end items-center'
                        >
                            <button 
                                type='button'
                                onClick={closeModal}
                                className='flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 py-2 px-8 text-base font-medium text-black hover:bg-gray-100 focus:outline-none'
                            >
                                Close
                            </button>
                        </div>
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
        </Transition>
    </>
  )
}
