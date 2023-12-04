import React from "react";
import CarouselV3 from "./CarouselV3";
import { StarIcon } from "@heroicons/react/24/solid";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import ElectricBikeIcon from "@mui/icons-material/ElectricBike";
import { NavLink, useNavigate } from "react-router-dom";
import default_picture from "../../assets/images/default_profile_picture.png";
import LazyLoad from 'react-lazyload';
import { Img } from 'react-image';


export default function ProductItem({ OfferData, t ,type="home" }) {
  const navigate = useNavigate();
  const ScootersIcon = (props) => {
    const name = props.name;
    const { width, height, color } = props.style;
    return (
      <>
        {name === "Scooter" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={`${width}`}
            height={`${height}`}
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill={`${color}`}
              d="M7.82 19H15v-1c0-2.21 1.79-4 4-4h.74l-1.9-8.44A2.009 2.009 0 0 0 15.89 4H12v2h3.89l1.4 6.25h-.01A6.008 6.008 0 0 0 13.09 17H7.82a2.996 2.996 0 0 0-3.42-1.94c-1.18.23-2.13 1.2-2.35 2.38A3.002 3.002 0 0 0 5 21c1.3 0 2.4-.84 2.82-2M5 19c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1m14-4c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3m0 4c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={`${width}`}
            height={`${height}`}
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill={`${color}`}
              d="M7.82 16H15v-1c0-2.21 1.79-4 4-4h.74l-1.9-8.44A2.009 2.009 0 0 0 15.89 1H12v2h3.89l1.4 6.25h-.01A6.008 6.008 0 0 0 13.09 14H7.82a2.996 2.996 0 0 0-3.42-1.94c-1.18.23-2.13 1.2-2.35 2.38A3.002 3.002 0 0 0 5 18c1.3 0 2.4-.84 2.82-2M5 16c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1m14-4c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3m0 4c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1m-8 4H7l6 3v-2h4l-6-3v2Z"
            />
          </svg>
        )}
      </>
    );
  };
  // select type of icon with name
  const TypeIcon = (name) => {
    switch (name) {
      case "Bicycle":
        return (
          <PedalBikeIcon
            className="block"
            aria-hidden="true"
            style={{ color: "#65D01E", fontSize: 24 }}
          />
        );
      case "Bicycle Electric":
        return (
          <ElectricBikeIcon
            className="block"
            aria-hidden="true"
            style={{ color: "#65D01E", fontSize: 24 }}
          />
        );
      case "Scooter":
        return (
          <ScootersIcon
            name={"Scooter"}
            style={{
              color: "#65D01E",
              width: "24px",
              height: "24px",
            }}
          />
        );
      case "Scooter Electric":
        return (
          <ScootersIcon
            name={"Scooter Electric"}
            style={{
              color: "#65D01E",
              width: "24px",
              height: "24px",
            }}
          />
        );
    }
  };
  const FormatterPrice = (price) => {
    return Number(price).toLocaleString("en-US", {
      style: "currency",
      currency: "MAD",
    });
  };

  const vehicle_type = {
    "bicycle" : "Bicycle",
    "bicycle_electric" : "Bicycle Electric",
    "scooter" : "Scooter",
    "scooter_electric" : "Scooter Electric",
  }

  const NavTo = (path) => {
    navigate(`${path}`)
  }

  //console.log(OfferData?.available_day_hours?.availablity[0][Object.keys(OfferData?.available_day_hours?.availablity[0])])
  //const slug = `${OfferData?.title}`.replace(/\s+/g,' ').trim().split(' ').join('-');
  return (
    <>
      <div className=" w-full flex flex-col flex-shrink bg-white rounded-lg shadow-md h-[375px] border border-gray-200 overflow-hidden">
        <div className="h-3/5 w-full border-b border-gray-200 bg-white">
          <NavLink to={`/offer-details/${OfferData?.offer_id}`}>
            <CarouselV3 Images={OfferData?.vehicles?.vehicle_images} />
          </NavLink>
        </div>
        <div className="pl-3 pr-3 pt-2 h-auto w-full flex justify-between">
          <div className="flex flex-col gap-1 w-full h-auto justify-between">
            <div className="flex flex-row justify-between items-center w-full">
              <span className="text-sm flex flex-row gap-2 justify-start items-center">
                {TypeIcon(
                  vehicle_type[OfferData?.vehicles.vehicle_type]
                )}
                <span className="text-sm text-gray-500">
                  {OfferData?.vehicles?.vehicle_type
                    ? vehicle_type[OfferData?.vehicles.vehicle_type]
                    : "unknown"}
                </span>
              </span>
              <div className="flex flex-row justify-center items-center gap-1">
                <StarIcon
                  className={"text-amber-400 h-5 w-5 flex-shrink-0"}
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold">
                  {`
                    ${OfferData?.reviews?.length>0 && 
                    Math.floor(OfferData?.reviews?.reduce((a, b) => a + b.rating, 0) / OfferData?.reviews?.length).toFixed(1) || 0}
                  `}
                  <span className="text-gray-400/80">{`(${OfferData?.reviews?.length})`}</span>
                </p>
              </div>
            </div>
            <h1 className="line-clamp-1 text-sm">
              <NavLink
                className="line-clamp-1 text-lg text-gray-900 break-words hover:text-[#65D01E] w-full"
                to={`/offer-details/${OfferData?.offer_id}`}
              >
                {OfferData?.title ? OfferData?.title : "unknown"}
              </NavLink>
            </h1>
            <span className="line-clamp-1 text-sm text-gray-500 w-[288px] mb-1">
              {OfferData?.vehicles?.location[0]?.Address || "unknown"}
            </span>
            <div className="text-sm flex flex-row gap-2 justify-between items-center w-full">
              {type==="home" && <button onClick={() => {
                NavTo(`/user/${OfferData?.users_offers_created_byTousers?.user_id}`)
              }} className="w-full flex flex-row justify-start items-center gap-2">
                  <p
                    className="block w-10 h-10 overflow-hidden rounded-full border-2 border-[#65D01E] cursor-pointer"
                  >
                    <img
                      src={
                          OfferData?.users_offers_created_byTousers?.profile_photo
                            ? `${process.env.REACT_APP_MAIN_URL}/images/users/${OfferData?.users_offers_created_byTousers?.profile_photo}`
                            : default_picture
                      }
                      className="w-full h-full object-cover object-center"
                      alt="profile"
                    />
                  </p>
                  <span className="line-clamp-1 text-start text-sm font-semibold text-gray-900 break-words hover:text-[#65D01E]">
                    {OfferData?.users_offers_created_byTousers?.first_name || "unknown"} {OfferData?.users_offers_created_byTousers?.last_name || "unknown"}
                  </span>
              </button>}
              <span className="text-[#65D01E] font-bold bg-gray-100 px-3 py-1 rounded-lg">
                  {OfferData?.available_day_hours?.availablity
                    ? FormatterPrice(OfferData?.available_day_hours?.availablity[0][Object.keys(OfferData?.available_day_hours?.availablity[0])])
                    : "unknown"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
