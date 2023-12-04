import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CarouselV3 from '../../../Containers/Products/CarouselV3'
import { SHOW_MODAL_OFFER } from '../../../Redux/Actions/actions'
import { StarIcon,CheckBadgeIcon } from '@heroicons/react/24/solid'
import default_picture from "../../../assets/images/default_profile_picture.png"

export default function ModalOffer() {
    const status = useSelector(state => state.ModalReducer.status)
    const offer = useSelector(state => state.ModalReducer.offer)
    const dispatch = useDispatch();
    function closeModal() {
        dispatch(SHOW_MODAL_OFFER(false,null))
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const FormatterPrice = (price) => {
        return Number(price)?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'MAD',
        });
    }
  return (
    <>
    <Transition appear show={status} as={Fragment}>
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
                    <div>
                        <div className='flex flex-row justify-between items-center'>
                        <div className='flex flex-row justify-between gap-2'>
                            <span className='block w-14 h-14 overflow-hidden rounded-full border-2 border-[#65D01E]'>
                                <img 
                                    src={
                                        offer?.users_offers_created_byTousers?.profile_photo 
                                        ? `${process.env.REACT_APP_MAIN_URL}/images/users/${offer?.users_offers_created_byTousers?.profile_photo}`
                                        : default_picture
                                    }
                                    className='w-full h-full object-cover object-center'
                                />
                            </span>
                            <p className="flex flex-col items-start justify-evenly">
                                <span className='flex justify-center items-center gap-2'>
                                    <span>
                                        {offer?.users_offers_created_byTousers?.first_name|| ""}&nbsp; 
                                        {offer?.users_offers_created_byTousers?.last_name ||  ""}
                                    </span>
                                </span>
                               {/* <span className='flex flex-row'>
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                            Math.floor(offer?.users?.Rating || 1) > rating ? ' text-[#65D01E]' : 'text-gray-200',
                                            'h-5 w-5 flex-shrink-0'
                                        )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </span>*/}
                            </p>
                        </div>
                        </div>
                    </div>
                    <div id='body'
                        className='flex w-full gap-3'
                    >
                        <div className='flex justify-center items-center w-2/5 h-64 rounded-md overflow-hidden border border-gray-100'>
                            <CarouselV3 Images={offer?.vehicles?.vehicle_images} />
                        </div>
                        <div className='flex justify-start items-start flex-col gap-2 w-3/5'>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl line-clamp-2">{offer?.title}</h1>
                            <p className="text-base text-gray-900 line-clamp-4 whitespace-normal">
                                {
                                    offer?.offer_description
                                }
                            </p>
                            <p className='flex justify-start items-center gap-1'>
                                <span>Price : </span> 
                                {
                                    FormatterPrice(Number(offer?.price))
                                }
                                <span>{offer?.type_booking}</span>
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
