import { StarIcon } from '@heroicons/react/24/solid';
import React from 'react'
import default_picture from "../../../assets/images/default_profile_picture.png"

export default function ReviewBox({ review }) {
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    return (
        <>
            <div className='flex justify-start items-start w-full gap-5 pb-6 border-b border-gray-100 my-2 overflow-hidden break-words px-2'>
                <div className='w-fit'>
                    <button type='button' className='w-10 h-10 flex justify-center items-center object-cover object-center overflow-hidden rounded-full '>
                        <img className='w-full h-full overflow-hidden' 
                            src={
                                review?.users_reviews_user_idTousers?.profile_photo 
                                ? `${process.env.REACT_APP_MAIN_URL}/images/users/${review?.users_reviews_user_idTousers?.profile_photo}`
                                : `${default_picture}`}
                            />
                    </button>
                </div>
                <div className='flex justify-start items-start flex-col w-full'>
                    <p className=' text-start flex justify-start items-start flex-col gap-2'>
                        <button type='button' className='text-start flex justify-start items-start flex-col'>
                            <span className='font-semibold hover:text-[#65D01E] text-lg text-gray-900 break-words'>{review?.users_reviews_user_idTousers?.first_name +" "+review?.users_reviews_user_idTousers?.last_name}</span>
                        </button>
                        <span className='flex flex-row justify-start items-center'>
                            {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                    key={rating}
                                    className={classNames(
                                        Math.floor(review?.rating) > rating
                                            ? " text-amber-400"
                                            : "text-gray-200",
                                        "h-5 w-5 flex-shrink-0"
                                    )}
                                    aria-hidden="true"
                                />
                            ))}
                        </span>
                        <span className='text-start text-lg font-medium break-words text-gray-900'>
                            {review?.review_comment || ''}
                        </span>
                    </p>
                </div>
            </div>
        </>
    )
}
