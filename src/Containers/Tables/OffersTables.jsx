import React from "react";
import {
  EyeIcon,
  ArchiveBoxArrowDownIcon,
  ArchiveBoxXMarkIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

export default function OffersTables({
  TableHeader,
  TableBody,
  OpenModal,
  Offer_Status,
  t,
  VehicleType,
  OpenConfirmation,
  navigate,
}) {
  const FormatterPrice = (price) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "MAD",
    });
  };

  const Spliter = (st) => {
    return st?.split("/");
  }

  const TYPES = {
    perHour: "Per Hour",
    perHalfDay: "Per Half Day",
    perDay: "Per Day",
    perWeek: "Per Week",
    perMonth: "Per Month"
  }
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {TableHeader?.map((head) => (
                <th scope="col" className="px-6 py-3" key={head?.id}>
                  {head?.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TableBody.length > 0 ? (
              TableBody &&
              TableBody.map((offer, index) => (
                <tr
                  key={index}
                  className={
                    offer?.in_archive === "true"
                      ? "bg-[#D01E33]/5"
                      : index % 2 === 0
                      ? `relative bg-white border-b`
                      : `relative border-b bg-gray-50`
                  }
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap object-cover flex justify-center items-center">
                    {/*<img
                      className="w-24 h-16 object-cover rounded-lg"
                      src={offer?.vehicles.vehicle_images[0]?.image_url}
                      alt="offer"
                    />*/}
                    <img
                      className="w-24 h-16 object-cover rounded-lg"
                      src={offer?.vehicles.vehicle_images[0]?.image_url}
                      alt="offer"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap overflow-hidden">
                    {`${offer?.title.substr(0, 19)}...`}
                  </td>
                  <td className="px-6 py-4">
                    {VehicleType[offer?.vehicles?.vehicle_type]}
                  </td>
                  <td className="px-6 py-4">
                    {FormatterPrice(Number(offer?.available_day_hours?.availablity?.map(obj => Object.values(obj))?.flat()[0]))}
                  </td>
                  <td className="px-6 py-4">
                    {Offer_Status(offer?.offer_status)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        offer?.in_archive !== "true" &&
                          OpenModal(offer?.offer_id);
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
                    {/*<button
                      type="button"
                      className={`px-1`}
                      onClick={() => {
                        navigate(`/edit-offer`, { state: offer });
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
                    </button>*/}
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
                  </td>
                </tr>
              ))
            ) : (
              <div className="flex justify-center items-center w-full text-center py-6">
                {t("There are no offers to display")}
              </div>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
