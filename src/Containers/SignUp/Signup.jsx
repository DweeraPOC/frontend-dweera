import { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TermsConditions from "./TermsConditions";
import singup from "../../assets/images/Sign up-bro.svg";
import { useAuth } from "../../Middlewares/AuthContext";
import {
  checkInputFields,
  errorHandler,
} from "../../Components/DataValidation/dataValidation";
import ErrorDisplayer from "../../Components/ErrorDisplayer/ErrorDisplayer";
import GoogleButton from "../../Components/GoogleButton/Googleloginbutton";
import VerificationOtp from "../../Components/VerificationOtp/VerificationOtp";
import { Helmet } from "react-helmet";

function Signup() {
  // add attribute for showing err at user
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [telephoneErr, setTelephoneErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
  const [referralCodeErr, setReferralCodeErr] = useState("");
  const [termsErr, setTermsErr] = useState("");

  let data = {};
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [addCoupon, setAddCoupon] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [information, setInformation] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    password: "",
    rePassword: "",
    coupon: "",
    agreeTerms: false,
  });

  const [otp, setOtp] = useState({
    isOpen: false,
    value: null
  })

  const HandleSignUp = () => {
    if (
      checkInputFields(
        information,
        {
          setFirstNameErr,
          setLastNameErr,
          setEmailErr,
          setTelephoneErr,
          setPasswordErr,
          setConfirmPasswordErr,
          setReferralCodeErr,
          setTermsErr,
        },
        addCoupon,
        t
      )
    ) {
      try {
        data = {
          FirstName: information.firstName,
          LastName: information.lastName,
          Email: information.email,
          Telephone: information.telephone,
          Password: information.password,
        };
        if (addCoupon) data["Referral"] = information.coupon;

        axios
          .post(`${process.env.REACT_APP_MAIN_URL}/users/Register`, data)
          .then((response) => {
            if (response.status === 201) {
              auth.Login({
                token: response.data.token,
                role: "user",
              });
              navigate(-1, { replace: true });
            }
          })
          .catch((err) => {
            errorHandler(err.response.data.message, {
              setFirstNameErr,
              setLastNameErr,
              setEmailErr,
              setTelephoneErr,
              setPasswordErr,
              setConfirmPasswordErr,
              setReferralCodeErr,
              setTermsErr,
            });
          });
      } catch (error) {
        alert(error);
      }
    }
  };
  const HandleModal = () => {
    setShowTerms(!showTerms);
  };
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Dweera | Signup</title>
        <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <div className="flex justify-center">
      <TermsConditions HandleModal={HandleModal} status={showTerms} />
      <div className="w-3/6 hidden h-screen lg:flex justify-center items-center">
        <img className="w-9/12 m-auto " src={singup} alt="Login" />
      </div>

      <div className="flex  justify-center h-screen w-full items-center bg-neutral-100 flex-col px-10 lg:px-0 lg:w-3/6  ">
                <form className="w-full lg:w-3/6 mt-12">
                  <p className="text-center font-semibold text-2xl mb-1">
                    {t("Create an account")}
                  </p>
                  <GoogleButton type={'Sign up'} />
                  <p className="text-sm text-center  font-semibold mt-3 pt-1 mb-0 text-gray-500">
                      By continuing, you agree to Dweera’s Terms of Use and Privacy Policy.
                      <NavLink
                        to={"/Privacy-Policy"}
                        className="text-lime-600 hover:text-lime-700 focus:text-lime-700 transition duration-200 ease-in-out ml-1"
                      >
                        Terms and Conditions
                      </NavLink>
                    </p>
                  
                  <div
                    className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 
            after:border-t after:border-gray-300 after:mt-0.5"
                  >
                    <p className="text-center font-semibold mx-4 mb-0">{t("Or")}</p>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="mb-4 w-full sm:w-1/2 pr-0 sm:pr-1">
                      <label
                        htmlFor="first-name"
                        className="block mb-2 text-xs font-semibold text-gray-900"
                      >
                        {t("First name")} <sup className="text-red-600">*</sup>
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        className="border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block w-full p-2"
                        placeholder={t("First name")}
                        required
                        onChange={(e) => {
                          setInformation({
                            ...information,
                            firstName: e.currentTarget.value,
                          });
                        }}
                        value={information.firstName}
                      />
                      <ErrorDisplayer error={firstNameErr} />
                    </div>
                    <div className="mb-4 w-full sm:w-1/2 pl-0 sm:pl-1">
                      <label
                        htmlFor="Last-name"
                        className="block mb-2 text-xs font-semibold text-gray-900"
                      >
                        {t("Last name")} <sup className="text-red-600">*</sup>
                      </label>
                      <input
                        type="text"
                        id="Last-name"
                        className=" border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block w-full p-2"
                        placeholder={t("Last name")}
                        required
                        onChange={(e) => {
                          setInformation({
                            ...information,
                            lastName: e.currentTarget.value,
                          });
                        }}
                        value={information.lastName}
                      />
                      <ErrorDisplayer error={lastNameErr} />
                    </div>
                  </div>
                  <div className="w-full mb-4">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-xs font-semibold text-gray-900"
                    >
                      {t("Email address")} <sup className="text-red-600">*</sup>
                    </label>
                    <input
                      type="email"
                      id="email"
                      className=" border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block w-full p-2"
                      placeholder="john.doe@gmail.com"
                      required
                      onChange={(e) => {
                        setInformation({
                          ...information,
                          email: e.currentTarget.value,
                        });
                      }}
                      value={information.email}
                    />
                    <ErrorDisplayer error={emailErr} />
                  </div>
                  <div className="w-full mb-4">
                    <label
                      htmlFor="tel"
                      className="block mb-2 text-xs font-semibold text-gray-900"
                    >
                      {t("Telephone")} <sup className="text-red-600">*</sup>
                    </label>
                    <input
                      type="text"
                      id="tel"
                      className=" border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block w-full p-2"
                      placeholder="06 00000000"
                      onChange={(e) => {
                        setInformation({
                          ...information,
                          telephone: e.currentTarget.value,
                        });
                      }}
                      value={information.telephone}
                    />
                    <ErrorDisplayer error={telephoneErr} />
                  </div>
                  <div className="w-full mb-4">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-xs font-semibold text-gray-900"
                    >
                      {t("Password")} <sup className="text-red-600">*</sup>
                    </label>
                    <input
                      type="password"
                      id="password"
                      className=" border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block w-full p-2"
                      placeholder="•••••••••"
                      required
                      onChange={(e) => {
                        setInformation({
                          ...information,
                          password: e.currentTarget.value,
                        });
                      }}
                      value={information.password}
                    />
                    <ErrorDisplayer error={passwordErr} />
                  </div>
                  <div className="w-full mb-4">
                    <label
                      htmlFor="Confirmation"
                      className="block mb-2 text-xs font-semibold text-gray-900"
                    >
                      {t("Confirm password")} <sup className="text-red-600">*</sup>
                    </label>
                    <input
                      type="password"
                      id="Confirmation"
                      className="border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block w-full p-2"
                      placeholder="•••••••••"
                      required
                      onChange={(e) => {
                        setInformation({
                          ...information,
                          rePassword: e.currentTarget.value,
                        });
                      }}
                      value={information.rePassword}
                    />
                    <ErrorDisplayer error={confirmPasswordErr} />
                  </div>
                  <div className="flex flex-col justify-center mb-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setAddCoupon(!addCoupon);
                      }}
                      type="button"
                      className="flex gap-2 items-center border mb-2 bg-gray-200 border-gray-200 text-gray-900 rounded-lg focus:border-lime-400
              w-fit px-4 py-2 font-semibold shadow-md hover:bg-lime-400 hover:shadow-lg focus:shadow-lg
              focus:outline-none active:bg-lime-400 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      <img
                        className="h-5 w-5"
                        src={
                          addCoupon ? "/icons/minus-solid.svg" : "/icons/plus-solid.svg"
                        }
                        alt="plus and minus icons"
                      />
                      <span>{t("Referral Code")}</span>
                    </button>
                    {addCoupon && (
                      <div>
                        <input
                          type="text"
                          className="ml-4 w-90 border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1 focus:border-lime-600 block p-2"
                          placeholder={t("add a reference")}
                          onChange={(e) =>
                            setInformation({
                              ...information,
                              coupon: e.currentTarget.value,
                            })
                          }
                          value={information.coupon}
                        />
                        <ErrorDisplayer error={referralCodeErr} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col mb-4">
                    <div className="flex items-start ">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          aria-describedby="terms"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 bg-gray-50 
                    focus:ring-3 focus:ring-primary-300 accent-lime-400  text-white rounded-md"
                          onChange={(e) => {
                            setInformation({
                              ...information,
                              agreeTerms: e.currentTarget.checked,
                            });
                          }}
                          value={information.agreeTerms}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500">
                          {t("BySignup")}
                          <button
                            onClick={HandleModal}
                            type="button"
                            className="font-medium text-lime-600 hover:underline"
                          >
                            {t("Terms and Conditions")}.
                          </button>
                        </label>
                      </div>
                    </div>
                    <ErrorDisplayer error={termsErr} />
                  </div>
                  <div className="mb-4">
                    <button
                      type="button"
                      className="border text-center bg-lime-200 border-gray-400 text-gray-900 rounded-lg focus:border-lime-600
              w-full p-2 font-semibold shadow-md hover:bg-lime-600 hover:shadow-lg focus:shadow-lg
              focus:outline-none active:bg-lime-600 active:shadow-lg transition duration-150 ease-in-out"
                      onClick={HandleSignUp}
                    >
                      {t("Create Account")}
                    </button>
                  </div>
                  <p className="text-center text-sm mt-3 pt-1 mb-0">
                    {t("Already have an account")}?
                    <NavLink
                      to={"/login"}
                      className="text-lime-600 hover:text-lime-700 focus:text-lime-700 transition duration-200 ease-in-out ml-1"
                    >
                      {t("Login")}
                    </NavLink>
                  </p>
                </form>
      </div>
    </div>
    </>
  );
}

export default Signup;
