import React from 'react'
import Rating from '@mui/material/Rating';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconEmpty } from '@heroicons/react/24/outline';
import ErrorDisplayer from '../ErrorDisplayer/ErrorDisplayer';

export default function Feedback({ feedBack, HandleFeedBack, HandleRating,HandleReview }) {
  return (
    <>
      <Transition appear show={feedBack?.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 shadow-md" onClose={() => HandleFeedBack(false,null)}>
          {<Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>}

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full md:mx-2 my-2 mx-6 relative max-w-sm transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">

                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-semibold leading-6 text-gray-900 mb-4"
                  >
                    Review and Rating
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className='flex flex-col gap-3 justify-start items-start w-full'>
                      <p className='text-sm text-gray-400'>
                        {`Rating (${feedBack?.value?.rating}/5)`}
                      </p>
                      <div className='flex justify-center items-center w-full mb-4'>
                        <Rating
                          className='outline-none border-none hover:outline-none focus:outline-none'
                          icon={<StarIcon
                            className={"text-[#65D01E] md:h-14 md:w-14 h-10 w-10 outline-none flex-shrink-0"}
                            aria-hidden="true"
                          />}
                          emptyIcon={<StarIconEmpty
                            className={"text-gray-300 md:h-14 md:w-14 h-10 w-10 outline-none flex-shrink-0"}
                            aria-hidden="true"
                          />}
                          name="simple-controlled"
                          value={feedBack?.value?.rating}
                          onChange={(e, newValue) => {
                            HandleRating(newValue,"rate");
                          }}
                        />
                      </div>
                    </div>
                    <div className='flex flex-col gap-3 justify-start items-start w-full'>
                      <p className='text-sm text-gray-400'>
                        {`Review`}
                      </p>
                      <div className='flex justify-center items-center w-full'>
                        <textarea
                          rows="4"
                          className="block p-2.5 w-full text-sm text-gray-900 resize-none outline-none hover:outline-none focus:outline-none bg-gray-50 rounded-lg border-2 border-gray-300 focus:ring-[#65D01E] focus:border-[#65D01E]"
                          placeholder="Write your review (optional)"
                          maxLength={150}
                          value={feedBack?.value?.comment}
                          onChange={(e) => {
                            HandleRating(e.currentTarget.value,"comment");
                          }}
                        >
                        </textarea>
                      </div>
                    </div>
                  </div>
                  <div>
                    {feedBack?.err && <ErrorDisplayer error={feedBack?.err} />}
                  </div>
                  <div className="mt-4 flex w-full gap-2 justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-gray-300 px-5 py-1.5 text-sm font-medium text-gray-800 focus:outline-none"
                      onClick={() => HandleFeedBack(false,null)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className={
                        `inline-flex relative justify-center rounded-md border border-transparent px-5 py-1.5 text-sm font-medium ${feedBack?.value?.rating===0 ? 'bg-gray-300' : "bg-[#65D01E]"} text-white focus:outline-none`
                      }
                      disabled={feedBack?.value?.rating===0}
                      onClick={() => {
                        feedBack?.value?.rating!==0 && HandleReview()
                      }}
                    >
                      Send
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
