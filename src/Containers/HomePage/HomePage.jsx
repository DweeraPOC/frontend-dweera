import React, { useCallback, useEffect, useState } from "react";
import Products from "../Products/Products";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_COMPLETE_PROFILE,
  SET_LOADING,
  SET_OFFERS,
  SHOW_COMPLETE_PROFILE,
} from "../../Redux/Actions/actions";
import axios from "axios";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Middlewares/AuthContext";
import Footer from "../../Components/footer/Footer";
import LandingSection from "../../Components/LandingSection/LandingSection";
import SideBar from "../../Components/Navbar/SideBar";
import FilterBar from "../../Components/Navbar/FilterBar";
import { useRef } from "react";
import { Helmet } from "react-helmet";
import FilterButton from "./FilterButton";

export default function HomePage() {
  const dispatch = useDispatch();
  const listBy = useSelector((state) => state.OffersReducer.listBy);
  const offers = useSelector((state) => state.OffersReducer.offers);
  const FiltredOffers = offers;


  const [page, setPage] = React.useState(1);
  const [priceRange, setPriceRange] = React.useState([0, 200]);
  const [rating, setRating] = React.useState(null);
  const [bookingType, setBookingType] = React.useState(null);
  const [vehicleType, setvehicleType] = React.useState(null);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [searchText, setSearchText] = useState(null);
  const [city, setCity] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  //const [loading2, setLoading2] = useState(true);
  const [hasNext, setHasNext] = useState(true);

  const getOffers = useCallback(async (filters) => {

    setLoading(true)
    await axios({
      method: "GET",
      url: `${process.env.REACT_APP_MAIN_URL}/offers/searchv2?page=${filters.page}&city=${filters.city}&rating=${filters.rating}&vehicleType=${filters.vehicleType}&minPrice=${filters.priceRange[0]}&maxPrice=${filters.priceRange[1]}&startDate=${filters.startDate}&endDate=${filters.endDate}&bookingType=${filters.bookingType}&query=${filters.searchText}`,
    })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          //console.log(response.data)
          setHasNext(data.payload.hasNext);
          setFilteredData((prevData) => {
            dispatch(SET_OFFERS([...prevData, ...data.payload.offers]))
            return [...prevData, ...data.payload.offers]
          });
        }
      })
      .catch((err) => {
        // err
        setHasNext(false)
      })
      .finally(() => {
        setLoading(false);
        //console.log([...offers])
      })
  }, [])

  const [disabledIds, setDisabledIds] = useState([]);
  const DisabledId = useCallback(async () => {
    /*await axios
      .request({
        method: "POST",
        url: `${process.env.REACT_APP_MAIN_URL}/booking/Filter-Range-Date/`,
        data: {
          startDate: Options.dateRange.start,
          endDate: Options.dateRange.end,
        },
      })
      .then((response) => {
        setDisabledIds(response.data.data);
      })
      .catch((err) => {
        //console.log(err);
      });*/
  }, []);


  const location = useLocation();
  useEffect(() => {
    const filters = {
      page: page,
      city: city,
      rating: rating,
      vehicleType: vehicleType,
      priceRange: priceRange,
      startDate: startDate,
      endDate: endDate,
      bookingType: bookingType,
      searchText: searchText,
    };

    getOffers(filters);
    DisabledId();
  }, [DisabledId]);

  const handleLoadMore = (e) => {
    const filters = {
      page: page + 1,
      city: city,
      rating: rating,
      vehicleType: vehicleType,
      priceRange: priceRange,
      startDate: startDate,
      endDate: endDate,
      bookingType: bookingType,
      searchText: searchText,
    };
    setPage(page + 1)
    getOffers(filters);
  };
  const handleApplyFilters = () => {
    const filters = {
      page: page,
      city: city,
      rating: rating,
      vehicleType: vehicleType,
      priceRange: priceRange,
      startDate: startDate,
      endDate: endDate,
      bookingType: bookingType,
      searchText: searchText,
    };
    setFilteredData([])
    getOffers(filters);
  };


  useEffect(() => {
    const filters = {
      page: page,
      city: city,
      rating: rating,
      vehicleType: vehicleType,
      priceRange: priceRange,
      startDate: startDate,
      endDate: endDate,
      bookingType: bookingType,
      searchText: searchText,
    };

    getOffers(filters);
  }, []);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleBookingTypeChange = (event) => {
    setBookingType(event.target.value);
  };
  const handlevehicleTypeChange = (event) => {
    setvehicleType(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const starStyle = {
    color: 'green',
    width: "17px",
    height: "17px",
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const [filtersVisible, setFiltersVisible] = useState(false);

  const handleToggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };


  const handleClearFilters = () => {
    setPage(1);
    setPriceRange([0, 200]);
    setRating(null);
    setBookingType(null);
    setvehicleType(null);
    setStartDate(null);
    setEndDate(null);
    setSearchText(null);
    setCity(null);
    const filters = {
      page: 1,
      city: null,
      rating: null,
      vehicleType: null,
      priceRange: [0, 200],
      startDate: null,
      endDate: null,
      bookingType: null,
      searchText: null,
    };
    setFilteredData([])
    getOffers(filters);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dweera | Home</title>
      </Helmet>
      {/*loading ? (
        <div className="flex items-center justify-items-start justify-center absolute h-full w-full bg-white z-40">
          <LoadingPage />
        </div>
      ) : null*/}
      <div >
        <LandingSection />
        <div className="">
          {location?.pathname === "/" || location?.pathname === "" ?

            <div className="relative bottom-10 left-0 h-full bg-white w-80 mx-auto rounded-lg">
              <div style={{ width: '95%' }}>
                <SideBar />
              </div>
            </div>

            : null}
        </div>
        {<div className={`${listBy === "grid" ? "mt-4 mb-5 pb-24 mx-auto container" : ""}`}>
          <div className="w-full">
            <div className="w-full h-full flex justify-center items-center">
              <div style={{ width: '85%' }} className="pb-8 px-2">
                <FilterButton
                  filtersVisible={filtersVisible}
                  searchText={searchText}
                  handleSearchTextChange={handleSearchTextChange}
                  bookingType={bookingType}
                  handleBookingTypeChange={handleBookingTypeChange}
                  city={city}
                  handleCityChange={handleCityChange}
                  priceRange={priceRange}
                  handlePriceChange={handlePriceChange}
                  vehicleType={vehicleType}
                  handlevehicleTypeChange={handlevehicleTypeChange}
                  startDate={startDate}
                  handleStartDateChange={handleStartDateChange}
                  endDate={endDate}
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                  handleEndDateChange={handleEndDateChange}
                  handleApplyFilters={handleApplyFilters}
                  handleClearFilters={handleClearFilters}
                  handleToggleFilters={handleToggleFilters}
                />
              </div>
            </div>

            <Products
              FiltredOffers={FiltredOffers}
              disabledIds={disabledIds}
              DisabledId={DisabledId}
              filteredData={filteredData}
              loading={loading}
              hasNext={hasNext}
              handleLoadMore={handleLoadMore}
            />
          </div>
        </div>}
        <div className="w-full fixed bottom-0 z-30">
          <Footer />
        </div>
      </div>
    </>
  );
}
