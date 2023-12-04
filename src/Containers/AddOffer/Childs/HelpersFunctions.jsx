import axios from "axios";

export function makeFormdata(data) {
  let OfferfullData = {};
  OfferfullData = {
    ...OfferfullData,
    "Title": data.title,
    "AvailableDayHours": JSON.stringify(data.time),
    "OfferDescription": data.description,
    "VehicleType": data.category,
    "VehicleSize": data.vehicleSize,
    "Tags": JSON.stringify(data.tags),
    "Telephone": data.phoneNumber,
    "Location": JSON.stringify(data.Newlocations),
    "VehicleImages": data?.imageList
  }
  return OfferfullData;
}


export const addressAddHandler = (
  locations,
  setLocations,
  setLocationsError,
  t
) => {
  if (
    locations.length < 5 &&
    locations[locations.length - 1].Latitude &&
    locations[locations.length - 1].Longitude &&
    locations[locations.length - 1].Address
  )
    return setLocations([
      ...locations,
      {
        ...{ Address: null, Latitude: null, Longitude: null },
        id: Math.random().toString(16).slice(2),
      },
    ]);
  return setLocationsError(
    locations.length < 5
      ? t("You must select a location before adding a new one")
      : t("You must be select just five locations.")
  );
};

export const addressRemoveHandler = (id, locations, setLocations) => {
  let newLocations = [...locations];
  newLocations = newLocations.filter((l) => l.id !== id);
  return setLocations([...newLocations]);
};

export const sendDataToServer = async (
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
    const Newlocations = locations.map((item) => {
      delete item["id"];
      return item;
    });
    await axios({
        method : "POST",
        url : process.env.REACT_APP_MAIN_URL + endPointPath,
        data : makeFormdata({
          title,
          description,
          category,
          vehicleSize,
          tags,
          pricePerHour,
          pricePerDay,
          phoneNumber,
          Newlocations,
          imageList,
          time,
          OfferId,
        }),
        timeout : 120000,
        headers : {
          "x-access-token": auth?.user.token,
        },
        maxContentLength: 100000000,
        maxBodyLength: 1000000000
      })
      .then((res) => {
        setLoading(false);
        navigate("/manage-my-offers");
      })
      .catch((err) => {
        setLoading(false);
        alert("An error occured please try again", err);
        setError(err)
      });
  } catch (error) {
    setLoading(false);
    alert("An error occured please try again", error);
    setError(error)
  }
};

export const sendRemovedImgs = async (imgsRemoved, imageList, auth) => {
  let OfferfullData = new FormData();
  OfferfullData.append("OfferId", imgsRemoved.OfferId);
  if (imgsRemoved.RemoveImgs.length > 0)
    OfferfullData.append("RemoveImgs", JSON.stringify(imgsRemoved.RemoveImgs));
  if (imageList.length > 0)
    for (const image of imageList) {
      OfferfullData.append("VehicleImages", image);
    }

  try {
    await axios.post(
      process.env.REACT_APP_MAIN_URL + "/offers/edit-images-offer",
      OfferfullData,
      {
        headers: {
          "x-access-token": auth?.user.token,
        },
      }
    );
  } catch (error) {
    alert("An error occured please try again", error);
  }
};


export const EditeOfferData = async (
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
  OfferId,
) => {
  try {
    const data = {
      Title: title,
      AvailableDayHours: time.map((v) => {
        const day = v?.day?.toLowerCase() || "";
        const hours = v?.hours && v.hours.length > 0 ? v.hours[0] : { start: "", end: "" };
        return {
          day,
          hours: [{ start: hours.start || "", end: hours.end || "" }],
        };
      }),
      OfferDescription: description,
      VehicleType: category,
      VehicleSize: vehicleSize,
      Tags: tags,
      Telephone: phoneNumber,
      pricePerHour: parseFloat(pricePerHour),
      pricePerDay: parseFloat(pricePerDay),
      Location: locations.map((loc) => ({
        Address: loc.Address,
        Latitude: loc.Latitude,
        Longitude: loc.Longitude,
      })),
      VehicleImages: imageList,
      OfferId: OfferId,
    };

    await axios({
      method: "POST",
      url: process.env.REACT_APP_MAIN_URL + endPointPath,
      data,
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
        console.error("An error occurred. Please try again.", err);
        setError("An error occurred. Please try again.");
      });
  } catch (error) {
    setLoading(false);
    console.error("An error occurred. Please try again.", error);
    setError("An error occurred. Please try again.");
  }
};