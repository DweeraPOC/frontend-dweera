import React from "react";
import Datepicker from "react-tailwindcss-datepicker";
import Rating from "@mui/material/Rating";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconEmpty } from "@heroicons/react/24/outline";

export default function AvailabilityFiltre({
  t,
  setPerDayOffers,
  rating,
  setRating,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {
  let date = new Date();

  return (
    <>
      <div className="w-full">
        <label
          htmlFor="Type of booking"
          className="block mb-2 text-sm xl:text-base font-semibold text-gray-900"
        >
          {t("Type of booking")}
        </label>
        <div className="flex flex-row gap-2 px-2">
          <input
            type="checkbox"
            id="Type of booking"
            className="border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block p-2"
            onChange={(e) => setPerDayOffers(e.target.checked)}
          />
          <span className="text-sm font-semibold text-gray-900">
            {t("Per day")}
          </span>
        </div>
      </div>
      <div className="w-full">
        <span className="block mb-2 text-sm xl:text-base font-semibold text-gray-900">
          {t("Start date")}
        </span>
        <div className="w-full flex flex-row gap-2 pl-2">
          <Datepicker
            i18n={"fr"}
            asSingle={true}
            useRange={false}
            primaryColor={"lime"}
            startFrom={new Date()}
            minDate={new Date(date.setDate(date.getDate() - 1))}
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
          />
        </div>
      </div>
      <div className="w-full">
        <span className="block mb-2 text-sm xl:text-base font-semibold text-gray-900">
          {t("End date")}
        </span>
        <div className="w-full flex flex-row gap-2 pl-2">
          <Datepicker
            i18n={"fr"}
            asSingle={true}
            useRange={false}
            primaryColor={"lime"}
            startFrom={new Date()}
            minDate={new Date(date.setDate(date.getDate() + 1))}
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
          />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <span className="block  text-sm xl:text-base font-semibold text-gray-900">
          {`Rating (${rating}/5)`}
        </span>
        <div className="flex  items-center w-full">
          <Rating
            className="outline-none border-none hover:outline-none focus:outline-none"
            icon={
              <StarIcon
                className={
                  "text-[#65D01E] md:h-12 md:w-12 h-10 w-10 outline-none flex-shrink-0"
                }
                aria-hidden="true"
              />
            }
            emptyIcon={
              <StarIconEmpty
                className={
                  "text-gray-300 md:h-12 md:w-12 h-10 w-10 outline-none flex-shrink-0"
                }
                aria-hidden="true"
              />
            }
            name="simple-controlled"
            value={rating}
            onChange={(e, newValue) => {
              setRating(newValue);
            }}
          />
        </div>
      </div>
    </>
  );
}
