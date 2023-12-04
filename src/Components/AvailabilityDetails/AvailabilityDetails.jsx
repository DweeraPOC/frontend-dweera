import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import ErrorDisplayer from "../ErrorDisplayer/ErrorDisplayer";
import { useAuth } from "../../Middlewares/AuthContext";
import BicycleShop from "../../assets/images/BicycleShop.svg";
import AvailabilityDays from "../AvailabilityDays/AvailabilityDays";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';
import PriceSection from "../PriceSection/PriceSection";

function AvailabilityDetails({
  setPriceError,
  setAvaibilityTypeError,
  setPhoneNumberError,
  pricePerHour,
  setPricePerHour,
  pricePerDay,
  setPricePerDay,
  priceError,
  avaibilityTypeError,
  phoneNumber,
  setPhoneNumber,
  phoneNumberError,
  time,
  setTime,
  tabs,
  setTabs,
  panels
}) {
  const auth = useAuth();
  const [phone, setPhone] = useState(false);
  const { t } = useTranslation();

  const [status, setStatus] = React.useState({
    pricePerHour: false,
    pricePerHalfDay: false,
    pricePerDay: false,
    pricePerWeek: false,
    pricePerMonth: false,

    pricePerHourValue: 0,
    pricePerHalfDayValue: 0,
    pricePerDayValue: 0,
    pricePerWeekValue: 0,
    pricePerMonthValue: 0,
  });


  const [rent, setRent] = useState({
    rentType: "none",
    rentTypeError: null,
  });

  const [newDays,setNewDays] = useState({
    days : {},
    availability : {}
  })

  const InitialData = async () => {
    await axios
      .get(`${process.env.REACT_APP_MAIN_URL}/users/user-info`, {
        headers: {
          "x-access-token": auth?.user.token,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        if (response.data.user.telephone) {
          setPhoneNumber(response.data.user.telephone);
          setPhone(true);
        }
      });
  };

  useEffect(() => {
    InitialData();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="w-3/6 hidden lg:flex justify-center items-center">
        <img className="w-9/12 m-auto" src={BicycleShop} alt="Bike Shope" />
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-3 lg:w-3/6">
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <div className="w-full">
            <PriceSection
              t={t}
              tabs={tabs}
              setTabs={setTabs}
              panels={panels}
            />
            <ErrorDisplayer error={priceError} />
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="avaibilityType"
            className="block self-start mb-2 text-sm font-semibold text-gray-900"
          >
            {t("Avaibility")}
            <sup className="text-red-600">*</sup>
          </label>
          <p className="text-xs text-gray-900">
            {t("To customize your availability hours, click 'Custom'.")}
          </p>
          <AvailabilityDays
            t={t}
            isPerHour={true}
            time={time}
            setTime={setTime}
            setAvaibilityTypeError={setAvaibilityTypeError}
          />
          <ErrorDisplayer error={avaibilityTypeError} />
        </div>
        <div className="w-full">
          <label
            htmlFor="Phone number"
            className="block mb-2 text-sm font-semibold text-gray-900"
          >
            {t("Phone number")} <sup className="text-red-600">*</sup>
          </label>
          <input
            type="number"
            id="Phone number"
            className="border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block w-full p-2"
            value={phoneNumber}
            placeholder={t("Phone number")}
            disabled={phone}
            onChange={(e) => {
              setPhoneNumberError("");
              setPhoneNumber(e.currentTarget.value);
            }}
          />
          <ErrorDisplayer error={phoneNumberError} />
        </div>
      </div>
    </div>
  );
}

export default AvailabilityDetails;
