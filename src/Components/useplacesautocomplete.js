import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useLoadScript } from "@react-google-maps/api";
export default function PlacesAutocomplete()
{ 
    const libraries = ["places"];
    const {isLoaded,loadError } = useLoadScript({
        googleMapsApiKey  : process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,}
        );

    if (!isLoaded) return (<div>Loading...</div>);
    if (loadError) return (<div>Error</div>);
    return <Search/>;
}
function Search() {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };
  const handleSelect =  ({ description }) =>
  async () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      try {
        const results = await getGeocode({ address: description });
        const { lat, lng } = await getLatLng(results[0]);
        let  adress  = results[0].formatted_address;
       
        //console.log("lat",lat)
        //console.log("lng",lng)
        //console.log("adress",adress)

      } catch (error) {
        //console.log(" Error: ", error);
      }


      // Get latitude and longitude via utility functions
     {/* getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log(" Coordinates: ", { lat, lng });
      });
    */}
    };

    const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

    return (
        <div ref={ref}>
          <input
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Where are you going?"
          />
          {/* We can use the "status" to decide whether we should display the dropdown or not */}
          {status === "OK" && <ul>{renderSuggestions()}</ul>}
        </div>
      );
};