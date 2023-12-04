import { CheckCircleIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react'

export default function VerifecationBar() {
    const [actions, setactions] = useState({
        sending : false,
        loading : false,
    });
    return (
        <>
            <div className='flex md:flex-row flex-col justify-center items-center text-center max-w-full h-auto md:px-2 px-4 py-2 bg-blue-200 bg-opacity-70 gap-1 md:gap-2'>
                <p className='text-sm font-medium text-gray-800 break-words'>
                    Please activate your email account. Check your inbox or resend the activation email
                </p>
                {
                    (!actions.sending)
                        ? (
                            <button
                                type='button'
                                className={`px-4 py-1 bg-gray-50 rounded-md hover:bg-gray-100 w-full md:w-auto cursor-pointer`}
                                onClick={() => setactions()}
                            >
                                Resend
                            </button>
                        )
                        : (
                            <button
                                type='button'
                                className={`px-4 py-1 bg-gray-50 rounded-md hover:bg-gray-100 w-full md:w-auto cursor-pointer`}
                                onClick={null}
                            >
                                <span>Send it</span>
                                <CheckCircleIcon 
                                    className='block w-5 h-5'
                                />
                            </button>
                        )
                }
            </div>
        </>
    )
}
