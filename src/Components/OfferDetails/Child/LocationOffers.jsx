import React from 'react'
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { styleMap } from "../../styleMap";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import LoadingPage from '../../../Containers/LoadingPage/LoadingPage';
import CustomMarker from '../../../Containers/MapsPage/Child/CustomMarker';

export default function LocationOffers({ isView = false, center, vehicle, height }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });
    if (!isLoaded) return <LoadingPage />;

    return <Map
        isView={isView}
        vehicle={vehicle}
        height={height}
    />;
}


function Map({ isView, vehicle, height }) {
    const [latlng, setlatLng] = useState(null)
    const containerStyle = {
        width: "100%",
        height: height,
    };
    const center = {
        lat: vehicle?.location && (vehicle?.location[0]?.Latitude || 33.9715904),
        lng: vehicle?.location && (vehicle?.location[0]?.Longitude || -6.8498129)
    }
    const options = {
        disableDefaultUI: true,
        scrollwheel: false,
        scaleControl: false,
        zoomControl: false,
        gestureHandling: "greedy",
        region: "MA",
        styles: styleMap,
    };

    const [zoom, setZoom] = useState(14);
    const mapRef = useRef(null);
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
        setlatLng({
            lat: vehicle?.location && (vehicle?.location[0]?.Latitude || 33.9715904),
            lng: vehicle?.location && (vehicle?.location[0]?.Longitude || -6.8498129)
        })
    }, [mapRef]);

    const onMapClick = (_lat, _lng) => {
        mapRef.current.panTo({
            _lat,
            _lng
        });
    }

    const ZoomIncrement = () => {
        if (zoom < 21) {
            setZoom((_zoom) => _zoom + 1);
            mapRef.current.setZoom(zoom);
        }
    };

    const ZoomDecrement = () => {
        if (zoom > 1) {
            setZoom((_zoom) => _zoom - 1);
            mapRef.current.setZoom(zoom);
        }
    };
    return (
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                zoom={zoom}
                center={{
                    lat: vehicle?.location[0]?.Latitude || 33.9715904,
                    lng: vehicle?.location[0]?.Longitude || -6.8498129
                }}
                mapContainerClassName="map-container w-full h-40"
                options={options}
                onLoad={onMapLoad}
                onClick={onMapClick}
            >
                <div className="absolute bg-transparent top-0 right-0 flex flex-col mt-4 mr-4 shadow-md">
                    <button
                        onClick={ZoomIncrement}
                        type="button"
                        className={`
              text-gray-900 bg-white border border-gray-200 focus:outline-none hover:bg-gray-100  font-medium rounded-t-md text-sm px-2 py-2.5
              ${zoom === 21
                                ? "disabled:opacity-50 cursor-not-allowed"
                                : " cursor-pointer"
                            }
          `}
                    >
                        <PlusIcon className="w-5 h-5 block" aria-hidden={true} />
                    </button>
                    <button
                        onClick={ZoomDecrement}
                        type="button"
                        className={`
                    text-gray-900 bg-white border-t border-l border-r border-gray-200 focus:outline-none hover:bg-gray-100  font-medium rounded-b-md text-sm px-2 py-2.5
                    ${zoom === 1
                                ? "disabled:opacity-60 cursor-not-allowed"
                                : " cursor-pointer"
                            }
                `}
                        disabled={zoom === 1}
                    >
                        <MinusIcon className="w-5 h-5 block" aria-hidden={true} />
                    </button>
                </div>
                {
                    vehicle?.location && vehicle?.location?.map((p) =>
                        <CustomMarker
                            lat={p?.Latitude}
                            lng={p?.Longitude}
                            key={p?.Address}
                            type={vehicle?.vehicle_type}
                            isHome={false}
                            isView={true}
                            MapChange={onMapClick}
                        />
                    )
                }
            </GoogleMap>
        </>
    )
}

