import React from "react";

export default function PriceFiltre({
  setMinPrice,
  setMaxPrice,
  minPrice,
  maxPrice,
  t,
}) {
  return (
    <div className="flex items-center justify-center gap-2 ">
      <div className="w-full">
        <label
          htmlFor="Min price"
          className="block mb-2 text-sm xl:text-base font-semibold text-gray-900"
        >
          {t("Min price")}
        </label>
        <div className="w-full flex flex-row gap-2 pl-2">
          <input
            id="Min price"
            className="border w-full border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block p-2"
            value={minPrice}
            placeholder={t("Min price")}
            onChange={(e) => {
              if (!isNaN(parseInt(e.target.value.length ? e.target.value : 0)))
                setMinPrice(
                  parseInt(e.target.value.length ? e.target.value : 0)
                );
            }}
          />
        </div>
      </div>
      <span className="self-end py-2">-</span>
      <div className="w-full">
        <label
          htmlFor="Max price"
          className="block mb-2 text-sm xl:text-base font-semibold text-gray-900"
        >
          {t("Max price")}
        </label>
        <div className="w-full flex flex-row gap-2 pr-2">
          <input
            id="Max price"
            className="border w-full border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block p-2"
            value={maxPrice}
            placeholder={t("Max price")}
            onChange={(e) => {
              if (!isNaN(parseInt(e.target.value.length ? e.target.value : 0)))
                setMaxPrice(
                  parseInt(e.target.value.length ? e.target.value : 0)
                );
            }}
          />
        </div>
      </div>
    </div>
  );
}
