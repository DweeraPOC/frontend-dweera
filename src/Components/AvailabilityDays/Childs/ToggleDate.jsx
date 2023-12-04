import React from "react";
import { Switch } from "@headlessui/react";
import ListHours from "./ListHours";
// import { XMarkIcon } from "@heroicons/react/24/solid";

export default function ToggleDate({
  Hours,
  name,
  status,
  HandleToggle,
  HandleChange,
  handleCustomeHours,
  isPerHour,
  t,
}) {
  return (
    <>
      <div className="flex justify-between items-center gap-2 flex-col w-full md:w-96">
        <div className="flex justify-between items-center gap-2 w-full">
          <span>{t(name)}</span>
          <div className="flex items-center gap-2">
            <Switch
              name={name}
              checked={status}
              onChange={() => {
                HandleToggle(name);
              }}
              className={`${status ? "bg-[#65D01E]" : "bg-gray-300"}
                  inline-flex h-5 w-10  cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span
                aria-hidden="true"
                className={`${status ? "translate-x-5" : "translate-x-0"}
                    pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
            <span>{status ? t("Open") : t("Closed")}</span>
            {isPerHour && (
              <button
                onClick={() => {
                  handleCustomeHours(name);
                }}
                type="button"
                className={`w-fit rounded-md  px-2 py-0.5 text-xs font-medium hover:bg-gray-600 focus:outline-none text-white
                  ${!status ? "invisible" : ""}
                  ${Hours?.isTwentyfour === "true" ? "bg-gray-700" : "bg-gray-400"}
                `}
              >
                {Hours?.isTwentyfour === "true" ? t("Custom") : "24H"}
              </button>
            )}
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-2 flex-col">
          {status ? (
            <>
              {isPerHour &&
                Hours &&
                Hours?.hours?.map((_hs, index) => (
                  <div key={index} className="w-full flex justify-between items-center md:flex-row flex-col gap-4">
                    {Hours?.isTwentyfour === "true" ? null : (
                      <>
                        <ListHours
                          key={`start-${index}`}
                          Id={_hs?.id}
                          Name={name}
                          selected={_hs?.start}
                          Label={t("Open At")}
                          HandleChange={HandleChange}
                          isStartTime={true}
                        />
                        <ListHours
                          key={`end-${index}`}
                          Id={_hs?.id}
                          Name={name}
                          selected={_hs?.end}
                          Label={t("Close At")}
                          HandleChange={HandleChange}
                          isStartTime={false}
                        />
                      </>
                    )}
                  </div>
                ))}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
