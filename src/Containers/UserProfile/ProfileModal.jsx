import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { MapPinIcon } from '@heroicons/react/24/solid'
import { StarIcon } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux'
import { SHOW_MODALBOX } from '../../Redux/Actions/actions'
import default_picture from "../../assets/images/default_profile_picture.png"

export default function ProfileModal() {
    let [user, setUser] = useState({})
    const status = useSelector(state => state.UserReducer.status);
    const selectedUser = useSelector(state => state.UserReducer.selectedUser);
    const dispatch = useDispatch();


    function closeModal() {
        dispatch(SHOW_MODALBOX(false,null));
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
  return (
    <>
        <Transition appear show={status} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
                    flex flex-col"
                >
                    <div className='flex justify-end items-start pb-2'>
                        <button 
                            className='flex justify-center items-center px-2 py-2 rounded-full bg-gray-100 cursor-pointer'
                            type='button'
                            onClick={closeModal}
                        >
                            <XMarkIcon 
                                className='block w-6 h-6'
                                aria-hidden={true}
                            />
                        </button>
                    </div>
                    <div 
                        className='bg-white md:max-h-[550px] lg:max-h-[580px] xl:max-h-[600px] max-h-[350px] 
                        w-full overflow-x-hidden overflow-y-auto'
                    >
                        <div id='header' className='flex justify-center items-center flex-col gap-2 w-full'>
                            <div className='flex justify-center items-center w-32 h-32 rounded-full bg-white overflow-hidden'>
                                <img
                                    src={
                                        (selectedUser?.profile_photo)
                                        ? `${process.env.REACT_APP_MAIN_URL}/images/users/${selectedUser?.profile_photo}`
                                        : default_picture
                                    }
                                    className='flex justify-center items-center object-cover object-center w-full h-full'
                                />
                            </div>
                            <p
                                className='text-2xl text-black font-bold w-2/4 text-center'
                            >
                                {
                                    selectedUser?.last_name && selectedUser?.first_name 
                                    ? selectedUser?.first_name +' '+ selectedUser?.last_name
                                    : 'unknown'
                                }
                            </p>
                            {/*<p className='text-lg text-gray-400 w-2/4 text-center'>
                                <span className='flex flex-row text-center justify-center items-center'>
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                            Math.floor(1.6 > rating) ? ' text-[#65D01E]' : 'text-gray-200',
                                            'h-5 w-5 flex-shrink-0'
                                        )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </span>
                                            </p>*/}
                            <p
                                className='text-lg text-gray-400 w-2/4 text-center justify-center items-center flex gap-1'
                            >
                                <span>
                                    <MapPinIcon 
                                        className='block w-6 h-6 text-[#65D01E]'
                                        aria-hidden={true}
                                    />
                                </span>
                                <span>
                                    {
                                        selectedUser?.address ? selectedUser?.address : 'unknown'
                                    }
                                </span>
                            </p>
                            <p className='w-full flex justify-center items-center text-center'>
                                <a
                                    href={
                                        selectedUser?.telephone 
                                        ? `tel:${selectedUser?.telephone}`
                                        : `#`
                                    } 
                                    className='w-full text-lg bg-[#F1FFE7] rounded-md py-3 text-black no-underline hover:no-underline focus:no-underline'
                                    
                                >
                                    {
                                        selectedUser?.telephone ? selectedUser?.telephone : 'unknown'
                                    }
                                </a>
                            </p>
                        </div>
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
