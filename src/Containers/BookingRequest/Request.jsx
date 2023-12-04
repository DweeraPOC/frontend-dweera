import React, { useState } from "react";
import { StarIcon, EyeIcon } from "@heroicons/react/20/solid";
import EmtyPicture from "../../assets/images/legacy_picture.png";
import default_picture from "../../assets/images/default_profile_picture.png";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SHOW_MODALBOX } from "../../Redux/Actions/actions";
import { useAuth } from "../../Middlewares/AuthContext";
import LoadingPage from "../LoadingPage/LoadingPage";
import { MapPinIcon } from "@heroicons/react/24/solid";

export default function Request({ request, refresh }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const auth = useAuth();
  const FormatDate = (date) => {
    const checkZero = (data) => {
      if (data.length === 1) {
        data = "0" + data;
      }

      return data;
    };

    var currentDate = new Date(date);
    var day = currentDate?.getDate() + "";
    var month = currentDate?.getMonth() + 1 + "";
    var year = currentDate?.getFullYear() + "";
    var hour = currentDate?.getHours() + "";
    var minutes = currentDate?.getMinutes() + "";

    day = checkZero(day);
    month = checkZero(month);
    year = checkZero(year);
    hour = checkZero(hour);
    minutes = checkZero(minutes);

    return day + "/" + month + "/" + year + " " + hour + ":" + minutes;
  };
  const fromDate = FormatDate(request?.start_date);
  const toDate = FormatDate(request?.end_date);

  const FormatterPrice = (price) => {
    return Number(price)?.toLocaleString("en-US", {
      style: "currency",
      currency: "MAD",
    });
  };

  const [loading, setLoading] = useState(false);
  const SendRequest = async (type) => {
    setLoading(true);
    await axios
      .patch(
        `${process.env.REACT_APP_MAIN_URL}/bookings/${type}`,
        {
          BookingId: request?.booking_id,
        },
        {
          headers: {
            "x-access-token": auth?.user.token,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          refresh();
        };
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  const dispatch = useDispatch();

  const HandleView = () => {
    dispatch(SHOW_MODALBOX(true, request?.users_bookings_booker_user_idTousers));
  };

  const type_booking = {
    "Per_day" : "Per Day",
    "Per_hour" : "Per Hour"
  }
  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="flex flex-col md:flex-row max-w-3xl w-full justify-start bg-gray-50 border rounded-lg shadow-md h-[250px]">
          <div className="h-full w-[300px] object-cover object-center hidden md:block">
            {
              <img
                className="rounded-l-md w-full h-full object-cover object-center"
                src={
                  request?.offers?.vehicles?.vehicle_images[0]?.image_url
                    ? `${process.env.REACT_APP_MAIN_URL}/images/offers/${request?.offers?.vehicles?.vehicle_images[0]?.image_url}`
                    : EmtyPicture
                }
                alt="Offer"
              />
            }
          </div>
          <div className="flex flex-col p-4 leading-normal w-full justify-between h-auto gap-2">
            <div className="">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 line-clamp-1 w-full">
                {request?.offers?.title}
              </h5>
              <div className="w-full flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <img
                    src="/icons/icons8-date-from-50.png"
                    className="w-5 h-5"
                    alt="from icon"
                  />
                  <p className="font-medium w-full">From: {fromDate}</p>
                </div>
                <div className="flex items-center gap-1">
                  <img
                    src="/icons/Time-Date-To.png"
                    className="w-5 h-5"
                    alt="To icon"
                  />
                  <p className="font-medium w-full">To: {toDate}</p>
                </div>
                <div className="flex items-center gap-1">
                  <img
                    src="/icons/initial_price.png"
                    className="w-5 h-5"
                    alt="Initial price"
                  />
                  <span className="font-medium">
                    {FormatterPrice(request?.offers?.price)}{" "}
                    {type_booking[request?.offers?.type_booking]}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <img
                    src="/icons/total_price.png"
                    className="w-5 h-5 "
                    alt="Total price"
                  />
                  <span className="font-medium">
                    {FormatterPrice(request?.total_price)}
                  </span>
                </div>
                
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row justify-between gap-2">
                <span className="block w-14 h-14 overflow-hidden rounded-full border-2 border-[#65D01E]">
                  <img
                    src={
                      request?.users_bookings_booker_user_idTousers?.profile_photo
                        ? `${process.env.REACT_APP_MAIN_URL}/images/users/${request?.users_bookings_booker_user_idTousers?.profile_photo}`
                        : default_picture
                    }
                    className="w-full h-full object-cover object-center"
                    alt="profile"
                  />
                </span>
                <p className="flex flex-col items-start justify-evenly">
                  <span className="flex justify-center items-center gap-2">
                    <span>
                      {request?.users_bookings_booker_user_idTousers?.first_name || ""}
                      &nbsp;
                      {request?.users_bookings_booker_user_idTousers?.last_name || ""}
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
                          Math.floor(request?.users?.Rating) > rating
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
              <div className="flex flex-row gap-2">
                <button
                  type="button"
                  className="text-white bg-[#65D01E] hover:bg-[#5BBF18]/90 focus:outline-none 
                                font-medium rounded-full md:rounded-lg text-base px-2.5 md:px-5 py-2.5 text-center inline-flex items-center gap-1"
                  onClick={() => SendRequest("approval-booking")}
                >
                  <CheckIcon className="block w-8 h-8" />
                  <span className="hidden md:block">Accept</span>
                </button>
                <button
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-700/90 focus:outline-none 
                                font-medium rounded-full md:rounded-lg text-base px-2.5 md:px-5 py-2.5 text-center inline-flex items-center gap-1"
                  onClick={() => SendRequest("rejected-booking")}
                >
                  <CloseIcon className="block w-8 h-8" />
                  <span className="hidden md:block">Deny</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
