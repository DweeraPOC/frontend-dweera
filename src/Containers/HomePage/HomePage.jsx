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

export default function HomePage() {
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(true);
  const listBy = useSelector((state) => state.OffersReducer.listBy);
  const offers = useSelector((state) => state.OffersReducer.offers);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex,setStartIndex] = useState(0);
  const [endIndex,setEndIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const FiltredOffers = offers;


  const getOffers = useCallback( async () => {
    setLoading(false)
  },[])

  const FetchMore = () => {
    const offersSelected = FiltredOffers.slice(startIndex,endIndex);
    const merge = [FiltredOffers, ...offersSelected];
    FiltredOffers = merge;
    setCurrentPage(currentPage+1)
    setHasMore(currentPage===totalPages? true : false);
  }
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
    getOffers();
    DisabledId();
  }, [DisabledId, getOffers]);
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Dweera | Home</title>
    </Helmet>
      {loading ? (
        <div className="flex items-center justify-items-start justify-center absolute h-full w-full bg-white z-40">
          <LoadingPage />
        </div>
      ) : null}
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
              <Products
                FiltredOffers={FiltredOffers}
                disabledIds={disabledIds}
                DisabledId={DisabledId}
                FetchMore={FetchMore}
                hasMore={true}
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
