import React from 'react'
import GalleryOffer from './Child/GalleryOffer'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useCallback } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../Middlewares/AuthContext';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react'
import GoogleButton from '../GoogleButton/Googleloginbutton';
import LocationOffers from './Child/LocationOffers';
import ProfileModal from '../../Containers/UserProfile/ProfileModal';
import ProductOwner from '../../Containers/Products/ProductOwner';
import ReviewBox from './Child/ReviewBox';
import LoadingPage from '../../Containers/LoadingPage/LoadingPage';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import './style.css'
export default function OfferDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  
  const navigate = useNavigate();
  const auth = useAuth();

  const [loading, setLoading] = useState(false);
  const [offer, setOffer] = useState(null);
  const [tabs, setTabs] = useState([
    {
      name: t("Description"),
      selected: false
    },
    {
      name: t("Locations"),
      selected: false
    },
    {
      name: t("Reviews"),
      selected: false
    }
  ]);

  const [selected, setSelected] = useState(0);
  
  const HandleChange = (v) => {
    setSelected(v)
  }
  
  const GetSelectedOffer = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_MAIN_URL}/offers/get-offer-by-id/${id}`);
      
      if (response.status === 200) {
        setOffer(response.data.offer);
        console.log(response.data.offer);
       ;
      }
    } catch (err) {
      console.error(err);
      // Handle error and navigation here
    } finally { 
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    GetSelectedOffer();
    
  }, [GetSelectedOffer])

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const FormatterPrice = (price) => {
    return Number(price)?.toLocaleString("en-US", {
      style: "currency",
      currency: "MAD",
    }).replace("MAD", "") + " MAD";
  };
  const PriceType = {
    "perHour" : "Hour",
    "perHalfDay" : "Half Day",
    "perDay" : "Day",
    "perWeek" : "Week",
    "perMonth" : "Month"
  }

  const ButtomSection = () => {
    return (
      <>
          <Tab.Group>
            <Tab.List className={`border-b border-gray-100 flex justify-start items-center gap-10 text-sm font-medium mb-4`}>
              {
                tabs && tabs?.map((_t, i) =>
                  <Tab key={_t?.name} className={({ selected }) => `py-2 ${selected ? 'border-b-2 border-[#65D01E] text-[#65D01E]' : ' text-gray-400'} outline-none flex justify-center items-center flex-row`}>
                    {_t?.name}
                    {["Reviews"]?.includes(_t?.name) && <span className='flex justify-center items-center ml-2 px-1.5 py-0.5 rounded-full text-gray-50 font-semibold text-xs bg-gray-400'>
                      {offer?.reviews?.length || 0}
                    </span>
                    }
                  </Tab>
                )
              }
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <p className='break-words text-xl text-gray-900 font-medium'>
                  {
                    offer?.offer_description
                  }
                </p>
              </Tab.Panel>
              <Tab.Panel>
                <div className="mt-4 space-y-6 bg-gray-100 overflow-hidden rounded-md">
                  {<LocationOffers isView={true} vehicle={offer?.vehicles} height={"300px"} />}
                  <ul
                    role="list"
                    className="list-disc space-y-2 pl-4 text-sm"
                  >
                    {offer?.vehicles?.location &&
                      offer?.vehicles?.location?.map((l) => (
                        <li key={`${l}`} className="text-base font-medium text-gray-900 px-4 pb-4 mx-4 my-2">
                          {l?.Address}
                        </li>
                      ))}
                  </ul>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className='flex flex-col w-full gap-2 break-all'>
                  {
                    offer?.reviews?.length>0 
                    ? (offer?.reviews.map((_r, index) =>
                      <ReviewBox key={index} review={_r} />
                    ))
                    : (
                      <div className='flex justify-center items-center w-full h-14 bg-amber-50 rounded-md italic font-medium text-lg text-gray-500'>
                        {t("There are no reviews for this offer")}
                      </div>
                    )
                  }
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
      </>
    )
  }

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>{`Dweera | ${offer?.title}`}</title>
        <meta name="description" content={`${offer?.offer_description}`} />
        <meta name="keywords" content="Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing" />
    </Helmet>
      {
        (loading)
          ? <div className="w-full h-screen justify-center items-center flex">
            <LoadingPage />
          </div>
          : (
            <>
              {<ProfileModal />}
              <div className='max-w-7xl justify-center w-full items-center flex mx-auto flex-col px-4 py-4'>
                <div className='w-full lg:grid lg:grid-cols-3 flex flex-col lg:gap-10 gap-6'>
                  <div className='w-full lg:col-span-2'>
                    <GalleryOffer HandleChange={HandleChange} selected={selected} images={offer?.vehicles?.vehicle_images || []} />
                    <div className='my-10 lg:block hidden'>
                      <ButtomSection />
                    </div>
                  </div>
                  <div className='w-full lg:col-span-1'>
                    <div className='mb-4'>
                      <h1 className='text-3xl font-semibold text-gray-900 break-words'>{offer?.title}</h1>
                    </div>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            Math.floor(offer?.reviews.reduce((a, b) => a + b.rating, 0) / offer?.reviews.length) > rating
                              ? " text-amber-400"
                              : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                      <span className='ml-2 text-center font-semibold text-gray-400'>{offer?.reviews?.length || 0} {t("Reviews")}</span>
                    </div>
                    <div className='mt-10'>
                        {offer?.available_day_hours?.availablity?.map((option, index) => (
                          <div key={index} className='text-2xl font-semibold text-gray-900'>
                            {option.perHour && (
                              <p>
                                <span className='label'>Hour</span>       :{" "}
                                <span className='price'>{FormatterPrice(option.perHour)}</span>
                              </p>
                            )}
                            {option.perHalfDay && (
                              <p>
                                <span className='label'>1/2 Day</span>  :{" "}
                                <span className='price'>{FormatterPrice(option.perHalfDay)}</span>
                              </p>
                            )}
                            {option.perDay && (
                              <p>
                                <span className='label'>Day</span>         :{" "}
                                <span className='price'>{FormatterPrice(option.perDay)}</span>
                              </p>
                            )}
                            {option.perWeek && (
                              <p>
                                <span className='label'>Week</span>     :{" "}
                                <span className='price'>{FormatterPrice(option.perWeek)}</span>
                              </p>
                            )}
                            {option.perMonth && (
                              <p>
                                <span className='label'>Month</span>   :{" "}
                                <span className='price'>{FormatterPrice(option.perMonth)}</span>
                              </p>
                            )}
                          </div>
                        ))}
                      </div>



                    <div className=' mt-6 mb-6'>
                      <h3 className="text-base font-semibold text-gray-900 mb-2">
                        {t("Features")}
                      </h3>
                      <ul
                        role="list"
                        className="list-disc space-y-2 pl-4 text-sm"
                      >
                        {
                          !offer?.vehicles?.tags && <li className="text-gray-400 italic">none</li>
                        }
                        {offer?.vehicles?.tags &&
                          offer?.vehicles?.tags?.map((tag) => (
                            <li key={tag} className="text-gray-400">
                              {tag}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="flex justify-start items-center mb-4">
                      <ProductOwner user={offer?.users_offers_created_byTousers} />
                    </div>
                    <div className='mt-6'>
                      {
                        auth?.user.token
                          ?
                          (<NavLink
                            to={
                              auth?.user.token ? `/check-out/${offer?.offer_id}` : `/login`
                            }
                            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#65D01E] hover:text-white hover:no-underline py-3 px-8 text-base font-medium text-white hover:bg-[#5BBF18] focus:outline-none"
                          >
                            {t("Book")}
                          </NavLink>)
                          : (
                            <>
                              <div>
                                <GoogleButton type={'Sign in'} />
                                <div
                                  className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 
            after:border-t after:border-gray-300 after:mt-0.5"
                                >
                                  <p className="text-center font-semibold mx-4 mb-0">{t("Or")}</p>
                                </div>
                                <NavLink
                                  to={"/login"}
                                  className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-200 hover:text-gray-900 font-semibold hover:no-underline py-2 px-8 text-sm text-gray-900 hover:bg-gray-300 focus:outline-none"
                                >
                                  {t("Login")}
                                </NavLink>
                              </div>
                            </>
                          )
                      }
                    </div>
                  </div>
                  <div className='my-10 lg:hidden block'>
                    <ButtomSection />
                  </div>
                </div>
              </div>
            </>
          )
      }
    </>
  )
}
