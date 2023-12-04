import { is_numeric } from "./dataValidation";
export default function perDayValidator(
  phoneNumber,
  setPhoneNumberError,
  t
) {
  let valid = true;

  setPhoneNumberError(
    phoneNumber || (valid = false)
      ? is_numeric(phoneNumber) || (valid = false)
        ? ""
        : t("Please enter a correct phone number")
      : t("Please enter your telephone")
  );

  return valid;
}
