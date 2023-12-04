import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CarouselV3 from '../Products/CarouselV3'
import { StarIcon,CheckBadgeIcon,XCircleIcon, BanknotesIcon } from '@heroicons/react/24/solid'
import { useTranslation } from 'react-i18next'

export default function ViewModal({ offer,status,Close }) {
    //const [status,setStatus] = useState(true);

    const { t } = useTranslation();
    const FormatterPrice = (price) => {
        return Number(price)?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'MAD',
        });
    }
    const type_booking = {
        "Per_day" : "Per Day",
        "Per_hour" : "Per Hour"
      }
  return (
    <>
    <Transition appear show={status} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={Close}>
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
                        className='flex w-full gap-3 md:flex-row flex-col'
                    >
                        <div className='flex justify-center items-center w-full md:w-2/5 md:h-64 h-80 rounded-md overflow-hidden border border-gray-100'>
                            <CarouselV3 Images={offer?.vehicles?.vehicle_images} />
                        </div>
                        <div className='flex justify-start items-start flex-col gap-2 w-full md:w-3/5'>
                            <h1 className="flex w-full text-2xl font-bold text-gray-900 sm:text-3xl">{offer?.title}</h1>
                            <p className="text-base text-gray-900 line-clamp-4 whitespace-normal break-words">
                                {
                                    offer?.offer_description
                                }
                            </p>
                            <p className='flex justify-start items-center gap-2'>
                                <span>Price : </span> 
                                {
                                    offer?.available_day_hours?.availablity.map(entry => {
                                    const key = Object.keys(entry)[0];
                                    const value = entry[key];
                                    return `${FormatterPrice(value)} / ${t(key)}\n`;
                                })
                                }
                            </p>
                            <p className='flex justify-start items-center gap-1'>
                                <span>Status : </span> 
                                <span>{offer?.offer_status}</span>
                            </p>
                        </div>
                    </div>
                    <div id='footer' 
                        className='flex w-full justify-end items-center'
                    >
                        <button 
                            type='button'
                            onClick={Close}
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
