import React from "react";
import { EyeIcon, StarIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { GridCloseIcon } from "@mui/x-data-grid";
import {useTranslation} from "react-i18next";
import default_picture from "../../assets/images/default_profile_picture.png"
import { SHOW_MODALBOX } from "../../Redux/Actions/actions";

const ProductCard = (props) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const { t } = useTranslation();
  const fromDate = props.booking?.start_date;
  const toDate = props.booking?.end_date;

  const dispatch = useDispatch();

  const FormatterPrice = (price) => {
    return price?.toLocaleString("en-US", {
      style: "currency",
      currency: "MAD",
    });
  };

  const HandleView = () => {
    dispatch(SHOW_MODALBOX(true, props.booking?.users_bookings_owner_offerTousers));
  };

  return (
    <div className="flex flex-col justify-between md:flex-row border">
      <div>
        <img
          className="w-full md:w-64 object-cover h-96 md:h-60"
          src={
            process.env.REACT_APP_MAIN_URL +
            "/images/offers/".concat(
              props?.booking?.offers?.vehicles?.vehicle_images[0]?.image_url
            )
          }
          alt="product image"
        />
      </div>
      <div className="flex w-full md:w-[32rem] flex-col py-2 px-3 gap-2">
        <h5 className="font-bold">You rented {props.booking?.offers.title}</h5>
        <p className="line-clamp-1">{props.booking?.offers?.offer_description}</p>
        <div className="flex items-center gap-1">
          <img
            src="/icons/icons8-date-from-50.png"
            className="w-5 h-5"
            alt="from icon"
          />
          <span className="font-medium">
            From: {fromDate?.substr(0, fromDate.indexOf("T"))}
          </span>
          <span className="font-medium">
            {"at " + fromDate?.substr(fromDate.indexOf("T") + 1, 5)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <img
            src="/icons/Time-Date-To.png"
            className="w-5 h-5"
            alt="To icon"
          />
          <span className="font-medium">
            To: {toDate.substr(0, toDate.indexOf("T"))}
          </span>
          <span className="font-medium">
            {"at " + toDate.substr(toDate.indexOf("T") + 1, 5)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <img
            src="/icons/initial_price.png"
            className="w-5 h-5"
            alt="Initial price"
          />
          <span className="font-medium">
            {props.booking?.offers?.price} MAD {t(props.booking?.offers?.type_booking)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <img
            src="/icons/total_price.png"
            className="w-5 h-5 "
            alt="Total price"
          />
          <span className="font-medium">
            {FormatterPrice(props?.booking?.total_price)} MAD
          </span>
        </div>
        <div className="flex items-center gap-1">
          <img
            src={
              props.booking?.booking_approval_status === "approved"
                ? "/icons/approval.png"
                : "/icons/waiting.png"
            }
            className="w-5 h-5 "
            alt="status icon"
          />
          <span className="font-medium">
            Status: {t(props.booking?.booking_approval_status)}
          </span>
        </div>
        <div className="flex justify-between items-">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-between gap-2">
              <span className="block w-12 h-12 overflow-hidden rounded-full border-2 border-[#65D01E]">
                <img
                  src={
                    props.booking?.users_bookings_owner_offerTousers?.profile_photo
                      ? `${process.env.REACT_APP_MAIN_URL}/images/${props.booking?.users_bookings_owner_offerTousers?.profile_photo}`
                      : default_picture
                  }
                  className="w-full h-full object-cover object-center"
                />
              </span>
              <p className="flex flex-col items-start justify-evenly">
                <span className="flex justify-center items-center gap-2">
                  <span>
                    {props.booking?.users_bookings_owner_offerTousers?.first_name || ""}
                    &nbsp;
                    {props.booking?.offers?.users?.last_name ||  ""}
                  </span>
                  <button onClick={HandleView}>
                    <EyeIcon className="block w-5 h-5 text-gray-300" />
                  </button>
                </span>
                {/*<span className="flex flex-row">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        Math.floor(props.booking?.users?.Rating) > rating
                          ? " text-[#65D01E]"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                  </span>*/}
              </p>
            </div>
          </div>
          {props.booking?.booking_approval_status !== "approved" &&
          props.booking?.booking_approval_status !== "rejected" ? (
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-700/90 focus:outline-none 
                font-medium rounded-full md:rounded-lg text-base px-2.5 md:px-5 py-2.5 text-center inline-flex items-center gap-1"
              onClick={() => {
                props.HandleCancel(props.booking?.booking_id);
              }}
            >
              <GridCloseIcon className="block w-8 h-8" />
              <span className="hidden md:block">{t("Cancel")}</span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
