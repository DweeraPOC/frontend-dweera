import React from 'react'

export default function OtpInput({ otp, value, onChange, className }) {
    return (
        <>
            <div className="flex gap-2 h-full w-full flex-wrap justify-center items-center">
                {/* Map through the array and render input components */}
                {otp?.map((data, index) => {
                    return (
                        <>
                            <input
                                className={className || 'input input-bordered px-0 text-center'}
                                type="text"
                                name="otp"
                                maxLength="1"
                                key={index}
                                value={data}
                                onChange={e => onChange(e,e.target, index)}
                                onFocus={e => e.target.select()}
                            />
                        </>
                    );
                })}
            </div>
        </>
    )
}
