import React from 'react'
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

export default function ListOfHours({ HandleChangeDate,Hours,SelectedHours }) {
    const selected = SelectedHours?.times;
  return (
    <>
        <div className="w-full">
            <Listbox value={SelectedHours} onChange={(newValue) => {
                HandleChangeDate("time",newValue)
            }}>
                <div className="relative">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none border border-gray-300 sm:text-sm">
                    <span className="block truncate">{selected?.name}</span>
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
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {Hours?.map((time,index) => (
                        <Listbox.Option
                            key={time?.id}
                            className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active || time?.id===selected?.id  ? 'bg-[#65D01E]/5 text-[#5cbf1a]' : 'text-gray-900'
                            }`
                            }
                            value={time}
                        >
                            <span
                            className={`block truncate ${
                                time?.id===selected?.id ? 'font-medium' : 'font-normal'
                            }`}
                            >
                            {time?.name}
                            </span>
                            {
                                time?.id===selected?.id ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#65D01E]">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                ) : null
                            }
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
