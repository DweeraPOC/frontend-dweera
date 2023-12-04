import React from "react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const getTimeBlocks = () => {
  const minutesInDay = 1440;
  const timeBlocksArr = [{ timeString: "00:00", timeValue: "0" }];
  for (let i = 60; i <= minutesInDay - 60; i += 60) { // value 60 in this for is listing the time in 1 hour interval
    const halfHourInLoop = i / 60;

    let formattedBlock = String(halfHourInLoop);
    const hour = formattedBlock.split(".")[0];
    const minute = "00";
    formattedBlock = `${hour}:${minute}`;

    timeBlocksArr.push({
      timeString: formattedBlock,
      timeValue: hour,
    });
  }
  return timeBlocksArr;
};

export default function ListHours({
  Label,
  selected,
  Id,
  HandleChange,
  Name,
  isStartTime,
}) {
  const times = getTimeBlocks();
  return (
    <>
      <div className="w-full">
        <Listbox
          value={selected}
          onChange={(newValue) => {
            HandleChange(Id, Name, newValue, isStartTime);
          }}
        >
          <div className="relative mt-1 w-full">
            <Listbox.Button className="relative z-20 w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 shadow-sm focus:outline-none sm:text-sm">
              <span className="block truncate">
                {selected || Label}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {times &&
                  times?.map((t, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 hover:bg-[#65D01E]/5 ${
                          active || t?.timeString === selected
                            ? "bg-[#65D01E]/5 text-[#5cbf1a]"
                            : "text-gray-900"
                        }`
                      }
                      value={t}
                    >
                      <span
                        className={`block truncate ${
                          selected === t.timeString
                            ? "font-medium"
                            : "font-normal"
                        }`}
                      >
                        {t?.timeString}
                      </span>
                      {selected === t.timeString ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#65D01E]">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </Listbox.Option>
                  ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </>
  );
}
