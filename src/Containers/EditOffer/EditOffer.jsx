import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useState, useEffect } from "react";
import {
  errorHandlerOfVehicleDetails,
  errorHandlerOfAvaibilityDetails,
  validLocations,
} from "../../Components/DataValidation/dataValidation";
import CustomizedSteppers from "../../Components/CustomizedSteppers/CustomizedSteppers";
import VehicleDetails from "../../Components/VehicleDetails/VehicleDetails";
import LocationPicker from "../AddOffer/Childs/LocationPicker";
import AvailabilityDetails from "../../Components/AvailabilityDetails/AvailabilityDetails";
import { useAuth } from "../../Middlewares/AuthContext";
import Footer from "../../Components/footer/Footer";
import {
  addressAddHandler,
  addressRemoveHandler,
} from "../AddOffer/Childs/HelpersFunctions";
import axios from "axios";

function EditOffer() {
  const auth = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Data Setters and values
  const [title, setTitle] = useState(location.state?.title);
  const [description, setDescription] = useState(
    location.state?.offer_description
  );
  const [category, setCategory] = useState(
    location.state?.vehicles?.vehicle_type
  );
  const [vehicleSize, setVehicleSize] = useState(
    location.state?.vehicles?.vehicle_size
  );

  const [images, setImages] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [imgsUrl, setImgsUrl] = useState(
    location.state?.vehicles?.vehicle_images
  );

  const [pricePerHour, setPricePerHour] = useState(location.state?.price_perHour);
  const [pricePerDay, setPricePerDay] = useState(location.state?.price_perDay);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [time, setTime] = useState(location.state?.available_day_hours);
  const [tags, setTags] = useState(location.state?.vehicles?.tags);
  const [locations, setLocations] = useState(
    location.state?.vehicles?.location.map((loc) => {
      return {
        Address: loc.Address,
        Latitude: loc.Latitude,
        Longitude: loc.Longitude,
        id: Math.random().toString(16).slice(2),
      };
    })
  );

  const [imgsRemoved, setImgsRemoved] = useState({
    OfferId: location.state?.offer_id,
    RemoveImgs: [],
  });

  useEffect(() => {
    console.log("----------------------------");
    console.log(location.state);
    setTime(location.state?.available_day_hours?.days);
    console.log("----------------------------");
  }, []);

  // Errors setters and values
  const [locationsError, setLocationsError] = useState("");
  const [error, setError] = useState(null);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [vehicleSizeError, setVehicleSizeError] = useState("");
  const [pictureError, setPictureError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [avaibilityTypeError, setAvaibilityTypeError] = useState("");
  const [photos, setPhotos] = useState([]);

  const handleNext = () => {
    if (
      currentStep === 0 &&
      errorHandlerOfVehicleDetails(
        title,
        description,
        category,
        vehicleSize,
        images,
        [],
        setTitleError,
        setDescriptionError,
        setCategoryError,
        setVehicleSizeError,
        setPictureError,
        t
      )
    )
      setCurrentStep(currentStep < 2 ? currentStep + 1 : currentStep);
    else if (
      currentStep === 1 &&
      validLocations(locations, setLocationsError, t)
    )
      setCurrentStep(currentStep < 2 ? currentStep + 1 : currentStep);
    else if (
      currentStep === 2 &&
      errorHandlerOfAvaibilityDetails(
        pricePerHour,
        time,
        phoneNumber,
        setPriceError,
        setAvaibilityTypeError,
        setPhoneNumberError,
        t
      )
    ) {
      setLoading(true);
      sendDataToServer(
        "/offers/edit-offer",
        title,
        description,
        category,
        vehicleSize,
        tags,
        pricePerHour,
        pricePerDay,
        phoneNumber,
        imageList,
        time,
        locations,
        setLoading,
        setError,
        auth,
        navigate,
        location.state?.offer_id
      );
    }
  };

  const HandleTime = () => {
    var newTime = {};
    var days = {};
    days = time?.map((v) => {
      var obj = {};
      var day = v?.day?.toLowerCase();
      obj = {
        [day]: {
          start: v?.hours[0]?.start,
          end: v?.        hours[0]?.end,
        },
      };
      return obj;
    });

    newTime = {
      AvailableDayHours: days,
    };

    return newTime;
  };

  const makeFormdata = (data) => {
    let OfferfullData = {
      Title: data.title,
      AvailableDayHours: JSON.stringify(HandleTime()),
      OfferDescription: data.description,
      VehicleType: data.category,
      VehicleSize: data.vehicleSize,
      Tags: JSON.stringify(data.tags),
      Telephone: data.phoneNumber,
      Location: JSON.stringify(data.locations),
      VehicleImages: data.imageList,
      OfferId: data.OfferId,
    };
    return OfferfullData;
  };

  const sendDataToServer = async (
    endPointPath,
    title,
    description,
    category,
    vehicleSize,
    tags,
    pricePerHour,
    pricePerDay,
    phoneNumber,
    imageList,
    time,
    locations,
    setLoading,
    setError,
    auth,
    navigate,
    OfferId
  ) => {
    try {
      await axios({
        method: "POST",
        url: process.env.REACT_APP_MAIN_URL + endPointPath,
        data: makeFormdata({
          title,
          description,
          category,
          vehicleSize,
          tags,
          pricePerHour,
          pricePerDay,
          phoneNumber,
          imageList,
          time,
          locations,
          OfferId,
        }),
        timeout: 120000,
        headers: {
          "x-access-token": auth?.user.token,
        },
        maxContentLength: 100000000,
        maxBodyLength: 1000000000,
      })
        .then((res) => {
          setLoading(false);
          navigate("/manage-my-offers");
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
          alert("An error occurred. Please try again.");
        });
    } catch (error) {
      setLoading(false);
      setError(error);
      alert("An error occurred. Please try again.");
    }
  };


const [tabs, setTabs] = useState([
  {
    name: "Hour",
    selected: false,
    price: 0,
    key : "perHour"
  },
  {
    name: "Half Day",
    selected: false,
    key : "perHalfDay",
    price: 0
  },
  {
    name: "Day",
    selected: false,
    key : "perDay",
    price: 0
  },
  {
    name: "Week",
    selected: false,
    key : "perWeek",
    price: 0
  },
  {
    name: "Month",
    selected: false,
    key : "perMonth",
    price: 0
  }
]);

const [panels] = useState([
  {
    name: "Hour",
    content: () => {
      return (
        <>
          <input
            type="number"
            id="Price per hour"
            className="border w-full border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block p-2"
            value={tabs.find((v) => v?.name == "Hour")?.price}
            placeholder={t("Price per hour")}
            onChange={(e) => {
              if (!Number(e.currentTarget.value)) return;
              const NewTabs = [...tabs]
              const findIndex = NewTabs.findIndex((v) => v?.name == "Hour")
              var item = NewTabs[findIndex];
              item.price = e.currentTarget.value
              return setTabs([...NewTabs])
            }}
          />
        </>
      )
    }
  },
  {
    name: "Half Day",
    content: () => {
      return (
        <>
          <input
            type="number"
            id="Price Half Day"
            className="border w-full border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block p-2"
            value={tabs.find((v) => v?.name == "Half Day")?.price}
            placeholder={t("Price per Half Day")}
            onChange={(e) => {
              if (!Number(e.currentTarget.value)) return;
              const NewTabs = [...tabs]
              const findIndex = NewTabs.findIndex((v) => v?.name == "Half Day")
              var item = NewTabs[findIndex];
              item.price = e.currentTarget.value
              return setTabs([...NewTabs])
            }}
          />
        </>
      )
    }
  },
  {
    name: "Day",
    content: () => {
      return (
        <>
          <input
            type="number"
            id="Price Day"
            className="border w-full border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block p-2"
            value={tabs.find((v) => v?.name == "Day")?.price}
            placeholder={t("Price per Day")}
            onChange={(e) => {
              if (!Number(e.currentTarget.value)) return;
              const NewTabs = [...tabs]
              const findIndex = NewTabs.findIndex((v) => v?.name == "Day")
              var item = NewTabs[findIndex];
              item.price = e.currentTarget.value
              return setTabs([...NewTabs])
            }}
          />
        </>
      )
    }
  },
  {
    name: "Week",
    content: () => {
      return (
        <>
          <input
            type="number"
            id="Price Week"
            className="border w-full border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block p-2"
            value={tabs.find((v) => v?.name == "Week")?.price}
            placeholder={t("Price per Week")}
            onChange={(e) => {
              if (!Number(e.currentTarget.value)) return;
              const NewTabs = [...tabs]
              const findIndex = NewTabs.findIndex((v) => v?.name == "Week")
              var item = NewTabs[findIndex];
              item.price = e.currentTarget.value
              return setTabs([...NewTabs])
            }}
          />
        </>
      )
    }
  },
  {
    name: "Month",
    content: () => {
      return (
        <>
          <input
            type="number"
            id="Price Month"
            className="border w-full border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block p-2"
            value={tabs.find((v) => v?.name == "Month")?.price}
            placeholder={t("Price per Month")}
            onChange={(e) => {
              if (!Number(e.currentTarget.value)) return;
              const NewTabs = [...tabs]
              const findIndex = NewTabs.findIndex((v) => v?.name == "Month")
              var item = NewTabs[findIndex];
              item.price = e.currentTarget.value
              return setTabs([...NewTabs])
            }}
          />
        </>
      )
    }
  }
])




 
  return (
    <div className="flex flex-col justify-between items-between pb-8">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Dweera | Edit offer`}</title>
        <meta
          name="description"
          content={`Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing`}
        />
        <meta
          name="keywords"
          content="Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing"
        />
      </Helmet>
      <div className="p-2 md:px-24 mb-28 md:mb-10 lg:mb-10">
        <CustomizedSteppers
          _activeStep={currentStep}
          setActiveStep={setCurrentStep}
        />
        {currentStep !== 0 ? null : (
          <div className="my-6">
            <VehicleDetails
              titleError={titleError}
              descriptionError={descriptionError}
              categoryError={categoryError}
              vehicleSizeError={vehicleSizeError}
              pictureError={pictureError}
              setTitleError={setTitleError}
              setDescriptionError={setDescriptionError}
              setPictureError={setPictureError}
              title={title}
              description={description}
              category={category}
              vehicleSize={vehicleSize}
              images={images}
              tags={tags}
              imageList={imageList}
              setTitle={setTitle}
              setDescription={setDescription}
              setCategory={setCategory}
              setVehicleSize={setVehicleSize}
              setImages={setImages}
              setTags={setTags}
              setImageList={setImageList}
              imgsUrl={imgsUrl}
              setImgsUrl={setImgsUrl}
              imgsRemoved={imgsRemoved}
              setImgsRemoved={setImgsRemoved}
            />
          </div>
        )}
        {currentStep !== 1 ? null : (
          <div className="my-6">
            <LocationPicker
              locations={locations}
              setLocations={setLocations}
              HandleAdd={addressAddHandler}
              HandleRemove={addressRemoveHandler}
              locationsError={locationsError}
              setLocationsError={setLocationsError}
              t={t}
            />
          </div>
        )}
        {currentStep !== 2 ? null : (
        <div className="my-6">
          <AvailabilityDetails
            setPriceError={setPriceError}
            setAvaibilityTypeError={setAvaibilityTypeError}
            setPhoneNumberError={setPhoneNumberError}
            pricePerHour={pricePerHour}
            setPricePerHour={setPricePerHour}
            pricePerDay={pricePerDay}
            setPricePerDay={setPricePerDay}
            priceError={priceError}
            avaibilityTypeError={avaibilityTypeError}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            phoneNumberError={phoneNumberError}
            time={time}
            setTime={setTime}
            tabs={tabs}
            setTabs={setTabs}
            panels={panels}
          />
        </div>
      )}
        <div className="flex items-center justify-between my-3">
          <button
            onClick={() => {
              if (currentStep === 0) navigate("/manage-my-offers");
              if (loading) setLoading(false);
              setCurrentStep(currentStep ? currentStep - 1 : currentStep);
            }}
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            {!currentStep ? t("Cancle") : t("Back")}
          </button>
          <button
            onClick={handleNext}
            className="bg-lime-600 hover:bg-lime-500 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            {loading ? (
              <ClipLoader color="#FFFF" loading={true} size={20} />
            ) : currentStep === 2 ? (
              t("Save")
            ) : (
              t("Continue")
            )}
          </button>
        </div>
      </div>
      <div className="w-full fixed bottom-0 z-40">
        <Footer />
      </div>
    </div>
  );
}

export default EditOffer;
