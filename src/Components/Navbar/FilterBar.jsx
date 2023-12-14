import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
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
import { ScootersIcon } from './ScootersIcon';
import { useTranslation } from "react-i18next";
import {
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";
import ProductItem from '../../Containers/Products/ProductItem';
import axios from 'axios';
import { SET_OFFERS } from '../../Redux/Actions/actions';
import EmptyState from '../EmptyState/EmptyState';

const GreenSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.success.main,
}));


const FilterBar = ({ filteredData,loading,handleLoadMore,hasNext }) => {
  const { t } = useTranslation()
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div className="w-full  items-center justify-center relative bottom-10">

      <div className="mt-8">
        <Grid container spacing={2} justify="center" alignItems="center">
          {filteredData.length > 0
            ?
            (filteredData.map((item) => (
              <Grid key={item.offer_id} item xs={12} sm={6} md={4} lg={3}>
                <ProductItem OfferData={item} t={t} />
              </Grid>))
            )
            : null
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
