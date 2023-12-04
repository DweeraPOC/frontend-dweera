import React,{ useState } from 'react'
import { Switch } from '@headlessui/react'
import ListHours from './ListHours';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function ToggleDate({ Hours,name,status,HandleToggle,HandleAdd,HandleChangeStartTime,HandleChangeEndTime,HandleTwentyfourHours,HandleDelete }) {
    //const [enabled, setEnabled] = useState(false)
    const GenerateHours = () => {
      let h,m,type = '',arr = [];
      for(let i = 60;i<=840;i+=60){
          h = Math.floor(i / 60);
          if(h===0) type = 'Minutes'
          if(h===1) type = 'Hour'  
          if(h>1) type = 'Hours'          
          m = i % 60;
          arr = [...arr,{
              id : i,
              name : `${h < 10 ? '0' + h : h} : ${m < 10 ? '0' + m : m} ${type}`,
              values : {
                  hours : h,
                  minutes : m
              },
              selected : false
          }];
      };
      return arr;
    }
  return (
    <>
        <div className='flex justify-between items-center gap-2 flex-col w-full'>
          <div className='grid grid-cols-2 gap-2 justify-start items-start w-full'>
            <span className='flex text-start justify-start items-start'>{name}</span>
            <div className='flex justify-start items-start gap-2 flex-row w-full'>
              <Switch
                  name={name}
                  checked={status}
                  onChange={() => {
                    HandleToggle(name);
                  }}
                  className={`${status ? 'bg-[#65D01E]' : 'bg-gray-300'}
                  relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                  <span
                    aria-hidden="true"
                    className={`${status ? 'translate-x-5' : 'translate-x-0'}
                    pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
              </Switch>
              <span>{status ? 'Open' : 'Closed'}</span>
              <button 
                onClick={() => {
                  HandleTwentyfourHours(name)
                }}
                type='button'
                className={`relative ml-2 flex justify-center items-start gap-2 rounded-md border border-transparent overflow-hidden bg-[#65D01E]/20 md:px-4 px-2 py-0.5 text-xs font-medium text-gray-900 hover:bg-[#65D01E]/30 focus:outline-none
                  ${status && Hours?.isTwentyfour !== "false" ? '' : 'invisible'}
                `}
              >
                24 Hours
              </button>
            </div>
          </div>
          <div className='w-full flex justify-center items-center gap-2 flex-col'>
            {
              (status) 
              ? (
                <>
                {
                  Hours && Hours?.times?.map((_hs,index) => 
                    <div className='w-full flex justify-between items-center md:flex-row flex-col gap-4'>
                      {
                        (Hours?.isTwentyfour === "true")
                        ? (
                          <>
                            <input 
                              key={index}
                              type="text" 
                              className="flex justify-center w-full cursor-default rounded-lg bg-white py-2 pl-3 text-left border border-gray-300 shadow-sm focus:outline-none sm:text-sm" 
                              value={_hs?.start} disabled/>
                          </>
                        )
                        : (
                          <>
                            <ListHours 
                              key={`start-${index}`} 
                              Id={_hs?.id} 
                              Name={name}
                              selected={_hs?.start} 
                              Label={'Open At'}
                              HandleChange={HandleChangeStartTime}
                            />
                            <ListHours 
                              key={`end-${index}`}
                              Id={_hs?.id}
                              Name={name}
                              selected={_hs?.end} 
                              Label={'Closes At'}
                              HandleChange={HandleChangeEndTime}
                            />
                          </>
                        )
                      }
                      <div className='w-full flex justify-start items-center gap-4 '>
                          {
                            (Hours?.isTwentyfour === "true")
                            ? (
                              <button 
                                type='button'
                                className={`flex w-full justify-center items-center gap-2 rounded-md border border-transparent bg-red-600 py-1 px-2 md:text-sm font-medium text-white hover:bg-red-700 md:focus:outline-none`}
                                onClick={() => {
                                  HandleDelete(_hs?.id,name,true)
                                }}
                              >
                                <XMarkIcon className='block md:w-6 md:h-6 w-4 h-4' />
                              </button>
                            )
                            : <button 
                                type='button'
                                className={`${Hours?.times.length - 1!==0 ? '' : 'hidden'} flex w-full justify-center items-center gap-2 rounded-md border border-transparent bg-red-600 py-1 px-2 md:text-sm font-medium text-white hover:bg-red-700 md:focus:outline-none`}
                                onClick={() => {
                                  HandleDelete(_hs?.id,name,false)
                                }}
                              >
                                <XMarkIcon className='block md:w-6 md:h-6 w-4 h-4 ' />
                              </button>
                          } 
                        
                          <button 
                              onClick={() => {
                                HandleAdd(name)
                              }}
                              type='button'
                              className={`relative flex w-full justify-center items-center md:h-6  h-4 gap-2 rounded-md border border-transparent bg-[#65D01E] md:py-4 py-3 px-2 md:text-sm text-xs font-medium text-white hover:bg-[#65D01E] focus:outline-none
                                ${_hs?.start && _hs?.end && Hours?.times.length - 1===index && Hours?.isTwentyfour !== "true" ? '' : 'hidden'}
                              `}
                            >
                              Add Hours
                            </button>
                      </div>
                    </div>
                  )
                }
                </>
              )
              : null
            }
          </div>
        </div>
    </>
  )
}
