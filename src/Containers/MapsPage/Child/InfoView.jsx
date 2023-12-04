import React from 'react'
import CarouselV3 from '../../Products/CarouselV3'
import { NavLink } from 'react-router-dom'
import { BanknotesIcon } from '@heroicons/react/24/solid'

export default function InfoView({ offer }) {
    const FormatterPrice = (price) => {
        return Number(price)?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'MAD',
        });
    }
    const slug = `${offer?.title} ${offer?.offer_id}`.replace(/\s+/g,' ').trim().split(' ').join('-');

    const type_booking = {
        "Per_day" : "Per Day",
        "Per_hour" : "Per Hour"
      }
  return (
    <>
        <div className='flex justify-center items-center w-56 h-72 overflow-hidden flex-col gap-2 relative'>
            <div className='flex justify-center items-center h-1/2 w-full overflow-hidden rounded-md'>
                <NavLink className='line-clamp-1 text-lg text-gray-900 hover:no-underline rounded-md' to={`/offer-details/${offer?.offer_id}`}>
                    <CarouselV3 Images={offer?.vehicles?.vehicle_images} />
                </NavLink>
            </div>
            <div className='flex justify-start items-start h-1/2 w-full flex-col gap-1'>
                <h1 className='text-lg line-clamp-1 text-gray-800'>
                    <NavLink className='line-clamp-1 text-lg text-gray-900 hover:text-[#65D01E]' to={`/offer-details/${offer?.offer_id}`}>
                        {offer?.title || 'unknown'}
                    </NavLink>
                </h1>
                <p className='text-sm line-clamp-1 text-gray-400'>
                    { offer?.vehicles.location.Address || 'unknown'}
                </p>
                <p className='flex items-center justify-start gap-2 flex-row text-gray-800 text-xs'>
                    <BanknotesIcon className='block w-6 h-6 text-[#65D01E]' aria-hidden='true' />
                    <span className='flex flex-col justify-center items-center w-full'>
                        <span>{ FormatterPrice(offer?.price_perHour) || 'unknown'} / Hour</span>
                        {offer?.price_perDay && <span>{ FormatterPrice(offer?.price_perDay) } / Day</span>}
                    </span>
                </p>
                    <NavLink 
                        className='text-sm text-white hover:text-white mt-2 hover:bg-[#5cbf1b] bg-[#65D01E] hover:no-underline rounded-md py-2 w-full flex justify-center items-center text-center'
                        to={`/offer-details/${offer?.offer_id}`}
                    >
                        View More
                    </NavLink>
            </div>
        </div>
    </>
  )
}
