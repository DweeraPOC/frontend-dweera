import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ErrorDisplayer from "../../Components/ErrorDisplayer/ErrorDisplayer";
import loginImg from "../../assets/images/Smart mobility-pana.svg";
import GoogleButton from "../../Components/GoogleButton/Googleloginbutton";
import { useAuth } from "../../Middlewares/AuthContext";
import VerificationOtp from "../../Components/VerificationOtp/VerificationOtp";
import { Helmet } from "react-helmet";
function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMail, setErrMail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  const [otp, setOtp] = useState({
    isOpen: false,
    value: null,
    err: null
  })
  const navigate = useNavigate();
  const auth = useAuth();

  const HandleSubmit = async () => {
    setErrMail("");
    setErrPassword("");
    if (!email || !password) {
      !email && setErrMail("This field should not be empty");
      !password && setErrPassword("This field should not be empty");
      return;
    }

    try {
      await axios
        .post(`${process.env.REACT_APP_MAIN_URL}/users/Login`, {
          Email: email,
          Password: password,
        })
        .then((response) => {
          if (response.status === 200) {
            auth.Login({
              token: response.data.token,
              role: "user",
            });
            navigate(-1, { replace: true });

          }
        })
        .catch((err) => {
          err.response.data.message.map((msg) => {
            msg["Email"] && setErrMail(msg["Email"]);
            msg["Password"] && setErrPassword(msg["Password"]);
            return msg;
          });
        });
    } catch (err) {
      alert("An issue current in our server side");
    }
  };

  return (
    <>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Dweera | Login</title>
          <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="flex justify-center">
        <div className="flex justify-center h-screen w-full items-center bg-neutral-100 flex-col px-10 lg:px-0 lg:w-3/6">
          <img className="h-auto w-32" src="/images/logo_image.png" alt="logo" />
          {
            otp?.isOpen
              ? <VerificationOtp />
              : (
                <>
                  <form className="w-full lg:w-3/6 mt-12 relative">
                    <p className="text-center font-semibold text-2xl">
                      {t("WELCOME BACK !")}
                    </p>
                    <p className="text-center text-sm">{t("EnterDetails")}</p>
                    <div className="w-full my-4">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-xs font-semibold text-gray-900"
                      >
                        {t("Email address")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block w-full p-2"
                        placeholder="john.doe@gmail.com"
                        required
                        onChange={(e) => setEmail(e.currentTarget.value)}
                      />
                      <ErrorDisplayer error={errMail} />
                    </div>
                    <div className="w-full mt-4">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-xs font-semibold text-gray-900"
                      >
                        {t("Password")}
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block w-full p-2"
                        placeholder="•••••••••"
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        required
                      />
                      <ErrorDisplayer error={errPassword} />
                    </div>
                    <div className="flex justify-end mt-3">
                      <NavLink
                        to="/forgotPasword"
                        className="text-gray-800 hover:text-lime-600 "
                      >
                        {t("Forgot password")}
                      </NavLink>
                    </div>
                    <div className="text-center lg:text-left mt-4">
                      <button
                        type="button"
                        className="border bg-lime-200 border-gray-400 text-gray-900 rounded-lg focus:border-lime-600
              w-full p-2 font-semibold shadow-md hover:bg-lime-700 hover:shadow-lg focus:shadow-lg
              focus:outline-none hover:text-white active:bg-lime-700 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={HandleSubmit}
                      >
                        {t("LOGIN")}
                      </button>
                      <p className="text-sm font-semibold mt-3 pt-1 mb-0">
                        {t("Don't have an account?")}
                        <NavLink
                          to={"/signup"}
                          className="text-lime-600 hover:text-lime-700 focus:text-lime-700 transition duration-200 ease-in-out ml-1"
                        >
                          {t("Sign up")}
                        </NavLink>
                      </p>
                    </div>

                    <div
                      className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 
            after:border-t after:border-gray-300 after:mt-0.5"
                    >
                      <p className="text-center font-semibold mx-4 mb-0">{t("Or")}</p>
                    </div>
                    <GoogleButton type={'Sign in'} />
                    <p className="text-sm text-center px-4 font-semibold mt-3 pt-1 mb-0 text-gray-500">
                      By continuing, you agree to Dweera’s Terms of Use and Privacy Policy.
                      <NavLink
                        to={"/Privacy-Policy"}
                        className="text-lime-600 hover:text-lime-700 focus:text-lime-700 transition duration-200 ease-in-out ml-1"
                      >
                        Terms and Conditions
                      </NavLink>
                    </p>
                  </form>
                </>
              )
          }

        </div>
        <div className="w-3/6 hidden h-screen lg:flex justify-center items-center">
          <img className="w-9/12 m-auto " src={loginImg} alt="Login" />
        </div>
      </div>
    </>
  );
}

export default Login;
