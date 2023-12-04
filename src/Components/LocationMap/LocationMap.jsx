import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { styleMap } from "../styleMap";
import LoadingPage from "../../Containers/LoadingPage/LoadingPage";
import CustomMarker from "../../Containers/MapsPage/Child/CustomMarker";
import { useEffect, useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

export default function LocationMap({ isView,locations=null,location,setLocation,vehicle, height }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });
    if (!isLoaded) return <LoadingPage />;
    
  return <Map
    isView={isView}
    locations={locations}
    location={location}
    setLocation={setLocation}
    vehicle={vehicle}
    height={height}
  />;
}

function Map({ isView,locations,location,setLocation,vehicle, height }) {
  const [lnglng, setLanLng] = useState({
    lat: parseFloat(locations && (locations[0]?.Latitude || 33.9715904)),
    lng: parseFloat(locations && (locations[0]?.Longitude || -6.8498129)),
  });
  const containerStyle = {
    width: "100%",
    height: height,
  };
  const center = {
    lat: parseFloat(locations && (locations[0]?.Latitude || 33.9715904)),
    lng: parseFloat(locations && (locations[0]?.Longitude || -6.8498129)),
  };
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
  }, [mapRef]);

  const onMapClick = (_lat,_lng) => {
    setLanLng({
      lat: Number(_lat),
      lng: Number(_lng),
    });
    mapRef.current.panTo({
      _lat,
      _lng
    });
  }

  const handleSelect = (p) => {
    setLocation(p)
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
  useEffect(() => {
    let lat = parseFloat(location?.Latitude);
    let lng = parseFloat(location?.Longitude)
    if(lat && lng) mapRef.current.panTo({
      lat,
      lng
    });
  },[location])
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={zoom}
      center={lnglng}
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
                    text-gray-900 bg-white border-t border-l border-r border-gray-200 focus:outline-none hover:bg-gray-100  font-medium rounded-b-md text-sm px-2 py-2.5
                    ${
                      zoom === 1
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
        locations && locations?.map((p) =>
          <CustomMarker
            key={p?.Address}
            type={vehicle?.vehicle_type}
            lat={p?.Latitude}
            lng={p?.Longitude}
            isHome={false}
            isView={isView}
            location={p}
            selected={location}
            handleSelect={handleSelect}
            MapChange={onMapClick}
          />
        )
      }
    </GoogleMap>
  );
}
