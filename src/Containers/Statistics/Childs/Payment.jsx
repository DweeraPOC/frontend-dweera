import { InformationCircleIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { Helmet } from 'react-helmet'

export default function Payment() {
  return (
    <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>{`Dweera | Payment`}</title>
            <meta name="description" content={`Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing`} />
            <meta name="keywords" content="Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing" />
        </Helmet>
        <div className='w-full h-full'>
            <div className='w-full h-full p-6 font-semibold text-lg rounded-md bg-blue-100'>
              <p className="flex w-full flex-row gap-4 justify-start items-center">
                <InformationCircleIcon className="w-6 h-6 text-blue-400" />
                <span className="text-gray-600 font-semibold">This section is not available at this time</span>
              </p>
            </div>
        </div>
    </>
  )
}
