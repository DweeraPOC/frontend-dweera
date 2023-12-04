import React, { useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { styleMap } from "../../../Components/styleMap";
import LoadingPage from "../../LoadingPage/LoadingPage";
import ErrorDisplayer from "../../../Components/ErrorDisplayer/ErrorDisplayer";

export default function LocationPicker({
  locations,
  setLocations,
  HandleAdd,
  HandleRemove,
  locationsError,
  setLocationsError,
  t,
}) {
  const coords = useSelector((state) => state.OffersReducer.position);
  const options = {
    disableDefaultUI: true,
    zoomControl: true,
    styles: styleMap,
  };
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleLocationChange = ({ lat, lng }) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLocationsError("");
        const newLocations = [...locations];
        let lastElement = newLocations[locations.length - 1];
        lastElement.Address = data.results[0].formatted_address;
        lastElement.Latitude = lat;
        lastElement.Longitude = lng;
        return setLocations([...newLocations]);
      })
      .catch((error) => console.log(error));
  };

  const onMapClick = useCallback(
    (event) => {
      const { lat, lng } = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      panTo({ lat, lng });
      handleLocationChange({ lat, lng });
    },
    [locations]
  );

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const SearchMap = ({ panTo }) => {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: {
          lat: () => locations[locations.length - 1]?.Latitude,
          lng: () => locations[locations.length - 1]?.Longitude,
        },
        radius: 200 * 1000,
      },
    });

    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();
      try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        handleLocationChange({ lat, lng });
        panTo({ lat, lng });
        locations[locations.length - 1].Address = address;
        locations[locations.length - 1].Latitude = lat;
        locations[locations.length - 1].Longitude = lng;
      } catch (error) {
        alert("An error occured please try again.");
      }
    };

    return (
      <div className="Z-40">
        <Combobox
          className="z-30 flex flex-row gap-2 items-center"
          onSelect={handleSelect}
        >
          <ComboboxInput
            className="border border-lime-600 ring-0 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            disabled={!ready}
            placeholder={t("Entre address manually") + "...."}
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" ? (
                data.map(({ id, description }) => (
                  <ComboboxOption
                    key={id}
                    value={description}
                    className="z-30 border border-lime-600 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  >
                    <LocationOnIcon style={{ color: "#65D01E" }} />
                    <ComboboxOptionText />
                  </ComboboxOption>
                ))
              ) : (
                <span
                  key={status}
                  className="text-gray-400 m-2 text-center flex justify-center items-center text-lg"
                >
                  {t("No results")}
                </span>
              )}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    );
  };

  const libraries = ["places"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  if (!isLoaded) return <LoadingPage />;
  if (loadError) return <div>Error</div>;

  return (
    <>
      <div className="flex flex-col gap-4">
        <SearchMap panTo={panTo} />
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={coords}
          options={options}
          zoom={14}
          onLoad={onMapLoad}
          onClick={onMapClick}
        >
          {locations &&
            locations?.map((_l, index) => (
              <Marker
                key={index}
                position={{
                  lat: _l.Latitude,
                  lng: _l.Longitude,
                }}
              />
            ))}
        </GoogleMap>
        <div className="w-full flex flex-col gap-2">
          {locations &&
            locations.map((location, index) => {
              return (
                <div
                  className="flex flex-row gap-2 items-center"
                  key={location.id}
                >
                  <input
                    type="text"
                    aria-label="disabled input 2"
                    className="border border-lime-600 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    value={location.Address || ""}
                    placeholder={t("Select a location from the map")}
                    disabled
                    readOnly
                  />
                  {locations.length - 1 > 0 ? (
                    <DeleteIcon
                      onClick={() => {
                        HandleRemove(location.id, locations, setLocations);
                      }}
                    />
                  ) : null}
                  {location.Address &&
                  index === locations.length - 1 &&
                  locations.length < 5 ? (
                    <AddCircleIcon
                      onClick={() =>
                        HandleAdd(locations, setLocations, setLocationsError, t)
                      }
                    />
                  ) : null}
                </div>
              );
            })}
        </div>
        <ErrorDisplayer error={locationsError} />
      </div>
    </>
  );
}
