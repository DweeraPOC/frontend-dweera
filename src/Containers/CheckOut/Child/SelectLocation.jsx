import { Fragment, useRef, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import React from 'react'

export default function SelectLocation({ Loactions,Selected,setLocation }) {
    const listRef = useRef(null);
    return (
        <>
            <div className="w-full">
                <Listbox value={Selected} onChange={setLocation}>
                    <div className="relative mt-1 z-20">
                        <Listbox.Button className="relative w-full select-text cursor-default rounded-lg bg-white py-2 text-gray-800 pl-3 pr-10 text-left focus:outline-none border border-gray-300 sm:text-sm">
                            <span className="block truncate">{Selected?.Address || "Select a location"}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options placeholder='Select a location' ref={listRef} className="absolute mt-1 flex flex-col gap-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {Loactions?.map((location, index) => (
                                    <Listbox.Option
                                        key={location?.id}
                                        className={({ active }) =>
                                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active || location?.id===Selected?.id ? 'bg-[#65D01E]/5 text-[#5cbf1a]' : 'text-gray-900'
                                            }`
                                        }
                                        value={location}
                                    >
                                        <span
                                            className={`block whitespace-normal truncate ${location?.id===Selected?.id ? 'font-medium' : 'font-normal'
                                        }`}
                                        >
                                            {location?.Address}
                                        </span>
                                        {location?.id===Selected?.id ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#65D01E]">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>
        </>
    )
}
