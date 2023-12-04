import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { styleMap } from "../../Components/styleMap";
import "./style.css";
import { PlusIcon, MinusIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../LoadingPage/LoadingPage";
import CustomMarker from "./Child/CustomMarker";

export default function MapOffers(props) {
  const [activeMarker, setActiveMarker] = useState(null);
  const [zoom, setZoom] = useState(14);
  const [finding, setFinding] = useState(false);
  const Coords = useSelector((state) => state.OffersReducer.position);
  const isLocated = useSelector((state) => state.OffersReducer.isLocated);
  const dispatch = useDispatch();
  const [lnglng, setLanLng] = useState({
    lat: Number(Coords.lat),
    lng: Number(Coords.lng),
  });

  const mapRef = useRef();
  const onMapLoad = useCallback(
    (map) => {
      mapRef.current = map;
    },
    [mapRef]
  );

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(13);
  }, []);

  const libraries = ["places"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const defaultPosition = {
    lat: Number(Coords.lat),
    lng: Number(Coords.lng),
  };

  const Options = {
    styles: styleMap,
    mapTypeControl: false,
    disableDefaultUI: true,
    scrollwheel: false,
    scaleControl: false,
    zoomControl: false,
    scaleControl: false,
    streetViewControl: false,
    overviewMapControl: false,
  };

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
    const _lat = Number(marker?.vehicles?.location?.Latitude);
    const _lng = Number(marker?.vehicles?.location?.Longitude);
    setLanLng({
      lat: Number(_lat),
      lng: Number(_lng),
    });
    mapRef.current.panTo({
      _lat,
      _lng
    });
  };
  const HandleClean = () => {
    setActiveMarker(null);
  };

  const ZoomIncrement = useCallback(() => {
    if (mapRef.current.getZoom() < 21) {
      //setZoom(_zoom=> _zoom+1)
      mapRef.current.setZoom(mapRef.current.getZoom() + 1);
    }
  }, [zoom]);

  const ZoomDecrement = useCallback(() => {
    if (mapRef.current.getZoom() > 4) {
      //setZoom(_zoom=> _zoom-1)
      mapRef.current.setZoom(mapRef.current.getZoom() - 1);
    }
  }, [zoom]);

  const GetGeolocation = useCallback(() => {
    setFinding(true);
    navigator.geolocation.watchPosition(
      (position) => {
        navigator.geolocation.getCurrentPosition((position) => {
          const p = position.coords;
          setLanLng({
            lat: Number(p.latitude),
            lng: Number(p.longitude),
          });
        });
      },
      function (error) {
        if (error.code === error.PERMISSION_DENIED) var lat = 33.5731104;
        var lng = -7.589843399999999;
        setLanLng({
          lat: Number(lat),
          lng: Number(lng),
        });
      }
    );
  }, []);

  useEffect(() => {
    GetGeolocation();
  }, []);

  if (!isLoaded) return <LoadingPage />;
  if (loadError) return <div>Error</div>;
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <GoogleMap
          id="dweeraCustomMap"
          zoom={14}
          center={{
            lat: lnglng?.lat,
            lng: lnglng?.lng,
          }}
          mapContainerStyle={containerStyle}
          options={Options}
          onLoad={onMapLoad}
          ref={mapRef}
        >
          {props?.offers &&
            props?.offers?.map((offers, __oindex) => {
              return offers?.map((offer,__pindex) => {
                return (
                  <CustomMarker
                    isHome={true}
                    key={`${offer?.uuid}`}
                    lat={Number(offer?.vehicles?.location?.Latitude)}
                    lng={Number(offer?.vehicles?.location?.Longitude)}
                    handleActiveMarker={() => {
                      handleActiveMarker(offer);
                    }}
                    HandleClean={HandleClean}
                    activeMarker={activeMarker}
                    offer={offer}
                  />
                )
              })
            })}
          <div className="absolute bg-transparent top-0 right-0 flex flex-col mt-6 mr-6 shadow-md overflow-hidden">
            {/*<button 
                            onClick={GetGeolocation}
                            type="button"
                            className={`
                                flex justify-center items-center text-gray-900 overflow-hidden bg-white border-t border-r border-l border-gray-200 focus:outline-none hover:bg-gray-100 rounded-t-md  font-medium text-sm px-2 py-2.5
                                ${zoom===21 ? 'disabled:opacity-50 cursor-not-allowed' : ' cursor-pointer'}
                            `}
                        >
                            {
                                (finding)
                                ? (
                                    <span class="relative flex justify-center items-center h-3 w-3 p-1">
                                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                    </span>
                                )
                                : (
                                    <MapPinIcon className="w-5 h-5 block" aria-hidden={true} />
                                )
                            }
                        </button>*/}
            <button
              onClick={ZoomIncrement}
              type="button"
              className={`
                                flex justify-center items-center text-gray-900 overflow-hidden bg-white border border-gray-200 focus:outline-none hover:bg-gray-100 rounded-t-md  font-medium text-sm px-2 py-2.5
                                ${
                                  zoom === 21
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
                  flex justify-center items-center text-gray-900 overflow-hidden bg-white border-b border-l border-r border-gray-200 focus:outline-none hover:bg-gray-100  font-medium rounded-b-md text-sm px-2 py-2.5
                  ${
                    zoom === 4
                      ? "disabled:opacity-60 cursor-not-allowed"
                      : " cursor-pointer"
                  }
              `}
              disabled={zoom === 4}
            >
              <MinusIcon className="w-5 h-5 block" aria-hidden={true} />
            </button>
          </div>
        </GoogleMap>
      </div>
    </>
  );
}
