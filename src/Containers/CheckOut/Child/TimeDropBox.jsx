import { Fragment, useRef, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { GenerateTimes,ConvertToValidDate } from './Timeline';


export default function TimeDropBox({ HandleChange,Type,SelectedTime }) {
 
    let timeline = GenerateTimes();
    timeline = timeline?.map((item) => {
      return {
        ...item,
        date : ConvertToValidDate(new Date(),item?.divided_time?.h,item?.divided_time?.m)
      }
    })
    const itemSelected = timeline.find((t) => new Date(SelectedTime).toString()===new Date(t?.date).toString());
    const [selected, setSelected] = useState({
      ...itemSelected,
      selected : true
    })

    const listRef = useRef(null);

    const OnChangeValueStart = (newValue) => {
      setSelected({
        ...timeline.find((t) => new Date(newValue?.date).toString()===new Date(t?.date).toString()),
        selected : true
      });
      HandleChange("start",newValue?.date);
      //console.log(timeline.find((t) => new Date(newValue?.date).toString()===new Date(t?.date).toString()));
    }

    const OnChangeValueEnd = (newValue) => {
      setSelected({
        ...timeline.find((t) => new Date(newValue?.date).toString()===new Date(t?.date).toString()),
        selected : true
      });
      HandleChange("end",newValue?.date);
      //console.log(timeline.find((t) => new Date(newValue?.date).toString()===new Date(t?.date).toString()));
    }
  return (
    <div className="w-full">
      <Listbox value={selected} onChange={(newValue) => {
        Type==="start" ? OnChangeValueStart(newValue) : OnChangeValueEnd(newValue)
      }}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none border border-gray-300 sm:text-sm">
            <span className="block truncate">{selected?.time}</span>
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
            <Listbox.Options ref={listRef} className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {timeline?.map((time,index) => (
                <Listbox.Option
                    key={time?.name}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active || time?.name===selected?.name  ? 'bg-[#65D01E]/5 text-[#5cbf1a]' : 'text-gray-900'
                      }`
                    }
                    value={time}
                  >
                    <span
                      className={`block truncate ${
                        time?.name===selected?.name ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {time?.time}
                    </span>
                    {time?.name===selected?.name ? (
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
  )
}
