import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
function Summary({ infos }) {
  console.log(infos)
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col w-full gap-4">
        <h3 className="text-xl font-semibold leading-5 text-gray-900">
          {t("Summary")}
        </h3>
        <div className="flex flex-col justify-center items-center w-full border-gray-600 border-b pb-4">
          <div className="flex justify-between w-full">
            <p className="text-gray-900 ">
              {t("Total duration")}
            </p>
            <p className="text-gray-600">{infos?.diff()} {infos?.type}</p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-gray-900">
              {t("Number of amenities")}
            </p>
            <p className="text-gray-600">1</p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-gray-900">{t("Initial price")}</p>
            <p className="text-gray-600">{infos?.initialPrice || 0} MAD</p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-gray-900">
              {t("Applied discount")}
            </p>
            <p className="text-gray-600">{0} %</p>
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-gray-900">{t("TOTAL")}</p>
          <p className="font-semibold text-gray-600">
            {infos?.initialPrice * infos?.diff()} MAD
          </p>
        </div>
      </div>
    </>
  );
}

export default Summary;
