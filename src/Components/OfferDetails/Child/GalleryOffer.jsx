import React from 'react'
import { useMemo } from 'react';
import { useState } from 'react'

export default function GalleryOffer({ images, selected, HandleChange }) {
    const Spliter = (st) => {
        return st?.split("/");
      }
    return (
        <>
            <div className='w-full md:grid md:grid-cols-6 md:col-span-1 flex flex-col-reverse gap-4'>
                {
                    images && images?.length > 1
                        ? (
                            <div className='flex-row flex w-full md:justify-start md:items-center md:flex-col gap-4'>
                                {
                                    images && images?.map((_g, i) =>
                                        <div
                                            onClick={() => HandleChange(i)}
                                            key={i}
                                            className={`w-full h-28 cursor-pointer md:col-span-1 rounded-md border border-gray-200 overflow-hidden ${selected === i ? " ring-2 ring-[#65D01E]" : ""}`}>
                                            <img
                                                className="w-full h-full rounded-md overflow-hidden object-center object-cover"
                                                src={
                                                    Spliter(_g?.image_url)?.length==1
                                                    ? `${_g?.image_url}`
                                                    : _g?.image_url
                                                }
                                                alt=""
                                            />
                                        </div>
                                    )
                                }
                            </div>
                        )
                        : null
                }
                <div className={`md:h-[550px] h-[400px] max-w-full rounded-lg ${images?.length>1 ? 'col-span-5' : 'col-span-6'} border border-gray-200`}>
                    <img
                        className="w-full h-full rounded-md aspect-[4/3] overflow-hidden object-cover object-center"
                        src={
                            Spliter(images[selected]?.image_url)?.length==1
                            ? `${process.env.REACT_APP_MAIN_URL}/images/offers/${images[selected] ? images[selected]?.image_url : null}`
                            : images[selected]?.image_url
                        }
                        alt=""
                    />
                </div>
            </div>
        </>
    )
}
