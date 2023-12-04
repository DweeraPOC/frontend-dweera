import React, { useCallback, useState } from 'react'
import default_picture from "../../assets/images/default_profile_picture.png";
import { MapPinIcon, StarIcon, UserIcon, UsersIcon } from '@heroicons/react/24/solid';
import ProductItem from '../Products/ProductItem'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../Middlewares/AuthContext';
import { useEffect } from 'react';
import LoadingPage from '../LoadingPage/LoadingPage';
import { format, parseISO } from 'date-fns';
import { Helmet } from 'react-helmet';

export default function ProfilePage() {
  const { id } = useParams();
  const reviews = {
    total: 450,
    review: [
      {
        stars: 5,
        rating: 280
      },
      {
        stars: 4,
        rating: 100
      },
      {
        stars: 3,
        rating: 30
      },
      {
        stars: 2,
        rating: 35
      },
      {
        stars: 1,
        rating: 5
      }
    ]
  }

  const auth = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const GetUserInfo = useCallback(async (_id) => {
    setLoading(true)
    await axios({
      method: "GET",
      url: `${process.env.REACT_APP_MAIN_URL}/users/profile-user/${_id}`,
      headers: {
        "x-access-token": auth?.user.token
      }
    })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          setUser(response.data);
        }
      })
      .catch((err) => {
        // 
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    GetUserInfo(id)
  }, [])

  const CalcTotalReviews = (reviews) => {
    var tt = 0;
    //offers?.forEach((v,i) => tt = tt + v?.reviews?.length);
    for (var i = 0; i < reviews?.length; i++) {
      tt = tt + reviews[i]?.rating;
    } 
    return tt;
  }
  const StructReviews = (reviews) => {
    const FilterAndReduce = (n) => [...reviews]?.filter((v) => v?.rating==n).length;
    let result = {
      total : reviews?.length,
      review: [
        {
          stars: 5,
          rating: FilterAndReduce(5) || 0
        },
        {
          stars: 4,
          rating: FilterAndReduce(4) || 0
        },
        {
          stars: 3,
          rating: FilterAndReduce(3) || 0
        },
        {
          stars: 2,
          rating: FilterAndReduce(2) || 0
        },
        {
          stars: 1,
          rating: FilterAndReduce(1) || 0
        }
      ]
    }

    return result;
  }

  function formatDate(d=null) {
    const date = new Date(d)
    return [
      padTo2Digits(date?.getDate()),
      padTo2Digits(date?.getMonth() + 1),
      date?.getFullYear(),
    ].join('/');
  }
  
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  return (
    <>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Dweera | {user?.first_name || ""} {user?.last_name || ""}</title>
          <link rel="canonical" href="https://dweera.ma" />
      </Helmet>
      {
        loading
          ? <div className='w-full h-full flex justify-center items-center'><LoadingPage /></div>
          : (
            <div className='flex w-full h-full max-w-full mx-auto my-6'>
              <div className='w-full h-full flex flex-col xl:flex-row px-8 py-4 gap-6 justify-start items-start'>
                <div className='xl:w-1/4 w-full gap-6 flex flex-col justify-center items-center overflow-hidden '>
                  <div className='border border-gray-200 rounded-md w-full gap-2 flex flex-col justify-center px-4 py-2 items-center overflow-hidden '>
                    <p
                      className='w-44 h-44 rounded-full border-2 border-[#65D01E] overflow-hidden'
                      style={{
                        backgroundImage: `url('${user?.profile_photo ? `${process.env.REACT_APP_MAIN_URL}/images/users/${user?.profile_photo}` : default_picture}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}></p>
                    <p>
                      <span className='w-full text-2xl text-center font-semibold text-gray-900 break-all overflow-hidden whitespace-normal'>
                        {user?.first_name || ""} {user?.last_name || ""}
                      </span>
                    </p>
                    <p className='w-full mb-4'>
                      <span className='flex w-full flex-row justify-center items-center '>
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={`${Math.floor(CalcTotalReviews(user?.reviews_reviews_owner_offerTousers) / user?.reviews_reviews_owner_offerTousers?.length) > rating ? "text-amber-400" : "text-gray-200"} h-5 w-5 flex-shrink-0`}
                            aria-hidden="true"
                          />
                        ))}
                        <span className='text-gray-500 text-sm font-semibold ml-2'>{`${(CalcTotalReviews(user?.reviews_reviews_owner_offerTousers) / user?.reviews_reviews_owner_offerTousers?.length)?.toFixed(1) || 0}`}</span>
                        <span className='text-gray-400 text-sm font-semibold ml-1'>{`(${user?.reviews_reviews_owner_offerTousers?.length || 0} reviews)`}</span>
                      </span>
                      <span className='w-full flex text-center break-words justify-center items-center font-medium text-base text-gray-900 mt-2'>
                        {user?.address}
                      </span>
                    </p>
                    <div className='w-full flex flex-col gap-2 mb-3'>
                      <p className='w-full flex flex-row justify-between items-center gap-2 '>
                        <span className=' flex items-center text-gray-800 text-base font-semibold'>
                          <UserIcon className='w-6 h-6 block mr-2 text-sm' />
                          Member since
                        </span>
                        <span className=' flex items-center font-medium text-base text-gray-900'>
                          { formatDate(user?.joining_date || new Date()) }
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-col w-full gap-4 px-5 py-4 border border-gray-200 rounded-md overflow-hidden'>
                    {
                      StructReviews(user?.reviews_reviews_owner_offerTousers || []) &&
                      StructReviews(user?.reviews_reviews_owner_offerTousers || [])?.review.map((_v, i) => {
                        const ps = Math.abs(Number(_v.rating) / Number(reviews.total) * 100).toFixed(2)
                        return (
                          <>
                            <div className='flex flex-row gap-2 justify-center items-center'>
                              <p className='flex justify-center items-center flex-row gap-2 text-lg text-gray-800 font-semibold'>{_v.stars} <span className='xl:block hidden'>stars</span></p>
                              <div class="w-full bg-gray-200 rounded-full h-3">
                                <div class="bg-amber-400 h-3 rounded-full" style={{ width: `${ps}%` }}></div>
                              </div>
                              <p className='flex justify-center items-center flex-row gap-1 text-gray-500 font-medium text-lg'>{_v.rating} <span className='xl:block hidden'>Reviews</span></p>
                            </div>
                          </>
                        )
                      })
                    }
                  </div>
                </div>
                <div className='xl:w-3/4 w-full flex justify-start items-center flex-row flex-wrap flex-shrink flex-grow gap-4'>
                  {
                    user?.offers_offers_created_byTousers && user?.offers_offers_created_byTousers?.map((v, i) =>
                      <ProductItem key={v?.offer_id} OfferData={v} type={"profile"} />
                    )
                  }
                </div>
              </div>
            </div>
          )
      }
    </>
  )
}
