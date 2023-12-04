import ProductItem from "./ProductItem";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

import MapOffers from "../MapsPage/MapOffers";
import LoadingPage from "../LoadingPage/LoadingPage";
import EmptyState from "../../Components/EmptyState/EmptyState";
import { useState } from "react";
import FilterBar from "../../Components/Navbar/FilterBar";


export default function Products(props) {
  const Query = useSelector((state) => state.OffersReducer.query);
  const listBy = useSelector((state) => state.OffersReducer.listBy);
  const Coords = useSelector((state) => state.OffersReducer.position);
  const Options = useSelector((state) => state.FilterReducer.options);
  const [offers,setOffers] = useState([]);
  const { t } = useTranslation();
  

  /**
   * Calc disrance my two point
   */
    const Calc_distance = (p1, p2) => {
      var R = 3958.8; // Radius of the Earth in miles
      var rlat1 = p1.lat * (Math.PI / 180); // Convert degrees to radians
      var rlat2 = p2.lat * (Math.PI / 180); // Convert degrees to radians
      var difflat = Math.abs(rlat2 - rlat1); // Radian difference (latitudes)
      var difflon = Math.abs(p1.lng - p2.lng) * (Math.PI / 180); // Radian difference (longitudes)
      var d =
        2 *
        R *
        Math.asin(
          Math.sqrt(
            Math.sin(difflat / 2) * Math.sin(difflat / 2) +
              Math.cos(rlat1) *
                Math.cos(rlat2) *
                Math.sin(difflon / 2) *
                Math.sin(difflon / 2)
          )
        );
      return (d * 1.60934).toFixed(2); // convert from mile to km
    };
    const SortedOffers = props?.FiltredOffers.map((o) => {
      return {
          ...o,
          vehicles : {
            ...o.vehicles,
            location : o.vehicles.location.map((l) => {
              return {
                ...l,
                Distance : Number(
                  Calc_distance(
                    {
                      lat: Coords.lat,
                      lng: Coords.lng,
                    },
                    {
                      lat: l?.Latitude,
                      lng: l?.Longitude,
                    }
                  )
                ),
              }
            }).sort((a,b) => a.Distance - b.Distance)
          }
        }                      
    }).sort((a,b) => a.vehicles.location[0].Distance - b.vehicles.location[0].Distance);

    
  const ApplyFilters = () => {
    // get just type selected
    const TypeSelected = Options.vehicles
      .filter((item) => item.selected)
      .map((item) => item.name);
    return SortedOffers
      .filter((offer) =>
        // filter by type
        TypeSelected.length === 0
          ? offer
          : TypeSelected.includes(offer.vehicles.vehicle_type)
      )
      .filter((offer) =>
        props.disabledIds.length === 0
          ? offer
          : !props.disabledIds.includes(offer.offer_id)
      )
      ?.filter(
        (offer) =>
          offer.title.toLowerCase().includes(Query) ||
          offer.offer_description.toLowerCase().includes(Query)
      );
  };

  useEffect(() => {
    props.DisabledId();
  }, [props.DisabledId]);

  const CleanOffers = ApplyFilters()?.map((o) => {
    return o?.vehicles?.location?.map((p) => {
      return {
        ...o,
        uuid : Math.random().toString(16).slice(2),
        vehicles : {
          ...o.vehicles,
          location : p
        }
      }
    })
  })
  return (
    <>
      {listBy === "grid" ? (
        <div className="w-full">
          <div className="w-full h-full flex justify-center items-center">
              <div style={{ width: '85%' }}>
                <FilterBar />
              </div>
            </div>
          {/* {ApplyFilters()?.length > 0 ? (
            <>
        
                <div className="flex flex-row flex-wrap gap-4 justify-items-center justify-start items-start md:px-2 px-8 py-4 text-start w-full">
                  {ApplyFilters()?.map((offer, index) => (
                    <ProductItem OfferData={offer} key={index} t={t}/>
                  ))}
                </div>
              </> 
          ) : (
            <EmptyState
              msg={"OffersNotAvailable"}
              path={"/add-new-offer"}
              goTo={"AddOffer"}
            />
          )} */}
        </div>
      ) : (
        <MapOffers offers={CleanOffers} />
      )}
    </>
  );
}
