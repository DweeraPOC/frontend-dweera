import React from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const getTimeBlocks = () => {
  const minutesInDay = 1440;
  const timeBlocksArr = [
    { timeString: '12:00 AM', timeValue: '0' }
  ];
  for (let i = 30; i <= minutesInDay - 30; i += 30) {
      const halfHourInLoop = i / 60;

      let formattedBlock = String(halfHourInLoop);
      const hour = formattedBlock.split('.')[0];
      const minute = i % 60 === 0 ? '00' : '30';
      formattedBlock = `${hour}:${minute}`;

      const today = new Date();
      const timeString = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          Number(hour),
          Number(minute),
      );
      timeBlocksArr.push({
          timeString: timeString.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          timeValue: formattedBlock,
      });
  }

  return timeBlocksArr;
};
export default function ListHours({ Label,selected,Id,HandleChange,Name }) {

    const times = getTimeBlocks(); 
    //const [selected, setSelected] = useState(null)
  return (
    <>
      <div className="w-full">
      <Listbox value={selected} onChange={(newValue) => {
        HandleChange(Id,Name,newValue)
      }}>
        <div className="relative mt-1 w-full">
          <Listbox.Button className="relative z-20 w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 shadow-sm focus:outline-none sm:text-sm">
            <span className="block truncate">{selected?.timeString || Label}</span>
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
              {times && times?.map((t, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 hover:bg-[#65D01E]/5 ${
                      active || t?.timeValue===selected?.timeValue  ? 'bg-[#65D01E]/5 text-[#5cbf1a]' : 'text-gray-900'
                    }`
                  }
                  value={t}
                >
                  <span
                    className={`block truncate ${
                      selected?.timeValue===t.timeValue ? 'font-medium' : 'font-normal'
                    }`}
                  >
                    {t?.timeString}
                  </span>
                  {selected?.timeValue===t.timeValue ? (
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
  )
}
