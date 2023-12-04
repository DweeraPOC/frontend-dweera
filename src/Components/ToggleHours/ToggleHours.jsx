import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import React from 'react'

export default function ToggleHours({ Hours,OnToggleSelected }) {
  return (
    <>
        <button
            type='button'
            className={
                (!Hours?.selected) 
                ? `flex justify-center w-32 items-center rounded-lg px-2 py-2 text-gray-800  border border-gray-800
                hover:bg-gray-100 text-sm font-medium gap-1.5 bg-white`
                : `flex justify-center w-32 items-center rounded-lg px-2 py-2 text-gray-100  border border-gray-100
                 text-sm font-medium bg-slate-900 gap-1.5`
            }
            onClick={
                () => { OnToggleSelected(Hours?.id)}
            }
        >
            <span>{Hours?.start || "00"}</span>
            <ArrowLongRightIcon className='block w-4 h-4' />
            <span>{Hours?.end || "00"}</span>
        </button>
    </>
  )
}
