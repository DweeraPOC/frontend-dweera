import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../Middlewares/AuthContext'
import { OPEN_MODAL_TELEPHONE } from '../../Redux/Actions/actions'

export default function AddPhone() {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    //const [status,setStatus] = useState(true);
    const status = useSelector((state) => state.ModalReducer.isOpen);
    const closeModal = () => {return;}

    const [telephone,setTelephone] = useState(null);
    const [err,setErr] = useState(null);

    const HandleChange = (e) => {
        let newValue = (e.currentTarget.value).replace(/\s+/g, '').replace(/[A-Za-z]/g, "");
        setTelephone(newValue)
    }

    const CheckPhoneNumber = (tel) => {
        const reg = new RegExp('^((06)|(07))[0-9]{8}$', 'i');
        return reg.test(tel);
    }

    const dispatch = useDispatch();
    const auth = useAuth();
    const HandleSubmit = async () => {
        if(CheckPhoneNumber(telephone)){
            await axios({
                method : "POST",
                url : process.env.REACT_APP_MAIN_URL + "/users/add-telephone",
                headers : {
                    "x-access-token" : auth?.user.token
                }
            })
            .then((res) => {
                if(res.status===200) dispatch(OPEN_MODAL_TELEPHONE(false))
            })
        }
        else setErr("Telephone format invalid")
    }
  return (
    <>
    <Transition appear show={status} as={Fragment}>
        <Dialog as="div" className="relative" onClose={closeModal}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
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
                <Dialog.Panel 
                    className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all
                    flex flex-col"
                >
                    <div 
                        className='bg-white md:max-h-[550px] lg:max-h-[580px] xl:max-h-[600px] max-h-[350px] 
                        w-full overflow-x-hidden overflow-y-auto'
                    >
                        {/*<div
                            className='flex w-full justify-end items-center'
                        >
                            <button 
                                type='button'
                                onClick={null}
                                className='flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 py-2 px-4 text-sm font-medium text-black hover:bg-gray-100 focus:outline-none'
                            >
                                Skip
                            </button>
                        </div> */}
                        <div class="mb-4">
                            <label for="success" className="block mb-2 text-sm font-medium text-gray-800">Telephone</label>
                            <input
                                type="text" 
                                className={classNames("border text-sm rounded-lg block w-full p-2.5 focus:outline-none",err ? "border-red-600" : "border-gray-300")}
                                placeholder="06 00 00 00 00"
                                onChange={HandleChange}
                                value={telephone}
                            />
                            {
                                err && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {
                                            err
                                        }
                                    </p>
                                )
                            }
                        </div>
                        <div>
                            <button
                                type='button'
                                className={classNames(
                                    'w-full py-2.5 flex justify-center items-center rounded-md text-sm font-medium',
                                    telephone ? "bg-[#65D01E] hover:bg-[#5dbe1c] text-white" : "bg-gray-300 text-white cursor-not-allowed"
                                )}
                                disabled={telephone ? false : true}
                                onClick={telephone ? HandleSubmit : null}
                            >
                                Add telephone
                            </button>
                        </div>
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
