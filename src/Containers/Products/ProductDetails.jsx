import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

import CarouselV3 from "./CarouselV3";
import LocationMap from "../../Components/LocationMap/LocationMap";
import ProductOwner from "./ProductOwner";
import ProfileModal from "../UserProfile/ProfileModal";
import { useAuth } from "../../Middlewares/AuthContext";
import Footer from "../../Components/footer/Footer";
import LoadingPage from "../LoadingPage/LoadingPage";

export default function ProductDetails() {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const { slug,id } = useParams();
  const { t } = useTranslation();
  const auth = useAuth();
  const [offer, setOffer] = useState();
  const FormatterPrice = (price) => {
    return Number(price)?.toLocaleString("en-US", {
      style: "currency",
      currency: "MAD",
    });
  };
  const GetSelectedOffer = useCallback(async (id) => {
    try {
      setLoading(true)
      await axios
        .get(`${process.env.REACT_APP_MAIN_URL}/offers/get-offer-by-id/${id}`)
        .then((response) => {
          if(response.status === 200) setOffer(response.data.offer);
        });
      setLoading(false)
    } catch (err) {
      navigate("/", { replace: true });
    }
  }, []);

  const type_booking = {
    "Per_day" : "Per Day",
    "Per_hour" : "Per Hour"
  }

  //const v_slug = `${offer?.title}`.replace(/\s+/g,' ').trim().split(' ').join('-');
  //if(slug!==v_slug) navigate('/',{replace : true})

  useEffect(() => {
    //const id = slug.split('-').slice(-1)[0];
    GetSelectedOffer(id);
  }, []);
  return (
    <>
      {
        (loading)
          ? <div className="w-full h-screen justify-center items-center flex">
            <LoadingPage />
          </div>
          : (
            <>
              {<ProfileModal />}
              <div className="flex flex-col justify-between items-between">
                <div className="bg-white">
                  <div className="pt-6">
                    {/* Image gallery */}
                    <div className="mx-auto mt-6 max-w-2xl h-[500px] w-full">
                      <CarouselV3 Images={offer?.vehicles?.vehicle_images} />
                    </div>

                    {/* offer info */}
                    <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                      <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <div className="flex justify-start items-center mb-4">
                          <ProductOwner user={offer?.users_offers_created_byTousers} />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl break-words">
                          {offer?.title}
                        </h1>
                      </div>

                      {/* Options */}
                      <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <p className="text-3xl tracking-tight text-gray-900">
                          {FormatterPrice(offer?.price)}
                          <span className="ml-2 text-gray-400 font-medium text-xl italic">
                            {type_booking[offer?.type_booking] || "unknown"}
                          </span>
                        </p>

                        {/* Reviews */}
                        {/*<div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            Math.floor(offer?.Rating) > rating
                              ? " text-[#65D01E]"
                              : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      {offer?.Rating}
                    </span>
                  </div>
                </div>*/}

                        <div className="mt-10">
                          {
                            <NavLink
                              to={
                                auth?.user.token ? `/check-out/${offer?.offer_id}` : `/login`
                              }
                              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#65D01E] hover:text-white hover:no-underline py-3 px-8 text-base font-medium text-white hover:bg-[#5BBF18] focus:outline-none"
                            >
                              {t("Book")}
                            </NavLink>
                          }
                          {/**
                   * <button 
                    disabled
                    type="button"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#65D01E] disabled:opacity-50 py-3 px-8 text-base font-medium text-white cursor-not-allowed focus:outline-none"
                  >
                    Booking Unavailable 
                  </button>
                   */}
                        </div>
                      </div>

                      <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                        <div>
                          <h3 className="sr-only">Description</h3>

                          <div className="space-y-6">
                            <p className="text-base text-gray-900 break-words">
                              {offer?.offer_description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-10">
                          <h3 className="text-base font-semibold text-gray-900">
                            {t("Features")}
                          </h3>

                          <div className="mt-4">
                            <ul
                              role="list"
                              className="list-disc space-y-2 pl-4 text-sm"
                            >
                              {
                                !offer?.tags && <li className="text-gray-400 italic">none</li>
                              }
                              {offer?.tags &&
                                offer?.tags?.map((tag) => (
                                  <li key={tag} className="text-gray-400">
                                    {tag}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                        <div className="mt-10">
                          <h2 className="text-base font-semibold text-gray-900">
                            {t("Location")}
                          </h2>
                          <div className="mt-4 space-y-6 bg-gray-100 overflow-hidden rounded-md">
                            {<LocationMap vehicle={offer?.vehicles} height={"300px"} />}
                            {/*<p className="flex text-base font-medium text-black px-4 pb-4">
                      {offer?.vehicles?.location}
                        </p>*/}
                            <ul
                              role="list"
                              className="list-disc space-y-2 pl-4 text-sm"
                            >
                              {offer?.vehicles?.location &&
                                offer?.vehicles?.location?.map((l) => (
                                  <li key={`${l}`} className="text-base font-medium text-black px-4 pb-4 mx-4 my-2">
                                    {l?.Address}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fixed w-full bottom-0">
                  <Footer />
                </div>
              </div>
            </>
          )
      }
    </>
  );
}
