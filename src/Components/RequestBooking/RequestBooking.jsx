import React from "react";
import EmtyPicture from "../../assets/images/legacy_picture.png";
import default_picture from "../../assets/images/default_profile_picture.png";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SHOW_MODALBOX } from "../../Redux/Actions/actions";
import { useAuth } from "../../Middlewares/AuthContext";
import LoadingPage from "../../Containers/LoadingPage/LoadingPage";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { GridCloseIcon } from "@mui/x-data-grid";
import moment from "moment";
import { useTranslation } from "react-i18next";

export default function RequestBookig({
  booking = null,
  refresh = null,
  RqBooking = true,
  HandleCancel = null,
  t = null,
  user,
  openModal,
  HandleAction,
  HandleRating = null,
  HandleFeedBack = null,
}) {
  const FixDate = (d) => {
    // create a new Date object
    let date = new Date(d);
    // get the timezone offset in minutes
    let timezoneOffset = date.getTimezoneOffset();

    // convert the offset to milliseconds
    let offsetMilliseconds = timezoneOffset * 60 * 1000;

    // adjust the date by subtracting the offset
    let adjustedDate = new Date(date.getTime() + offsetMilliseconds);

    // log the adjusted date
    return adjustedDate;
  };
  const fromDate = moment(FixDate(booking?.start_date)).format("LLL");
  const toDate = moment(FixDate(booking?.end_date)).format("LLL");

  //console.log(fromDate,toDate)
  const FormatterPrice = (price) => {
    return Number(price)?.toLocaleString("en-US", {
      style: "currency",
      currency: "MAD",
    });
  };

  const TYPES = {
    "perHour" : "Per Hour", 
    "perHalfDay" : "Per Half Day", 
    "perDay" : "Per Day", 
    "perWeek" : "Per Week", 
    "perMonth" : "Per Month"
  }

  const dispatch = useDispatch();

  const HandleView = () => {
    dispatch(SHOW_MODALBOX(true, user));
  };

  return (
    <>
      <div className="overflow-hidden w-full max-w-[700px] border border-gray-200 bg-gray-50 shadow-md rounded-xl">
        <div className="relative flex flex-col justify-center items-center md:flex-row md:space-x-5 md:space-y-0 p-3 max-w-3xl md:max-w-3xl mx-auto ">
          <div className="w-full md:w-2/5 h-72 md:h-72 grid place-items-cente overflow-hidden">
            <img
              src={
                booking?.offers?.vehicles?.vehicle_images[0]?.image_url
                  ? `${booking?.offers?.vehicles?.vehicle_images[0]?.image_url}`
                  : EmtyPicture
              }
              alt="offer"
              className="rounded-md overflow-hidden w-full h-full object-center object-cover"
            />
          </div>
          <div className="w-full max-w-full md:w-3/5 flex flex-col md:space-y-2 p-3">
            <h3 className="font-black w-full text-gray-800 md:text-2xl text-xl md:line-clamp-2 line-clamp-1 mb-2 break-words">
              {booking?.offers?.title}
            </h3>
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
                {/*moment(booking?.end_date).diff(
                  moment(booking?.start_date),
                  "hours"
                ) *
                  booking?.offers?.available_day_hours?.availablity?.map(obj => Object.values(obj))?.flat()[0] ===
                booking?.total_price ? (
                  <span className="font-medium">
                    {FormatterPrice(booking?.offers?.available_day_hours?.availablity?.map(obj => Object.values(obj))?.flat()[0])} / {t(TYPES[booking?.offer?.available_day_hours?.availablity?.map(obj => Object.keys(obj))?.flat()[0]])}
                  </span>
                ) : (
                  <span className="font-medium">
                    {FormatterPrice(booking?.offers?.price_perDay)} / Day
                  </span>
                )*/}
                {console.log(booking?.offers?.available_day_hours?.availablity?.map(obj => Object.keys(obj))?.flat()[0])}
                <span className="font-medium">
                    {FormatterPrice(booking?.offers?.available_day_hours?.availablity?.map(obj => Object.values(obj))?.flat()[0])} / {t(TYPES[booking?.offers?.available_day_hours?.availablity?.map(obj => Object.keys(obj))?.flat()[0]])}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <img
                  src="/icons/total_price.png"
                  className="w-5 h-5 "
                  alt="Total price"
                />
                <span className="font-medium">
                  {FormatterPrice(booking?.total_price)}
                </span>
              </div>
              <div className="flex items-start gap-1">
                <MapPinIcon
                  className="block w-5 h-5 text-lime-600"
                  aria-hidden={true}
                />
                <span className="font-medium">
                  {booking?.location?.Address || "unknown"}
                </span>
              </div>
              {1 == 1 ? (
                <>
                  <div className="flex items-center gap-1">
                    <img
                      src={
                        booking?.booking_approval_status === "approved"
                          ? "/icons/approval.png"
                          : "/icons/waiting.png"
                      }
                      className="w-5 h-5 "
                      alt="status icon"
                    />
                    <span className="font-medium">
                      Status: {booking?.booking_approval_status}
                    </span>
                  </div>
                </>
              ) : null}
              <div className="flex flex-row justify-between items-center mt-2 gap-3 w-full">
                <div className="w-full">
                  <button
                    onClick={HandleView}
                    className="block w-14 h-14 overflow-hidden rounded-full border-2 border-[#65D01E] cursor-pointer"
                  >
                    <img
                      src={
                        user?.profile_photo
                          ? `${process.env.REACT_APP_MAIN_URL}/images/users/${user?.profile_photo}`
                          : default_picture
                      }
                      className="w-full h-full object-cover object-center"
                      alt="profile"
                    />
                  </button>
                </div>
                <div className="flex flex-row gap-2 w-1/2 justify-end">
                  {RqBooking ? (
                    <>
                      {booking?.booking_approval_status !== "approved" &&
                        booking?.booking_approval_status !== "rejected" && (
                          <>
                            <button
                              type="button"
                              className="text-white bg-[#65D01E] hover:bg-[#5BBF18]/90 focus:outline-none 
                                                                        font-medium md:rounded-md rounded-full text-sm md:px-5 px-2.5 py-2.5 text-center inline-flex items-center gap-1"
                              onClick={
                                () =>
                                  HandleAction(
                                    "approval",
                                    booking?.booking_id
                                  ) /*SendRequest("approval-booking")*/
                              }
                            >
                              <CheckIcon className="block w-8 h-8" />
                              <span className="hidden md:block">Approval</span>
                            </button>

                            <button
                              type="button"
                              className="text-white bg-red-700 hover:bg-red-700/90 focus:outline-none 
                                                                        font-medium rounded-full md:rounded-md text-sm md:px-5 px-2.5 py-2.5 text-center inline-flex items-center gap-1"
                              onClick={
                                () =>
                                  HandleAction(
                                    "deny",
                                    booking?.booking_id
                                  ) /*SendRequest("rejected-booking")*/
                              }
                            >
                              <CloseIcon className="block w-8 h-8" />
                              <span className="hidden md:block">Deny</span>
                            </button>
                          </>
                        )}
                    </>
                  ) : booking?.booking_approval_status !== "approved" &&
                    booking?.booking_approval_status !== "rejected" ? (
                    <button
                      type="button"
                      className="text-white bg-red-700 hover:bg-red-700/90 focus:outline-none 
                                                            font-medium rounded-md  text-sm px-5 py-2.5 text-center inline-flex items-center gap-1"
                      onClick={() => {
                        HandleAction("cancel", booking?.booking_id);
                      }}
                    >
                      <GridCloseIcon className="block w-8 h-8" />
                      <span className="block">{t("Cancel")}</span>
                    </button>
                  ) : booking?.reviews === "valid" ? (
                    <button
                      type="button"
                      className="text-white bg-[#65D01E] hover:bg-[#5BBF18]/90 focus:outline-none 
                                                            font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center gap-1"
                      onClick={() => HandleFeedBack(true, booking?.booking_id)}
                    >
                      <span className="block">Review</span>
                    </button>
                  ) : booking?.reviews === "in progress" ? (
                    <button
                      type="button"
                      className={`${booking?.booking_approval_status=="rejected" ? 'hidden invisible' : ' block visible'} text-white bg-gray-300 focus:outline-none 
                      font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center gap-1`}
                      onClick={null}
                      disabled
                    >
                      <span className="block">In progress</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="text-white bg-[#65D01E] bg-opacity-70 focus:outline-none 
                                                        font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center gap-1"
                      onClick={null}
                      disabled
                    >
                      <span className="block">Reviewed</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
