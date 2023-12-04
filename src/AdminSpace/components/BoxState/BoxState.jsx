import React from 'react'
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/solid";

export default function BoxState({ info }) {
    return (
        <>
            <div className="rounded-md grow px-6 py-4 flex flex-col justify-between items-start bg-white border border-gray-200 w-full h-40">
                <div className='flex flex-col justify-start items-start h-1/3'>
                    <span className='flex justify-center items-center px-2 py-2 rounded-full bg-gray-100'>
                        { info?.icon }
                    </span>
                </div>
                <div className='w-full flex flex-col justify-start items-start h-2/3 pt-4 gap-2'>
                    <p className='text-3xl font-bold text-gray-900'>{info?.context}</p>
                    <div className='flex justify-between items-center flex-row w-full'>
                        <p className='text-sm text-gray-400'>{`Total ${info?.name}`}</p>
                        {/*<p className='flex flex-row justify-center items-center gap-1'>
                            <span className={`${info?.status=="up" ? 'text-lime-500' : 'text-red-500'}`}>
                                {
                                    info?.per
                                }
                            </span>
                            <span>
                                {
                                    info?.status=="up" ? <ArrowTrendingUpIcon className=' text-lime-500 w-5 h-5' /> : <ArrowTrendingDownIcon className=' text-red-500 w-5 h-5' />
                                }
                            </span>
                        </p>*/}
                    </div>
                </div>
            </div>
        </>
    )
}
