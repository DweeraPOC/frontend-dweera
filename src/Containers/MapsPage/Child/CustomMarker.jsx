import { OverlayView } from '@react-google-maps/api'
import React from 'react'
import InfoView from './InfoView';
import { XMarkIcon } from '@heroicons/react/24/solid';
import bike_electric from '../../../assets/icons/bike-electric.png'
import bike_normal from '../../../assets/icons/bike-normal.png'
import scooter_electric from '../../../assets/icons/scooter-electric.png'
import scooter_normal from '../../../assets/icons/scooter.png'

export default function CustomMarker({
    p,
    isView,
    location,
    selected=null,
    handleSelect,
    MapChange,
    lat, lng,
    activeMarker,
    HandleClean,
    offer=null,
    handleActiveMarker,
    isHome = true,
    type = null
}) {

    const IconType = {
        'bicycle': bike_normal,
        'bicycle_electric': bike_electric,
        'scooter': scooter_normal,
        'scooter_electric': scooter_electric
    }

    return (
        <>
            <OverlayView
                position={{ lat : lat, lng : lng }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
                {
                    (isHome)
                        ? (
                            <>
                                <div className=''>
                                    <button className={`
                                group cursor-pointer transition-all ease-in-out delay-150 relative flex flex-col justify-center items-center w-12 h-12 p-2 rounded-full outline-none bg-gray-800 overflow-hidden border-2 border-white shadow-md
                                ${activeMarker?.uuid === offer?.uuid ? 'ring ring-[#65D01E]/60' : 'ring-0'}
                            `}
                                        onClick={handleActiveMarker}>
                                        <img
                                            className='w-full h-full flex justify-center items-center'
                                            src={
                                                IconType[offer?.vehicles.vehicle_type] || IconType['bicycle']
                                            }
                                        />
                                        {/*<span className='hidden transition-all ease-in-out delay-150 group-hover:w-full group-hover:h-full group-hover:flex group-hover:absolute group-hover:text-white group-hover:justify-center group-hover:items-center group-hover:bg-[#65D01E]'>
                                            MAD {200}
                                        </span>*/}
                                    </button>
                                    {activeMarker?.uuid?.toString() === offer?.uuid?.toString() ? (
                                        <div className='bg-white rounded-md p-2 z-50 shadow-md relative'>
                                            <button onClick={HandleClean} className='flex justify-end items-end text-end w-full text-sm'>
                                                <XMarkIcon className='text-gray-800 w-4 h-4 block' />
                                            </button>
                                            <InfoView offer={activeMarker} />
                                        </div>
                                    ) : null}
                                </div>
                            </>
                        )
                        : (
                            <>
                                <div>
                                    <button className={`
                                cursor-pointer relative flex flex-col justify-center items-center p-2 rounded-full outline-none bg-gray-800 overflow-hidden border-2 border-white shadow-md
                                ${(isView) && 'ring ring-[#65D01E]/60'} ${location?.id===selected?.id ? 'ring ring-[#65D01E]/80 w-12 h-12 z-30' : 'w-11 h-11'}
                            `}
                            onClick={() => {
                                handleSelect(location)
                                MapChange(location?.Latitude,location?.Longitude);
                            }}
                            >
                                    <img
                                        className='w-full h-full flex justify-center items-center'
                                        src={
                                            IconType[type] || IconType['bicycle']
                                        }   
                                    />
                                    </button>
                                </div>
                            </>
                        )
                }
            </OverlayView>
        </>
    )
}
