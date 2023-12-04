import React from "react";
import {
  EyeIcon,
  ArchiveBoxArrowDownIcon,
  ArchiveBoxXMarkIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import CategoryIcon from "@mui/icons-material/Category";

import CarouselV3 from "../../Containers/Products/CarouselV3";

export default function Card({
  offer,
  OpenModal,
  t,
  OpenConfirmation,
  Offer_Status,
  navigate,
}) {
  const FormatterPrice = (price) => {
    return price.toLocaleString("en-US", {
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
  const vehicle_type = {
    bicycle: "Bicycle",
    bicycle_electric: "Bicycle Electric",
    scooter: "Scooter",
    scooter_electric: "Scooter Electric",
  };


  return (
    <>
      <div className="w-96 my-4 px-4">
        <article
          className={`relative overflow-hidden rounded-lg shadow-lg w-full border border-gray-200 ${
            offer?.in_archive === "true" ? "bg-[#D01E33]/5" : ""
          }`}
        >
          <div className="block h-52 w-full">
            <CarouselV3 Images={offer?.vehicles?.vehicle_images} />
          </div>
          <header className="flex flex-col justify-between p-4 leading-normal">
            <div className="flex flex-row justify-between items-center">
              <div className="flex items-center gap-2 text-sm">
                <CategoryIcon
                  className="block w-3 h-3"
                  aria-hidden="true"
                  style={{ color: "#65D01E" }}
                />
                {vehicle_type[offer?.vehicles?.vehicle_type] || "unknown"}
              </div>
              <div className="flex justify-center items-center z-40">
                <button
                  onClick={() => {
                    offer?.in_archive !== "true" && OpenModal(offer?.offer_id);
                  }}
                  type="button"
                  className={`px-1 ${
                    offer?.in_archive === "true"
                      ? "text-gray-300 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <EyeIcon className="block w-6 h-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={`px-1`}
                  onClick={() => {
                    offer?.in_archive !== "true"
                      ? OpenConfirmation(offer?.offer_id, {
                          name: "Archived",
                          path: "archived-offer",
                        })
                      : OpenConfirmation(offer?.offer_id, {
                          name: "Unarchived",
                          path: "unarchived-offer",
                        });
                  }}
                >
                  {offer?.in_archive !== "true" ? (
                    <ArchiveBoxArrowDownIcon
                      className="block w-6 h-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArchiveBoxXMarkIcon
                      className="block w-6 h-6"
                      aria-hidden="true"
                    />
                  )}
                </button>
                <button
                  type="button"
                  className={`px-1`}
                  onClick={() => {
                    navigate(`/edit-offer`, { state: { offer } });
                    // setOpenEdit(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`px-1`}
                  onClick={() => {
                    OpenConfirmation(offer?.offer_id, {
                      name: "Delete",
                      path: "delete-offer",
                    });
                  }}
                >
                  <TrashIcon
                    className="block w-6 h-6 text-red-600"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 line-clamp-2">
              {offer?.title}
            </h5>
            <p className="font-normal text-gray-700 line-clamp-3">
              {offer?.offer_description}
            </p>
          </header>

          {
            <footer className="flex items-center justify-between leading-none p-2 md:p-4 mb-1">
              <div className="flex justify-center items-center gap-2 text-base text-black font-medium">
                <span className="px-2 py-1 bg-[#65D01E]/10 rounded-md font-semibold">
                  {FormatterPrice(Number(offer?.available_day_hours?.availablity?.map(obj => Object.values(obj))?.flat()[0]))}
                </span>
                <span>{t(TYPES[offer?.available_day_hours?.availablity?.map(obj => Object.keys(obj))?.flat()[0]])}</span>
              </div>
              <div className="flex justify-center items-center">
                {Offer_Status(offer?.offer_status || "pending")}
              </div>
            </footer>
          }
        </article>
      </div>
    </>
  );
}
