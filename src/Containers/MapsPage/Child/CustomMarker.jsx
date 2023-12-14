import React from 'react';
import { OverlayView } from '@react-google-maps/api';
import { XMarkIcon } from '@heroicons/react/24/solid';
import InfoView from './InfoView';
import bike_electric from '../../../assets/icons/bike-electric.png';
import bike_normal from '../../../assets/icons/bike-normal.png';
import scooter_electric from '../../../assets/icons/scooter-electric.png';
import scooter_normal from '../../../assets/icons/scooter.png';

const CustomMarker = ({
  p,
  isView,
  location,
  selected = null,
  handleSelect,
  MapChange,
  lat,
  lng,
  activeMarker,
  HandleClean,
  offer = null,
  handleActiveMarker,
  isHome = true,
  type = null,
}) => {
  const IconType = {
    bicycle: bike_normal,
    bicycle_electric: bike_electric,
    scooter: scooter_normal,
    scooter_electric: scooter_electric,
  };

  const handleMarkerClick = () => {
    handleActiveMarker();
  };

  const handleLocationClick = () => {
    handleSelect(location);
    MapChange(Number(location?.Latitude), Number(location?.Longitude));
  };

  return (
    <OverlayView
      position={{ lat: lat, lng: lng }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div className={`relative bg-white ${isHome ? '' : ''}`}>
        <button
          className={`
            group cursor-pointer transition-all ease-in-out delay-150 relative flex flex-col justify-center items-center w-12 h-12 p-2 rounded-full outline-none bg-gray-800 overflow-hidden border-2 border-white shadow-md
            ${activeMarker?.uuid === offer?.uuid ? 'ring ring-[#65D01E]/60' : 'ring-0'}
          `}
          onClick={isHome ? handleMarkerClick : handleLocationClick}
        >
          <img
            className='w-full h-full flex justify-center items-center'
            src={IconType[offer?.vehicles.vehicle_type] || IconType['bicycle']}
          />
        </button>
        {activeMarker?.uuid?.toString() === offer?.uuid?.toString() && isHome ? (
          <div className='bg-white rounded-md p-2 z-50 shadow-md relative'>
            <button onClick={HandleClean} className='flex justify-end items-end text-end w-full text-sm'>
              <XMarkIcon className='text-gray-800 w-4 h-4 block' />
            </button>
            <InfoView offer={activeMarker} />
          </div>
        ) : null}
      </div>
    </OverlayView>
  );
};

export default CustomMarker;
