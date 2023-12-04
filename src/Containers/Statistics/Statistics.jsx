import React from 'react'
import { Helmet } from 'react-helmet'
import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { NavLink, useParams, useSearchParams } from 'react-router-dom'
import Analytics from './Childs/Analytics'
import Payment from './Childs/Payment'
import { useEffect } from 'react'

export default function Statistics() {
    const [searchParams,setSearchParams] = useSearchParams();
    const [tab,setTab] = useState(searchParams?.get("tab"));
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [Menus] = useState([
        {
            name : "Overview",
            path : "/analytics?tab=overview",
        },
        {
            name : "Payment",
            path : "/analytics?tab=payment"
        }
    ]);
    const Component = {
        overview : <Analytics />,
        payment : <Payment /> 
    }
    useEffect(() => {
        setTab(searchParams?.get("tab"))
    },[searchParams])
  return (
    <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>{`Dweera | Analytics`}</title>
            <meta name="description" content={`Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing`} />
            <meta name="keywords" content="Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing" />
        </Helmet>
        <div className='w-full h-full'>
            <div className='max-w-6xl mx-auto my-10 h-full w-full'>
                <div className='flex flex-col gap-4 w-full h-full'>
                    <div className='h-[10%] w-fit flex flex-row gap-5 my-2 border-b border-gray-300'>
                        {
                            Menus && Menus?.map((_,i) =>
                                <NavLink
                                    to={_?.path} 
                                    key={_?.path}
                                    className={({isActive}) => classNames('text-lg font-bold text-center px-4 py-3',
                                        (tab?.toLowerCase()===_?.name?.toLowerCase()) ? "border-b-2 border-[#65D01E] text-[#65D01E] focus:text-[#65D01E] hover:text-[#65D01E]" : "border-0 text-gray-800 focus:text-gray-800 hover:text-gray-800",
                                        'no-underline hover:no-underline focus:no-underline')
                                    }
                                >
                                    {_?.name}
                                </NavLink>
                            )
                        }
                    </div>
                    <div className='w-full h-[90%]'>
                        {
                            Component[tab] || Component["overview"]
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
