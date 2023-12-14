import React from 'react'
import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider,
    TextField,
    Typography,
    styled,
  } from '@mui/material';
  
  import StarIcon from '@mui/icons-material/Star';
  import PedalBikeIcon from "@mui/icons-material/PedalBike";
  import ElectricBikeIcon from "@mui/icons-material/ElectricBike";
  import { ScootersIcon } from '../../Components/Navbar/ScootersIcon';
  import { useTranslation } from "react-i18next";
  import {
    AdjustmentsHorizontalIcon,
  } from "@heroicons/react/24/solid";

export default function FilterButton({ 
    filtersVisible,
    handleToggleFilters,
    searchText,
    handleSearchTextChange,
    priceRange,
    handlePriceChange,
    rating,
    handleRatingChange,
    vehicleType,
    handlevehicleTypeChange,
    bookingType,
    handleBookingTypeChange,
    city,
    handleCityChange,
    endDate,
    handleEndDateChange,
    startDate,
    handleStartDateChange,
    handleApplyFilters,
    handleClearFilters

}) {
    const { t } = useTranslation();
    const starStyle = {
        color: 'green',
        width: "17px",
        height: "17px",
      };
      const GreenSlider = styled(Slider)(({ theme }) => ({
        color: theme.palette.success.main,
      }));
    const generateStars = (count) => {
        return Array.from({ length: count }, (_, index) => (
          <StarIcon key={index} style={starStyle} />
        ));
      };
    return (
        <>
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
                                    <PedalBikeIcon className="block" aria-hidden="true" style={{ color: 'green', marginRight: 10, fontSize: 20 }} />
                                    bicycle
                                </MenuItem>
                                <MenuItem value="scooter">
                                    <div style={{ marginRight: 10 }}>
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
                                    <ElectricBikeIcon className="block" aria-hidden="true" style={{ color: 'green', marginRight: 10, fontSize: 20 }} />
                                    bicycle_electric
                                </MenuItem>
                                <MenuItem value="scooter_electric">
                                    <div style={{ marginRight: 10 }}>
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
        </>
    )
}
