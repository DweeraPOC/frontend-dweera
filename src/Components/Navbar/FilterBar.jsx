import React , {useState , useCallback,useEffect} from 'react';
import { 
        Grid, 
        FormControl, 
        InputLabel, 
        Select, 
        MenuItem, 
        Slider, 
        TextField, 
        Typography, 
        styled  ,
} from '@mui/material';

import StarIcon from '@mui/icons-material/Star';
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import ElectricBikeIcon from "@mui/icons-material/ElectricBike";
import { ScootersIcon } from './ScootersIcon';
import { useTranslation } from "react-i18next";
import {
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";
import ProductItem from '../../Containers/Products/ProductItem';
import axios from 'axios';

const GreenSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.success.main,
    }));


const FilterBar = () => {
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
  const [loading,setLoading] = useState(true);
  const [hasNext,setHasNext] = useState(true);
  
  const getOffers = useCallback( async (filters) => {
   
    setLoading(true)
    await axios({
      method : "GET",
       url : `${process.env.REACT_APP_MAIN_URL}/offers/searchv2?page=${filters.page}&city=${filters.city}&rating=${filters.rating}&vehicleType=${filters.vehicleType}&minPrice=${filters.priceRange[0]}&maxPrice=${filters.priceRange[1]}&startDate=${filters.startDate}&endDate=${filters.endDate}&bookingType=${filters.bookingType}&query=${filters.searchText}`,
    })
    .then((response) => {
      if(response.status===200)
      {
        const data = response.data;
        console.log(response.data)
        setHasNext(data.payload.hasNext)
        setFilteredData((prevData) => [...prevData, ...data.payload.offers]); 
      } 
    })
    .catch((err) => {
      // err
      setHasNext(false)
    })
    .finally(() => setLoading(false))
  },[])

 


  const handleLoadMore = (e) => {
    const filters = {
      page:page+1,
      city: city,
      rating:rating,
      vehicleType:vehicleType,
      priceRange:priceRange,
      startDate:startDate,
      endDate:endDate,
      bookingType:bookingType,
      searchText:searchText,
    };
    setPage(page+1)
    getOffers(filters);
  };
  const handleApplyFilters = () => {
    const filters = {
      page:page,
      city: city,
      rating:rating,
      vehicleType:vehicleType,
      priceRange:priceRange,
      startDate:startDate,
      endDate:endDate,
      bookingType:bookingType,
      searchText:searchText,
    };
    setFilteredData([])
    getOffers(filters);
  };


  useEffect(() => {
    const filters = {
      page:page,
      city: city,
      rating:rating,
      vehicleType:vehicleType,
      priceRange:priceRange,
      startDate:startDate,
      endDate:endDate,
      bookingType:bookingType,
      searchText:searchText,
    };
   
    getOffers(filters);
  }, []); 

  const { t } = useTranslation();
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

  const generateStars = (count) => {
    return Array.from({ length: count }, (_, index) => (
      <StarIcon key={index} style={starStyle} />
    ));
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
      page:1,
      city: null,
      rating:null,
      vehicleType:null,
      priceRange:[0, 200],
      startDate:null,
      endDate:null,
      bookingType:null,
      searchText:null,
    };
    setFilteredData([])
    getOffers(filters);
  };
  return (
    <div className="w-full  items-center justify-center relative bottom-10">
   {/* Toggle Filters Button */}
    <div >
          {!filtersVisible ? (
            // Green filter button
            <>
               <div className="flex justify-center items-center relative bottom-5">
                <button
                  onClick={handleToggleFilters}
                    type="button"
                    className="text-gray-900 bg-gray-100 hover:bg-gray-200
                                font-medium rounded-lg text-sm 
                                px-2 py-2 w-20 text-center gap-2
                                flex flex-row justify-evenly items-center"
                  >
                  <AdjustmentsHorizontalIcon
                    className="block h-6 w-6"
                    aria-hidden="true"
                  />
                  <span >{t("Filter")}</span>
                </button>
              </div>
            </>
          ) : (
            // Red close button
            <>
            <div className={`flex justify-center items-center relative bottom-5`}>
              <button
                name='grid'
                type='button'
                onClick={handleToggleFilters}
                className={` w-20 bg-red-600 hover:bg-red-900
                font-medium rounded-lg text-sm 
                px-2 py-2 text-center gap-2
                flex flex-row justify-evenly items-center`}>
                X
                </button>
            </div>
            </>
          )}
        </div>

  {filtersVisible && (
    // filter input
    <Grid container spacing={2} justify="center" alignItems="center">
      {/* Search Input */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControl fullWidth>
              <TextField
                label="Search"
                variant="outlined"
                value={searchText}
                onChange={handleSearchTextChange}
              />
            </FormControl>
          </Grid>

      {/* Price Range Slider */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControl fullWidth>
          <Typography id="range-slider" gutterBottom>
            Price Range
          </Typography>
          <GreenSlider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={200}
          />
        </FormControl>
      </Grid>

      {/* Rating FormControl */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControl fullWidth>
          <InputLabel id="rating-label">Rating</InputLabel>
            <Select
                labelId="rating-label"
                id="rating-select"
                value={rating}
                label="Rating"
                onChange={handleRatingChange}
                >
                {[1, 2, 3, 4, 5].map((value) => (
                    <MenuItem key={value} value={value}>
                        {generateStars(value)}
                    </MenuItem>
                ))}
                </Select>
        </FormControl>
      </Grid>

      {/* Type de véhicules  FormControl */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControl fullWidth>
          <InputLabel id="véhicules-type-label">véhicules</InputLabel>
          <Select
            labelId="véhicules-type-label"
            id="véhicules-type-select"
            value={vehicleType}
            label="Type de véhicules"
            onChange={handlevehicleTypeChange}
          >
            <MenuItem value="bicycle">
                <PedalBikeIcon className="block" aria-hidden="true" style={{ color: 'green', marginRight:10,fontSize: 20 }}/>
                bicycle
            </MenuItem>
            <MenuItem value="scooter">
                <div style={{ marginRight:10 }}>
                    <ScootersIcon
                        name={"scooter"}
                        style={{
                        color: 'green',
                        width: "25px",
                        height: "25px",
                        }}
                    />   
                </div>    
                Scooter
            </MenuItem>
            <MenuItem value="bicycle_electric">
                <ElectricBikeIcon className="block" aria-hidden="true" style={{ color: 'green', marginRight:10,fontSize: 20 }}/>
                bicycle_electric
            </MenuItem>
            <MenuItem value="scooter_electric">
                <div style={{ marginRight:10 }}>
                        <ScootersIcon
                           name={"scooter_electric"}
                            style={{
                            color: 'green',
                            width: "25px",
                            height: "25px",
                            }}
                        />   
                </div>                 
                scooter_electric
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>

 {/* Booking Type FormControl */}
 <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControl fullWidth>
          <InputLabel id="booking-type-label">Booking</InputLabel>
          <Select
            labelId="booking-type-label"
            id="booking-type-select"
            value={bookingType}
            label="Booking Type"
            onChange={handleBookingTypeChange}
          >
            <MenuItem value="per Hour">per Hour</MenuItem>
            <MenuItem value="per Day">per Day</MenuItem>
            <MenuItem value="per Week">per Week</MenuItem>
            <MenuItem value="per Month">per Month</MenuItem>
          </Select>
        </FormControl>
      </Grid>

        {/* City Type FormControl */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControl fullWidth>
              <InputLabel id="city-type-label">Cities</InputLabel>
              <Select
                labelId="city-type-label"
                id="city-type-select"
                value={city}
                label="City Type"
                onChange={handleCityChange}
              >
                <MenuItem value="casablanca">Casablanca</MenuItem>
                <MenuItem value="marrakech">Marrakech</MenuItem>
                <MenuItem value="tanga">Tanga</MenuItem>
                <MenuItem value="agadir">Agadir</MenuItem>
              </Select>
            </FormControl>
          </Grid>

      {/* Start and End Date Selectors */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControl fullWidth>
          <TextField
            id="start-date"
            label="Start Date"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControl fullWidth>
          <TextField
            id="end-date"
            label="End Date"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      </Grid>
       {/* Apply Filters Button */}
       <Grid item xs={12}>
            <button
              type="button"
              onClick={handleApplyFilters}
              className="bg-green-700 mr-4 text-white px-4 py-2 rounded-md"
            >
              Apply Filters
            </button>
            <button
              type="button"
              onClick={handleClearFilters}
              className="bg-red-600  text-gray-800 px-4 py-2 rounded-md"
            >
              Clear Filters
            </button>
        </Grid>
  </Grid>
      )}
    
        <div className="mt-8">
          <Grid container spacing={2} justify="center" alignItems="center">
            {filteredData.length > 0 
                  ? 
                (filteredData.map((item) => (
                    <Grid key={item.offer_id} item xs={12} sm={6} md={4} lg={3}>
                      <ProductItem OfferData={item} t={t} />
                    </Grid>))
                )
                   : 
                (
                  <Grid item xs={12}>
                    <div style={{ textAlign: 'center' }}>
                      No offers in this filter.
                    </div>
                  </Grid>
                )
            }
          </Grid>
          
          <div className="flex justify-center items-center mt-10">
           {!loading ? ( 
            <>
            {hasNext ? 
            <button
                 type="button"
                onClick={handleLoadMore}
                className="bg-green-500 text-white px-4 py-2 mr-4 rounded-md"
              >
                Load More
            </button> 
            : null
          }
           
             <button
                 type="button"
                 onClick={handleScrollToTop}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                go up
            </button>
            </>
            ) : 
            <button
                 type="button"
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Waiting
            </button>
            }
          </div>
          
        </div>
      
    </div>
  );
};
export default FilterBar;
