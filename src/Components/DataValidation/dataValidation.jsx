export function is_numeric(str) {
  return /(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/.test(str);
}

export const validateEmail = (email) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
    );
};

export function checkInputFields(information, errorSetters, addCoupon, t) {
  let valid = true;

  errorSetters.setFirstNameErr(
    information.firstName || (valid = false)
      ? information.firstName.length > 3 || (valid = false)
        ? ""
        : t("First name must be at least 4 characters")
      : t("Please enter your first name")
  );
  errorSetters.setLastNameErr(
    information.lastName || (valid = false)
      ? information.lastName.length > 3 || (valid = false)
        ? ""
        : t("Last name must be at least 4 characters")
      : t("Please enter your last name")
  );
  errorSetters.setEmailErr(
    information.email || (valid = false)
      ? validateEmail(information.email) || (valid = false)
        ? ""
        : t("Invalid E-mail address")
      : t("Please enter your E-mail address")
  );

  errorSetters.setTelephoneErr(
    information.telephone || (valid = false)
      ? is_numeric(information.telephone) || (valid = false)
        ? ""
        : t("Please enter a correct phone number")
      : t("Please enter your telephone")
  );

  errorSetters.setPasswordErr(
    information.password || (valid = false)
      ? ""
      : t("Please enter your password")
  );
  errorSetters.setConfirmPasswordErr(
    information.rePassword || (valid = false)
      ? ""
      : t("Please enter your confirm password")
  );
  valid &&
    errorSetters.setPasswordErr(
      information.password === information.rePassword || (valid = false)
        ? ""
        : t("The password confirmation does not match")
    );

  errorSetters.setReferralCodeErr(
    addCoupon && (information.coupon || (valid = false))
      ? ""
      : t("Please enter your referral code")
  );
  errorSetters.setTermsErr(
    information.agreeTerms || (valid = false)
      ? ""
      : t("you must agree to the terms and conditions of Dweera")
  );

  return valid;
}

export function errorHandler(respondErrors, errorSetters) {
  respondErrors.map((err) => {
    err["Email"] && errorSetters.setEmailErr(err["Email"]);
    err["FirstName"] && errorSetters.setFirstNameErr(err["FirstName"]);
    err["LastName"] && errorSetters.setLastNameErr(err["LastName"]);
    err["Password"] && errorSetters.setPasswordErr(err["Password"]);
    err["Telephone"] && errorSetters.setTelephoneErr(err["Telephone"]);
    return err;
  });
}

export function errorHandlerOfVehicleDetails(
  title,
  description,
  category,
  vehicleSize,
  images,
  imgsUrl,
  setTitleError,
  setDescriptionError,
  setCategoryError,
  setVehicleSizeError,
  setPictureError,
  t
) {
  let valid = true;
  setTitleError(
    title || (valid = false)
      ? title.length >= 5 || (valid = false)
        ? title.length < 300 || (valid = false)
          ? ""
          : t("Maximum 300 characters")
        : t("Title must be at least 5 characters")
      : t("Please enter a title")
  );

  setDescriptionError(
    description || (valid = false)
      ? description.length >= 10 || (valid = false)
        ? description.length < 1500 || (valid = false)
          ? ""
          : t("Maximum 1500 characters")
        : t("Description must be at least 10 characters")
      : t("Please enter a description")
  );

  setCategoryError(
    category || (valid = false) ? "" : t("Please select a category")
  );

  setVehicleSizeError(
    vehicleSize || (valid = false) ? "" : t("Please select a size")
  );

  /*setPictureError(
    images.length + imgsUrl.length || (valid = false)
      ? ""
      : t("Please select a picture")
  );*/

  return valid;
}

function availableTime(time) {
  let valid = true;
  time.map((t) => {
    t.hours.map((h) => {
      if (
        h.start === null ||
        h.end === null ||
        (parseInt(h.start) !== 24 &&
          parseInt(h.end) !== 24 &&
          parseInt(h.start) >= parseInt(h.end))
      )
        valid = false;
      return h;
    });
    return t;
  });
  return valid;
}

export function errorHandlerOfAvaibilityDetails(
  pricePerHour,
  time,
  phoneNumber,
  setPriceError,
  setAvaibilityTypeError,
  setPhoneNumberError,
  t
) {
  let valid = true;

  /*setPriceError(
    (valid = false)
      ? ""
      : t("Please enter a price")
  );*/
  /*setAvaibilityTypeError(
    time.length || (valid = false)
      ? availableTime(time) || (valid = false)
        ? ""
        : t("Please select a valid time")
      : t("Please select an availability type")
  );*/
  setPhoneNumberError(
    is_numeric(phoneNumber) || (valid = false)
      ? ""
      : t("Please enter your phone number")
  );
  return valid;
}

export function validLocations(locations, setLocationsError, t) {
  let valid = true;
  locations.map((location) => {
    if (
      location.Address === null ||
      location.Latitude === null ||
      location.Longitude === null
    ) {
      setLocationsError(t("Please enter a valid address"));
      return (valid = false);
    }
    return location;
  });
  return valid;
}
