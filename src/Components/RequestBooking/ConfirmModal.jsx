import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function ConfirmModal({ isOpen,HandleClose,action,confirm }) {
    const type_action = {
        "cancel" : "cancel-booking",
        "approval" : "approval-booking",
        "deny" : "rejected-booking"
    }
    
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 shadow-md" onClose={HandleClose}>
                    {<Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>}

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full relative max-w-sm transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">

                                    <Dialog.Title
                                        as="h3"
                                        className="text-xl font-medium leading-6 text-gray-900"
                                    >
                                        Confirmation
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-lg text-gray-500">
                                            Are you sure to {action?.name} the booking
                                        </p>
                                    </div>

                                    <div className="mt-4 flex w-full gap-2 justify-between">
                                        <button
                                            type="button"
                                            className={
                                                `inline-flex relative justify-center rounded-md border border-transparent ${action?.name==="approval" ? "bg-[#65D01E] hover:bg-[#58b51a]" : "bg-red-700 hover:bg-red-700/90"} px-5 py-1.5 text-sm font-medium text-white focus:outline-none`
                                            }
                                            onClick={() => confirm(type_action[action?.name],action?.id)}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-gray-300 px-5 py-1.5 text-sm font-medium text-gray-800 focus:outline-none"
                                            onClick={HandleClose}
                                        >
                                            No
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
