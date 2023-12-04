import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { terms } from "../../Components/TermsConditions/TermsConditions";

export default function TermsConditions(props) {

  const closeModal = () => {
    //setStatus(false)
  };

  const HandleModal = () => {
    props.HandleModal();
  };
  const Alphabets = Array.from(Array(26)).map((_e, i) => i + 65)
    .map((x) => (String.fromCharCode(x).toString()).toLowerCase());
  return (
    <>
      <div className="">
        <Transition appear show={props.status} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 overflow-hidden text-black"
            onClose={closeModal}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="md:w-[700px] w-full transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                    <div className="flex flex-col">
                      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 px-3 py-3">
                        <div className="flex justify-center items-center relative">
                          <h1 className="text-2xl font-medium">
                            Terms and Conditions
                          </h1>
                          <span className="absolute top-0 right-0">
                            <button
                              type="button"
                              className="flex justify-center items-center rounded-full p-1.5 bg-gray-100"
                              onClick={HandleModal}
                            >
                              <XMarkIcon
                                className="block h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </span>
                        </div>
                      </div>
                      <div
                        className="bg-white md:max-h-[550px] lg:max-h-[580px] xl:max-h-[600px] max-h-[550px] 
                          w-full overflow-x-hidden overflow-y-auto px-6 py-4"
                      >
                        <ul className="list-none flex flex-col w-full gap-3">
                          {terms &&
                            terms?.map((term, index) => (
                              <li className="" key={index}>
                                <section>
                                  <h1 className="text-xl font-semibold">
                                    {index+1} - {term.title}
                                  </h1>
                                  {term.context.type === "paragraph"
                                    ? term.context.body?.map((paragraph, index) => (
                                        <p className="text-sm text-gray-400 px-2 py-1" key={index}>
                                          {paragraph}
                                        </p>
                                      ))
                                    : term.context.body?.map((item, index) => (
                                        <ul className="list-none" key={index}>
                                          <li className="px-2 py-1">
                                            <span className="text-lg font-medium flex flex-row w-full justify-start items-center gap-2">
                                              {/*<i className="flex justify-center items-start w-2 h-2 bg-gray-900 rounded-full"></i>*/}
                                              {Alphabets[index]}. {item.subtitle}
                                            </span>
                                            {item?.body.map((paragraph, index) => (
                                              <p className="text-sm text-gray-400 px-4 py-1" key={index}>
                                                {paragraph}
                                              </p>
                                            ))}
                                          </li>
                                        </ul>
                                      ))}
                                </section>
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div className="bg-white border-b border-gray-200 sticky bottom-0 z-30 px-3 py-3">
                        <div className="flex justify-between items-center relative"></div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}
