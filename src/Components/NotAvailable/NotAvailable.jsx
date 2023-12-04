import { FaceSmileIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function NotAvailable({ title,description }) {
  return (
    <>
        <div className='w-full justify-center items-center text-center flex flex-col gap-2 px-4 py-6 h-full mt-4'>
            <div className='flex flex-row gap-2 justify-center items-center'>
                <FaceSmileIcon className='block w-16 h-16 text-[#65D01E]' />
                <h1 className='text-gray-700 text-3xl sr-only'>{ title }</h1>
            </div>
            <p className='text-xl text-gray-400'>
                { description }
            </p>
        </div>
    </>
  )
}
