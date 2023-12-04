import axios from "axios";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useNavigate } from 'react-router-dom'
import { validateEmail } from "../../Components/DataValidation/dataValidation";
import { useAuth } from "../../Middlewares/AuthContext";

function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successfully, setSuccessfully] = useState("");
  const navigate = useNavigate();

  async function HandleSubmit() {
    let valid = true;
    setError(
      email || (valid = false)
        ? validateEmail(email) || (valid = false)
          ? ""
          : t("Invalid E-mail address")
        : t("Please enter your E-mail address")
    );

    if (valid) {
      await axios
        .post(`${process.env.REACT_APP_MAIN_URL}/users/send-token`, {
          Email: email,
        })
        .then((res) => {
          //console.log(res)
          if(res.status===200) setSuccessfully(res.data.message)
        })
        .catch((err) => setError(err.response.data.message));
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="block p-6 m-2 bg-white border-4 border-gray-200 rounded-lg shadow ">
        <h3>{t("Find Your Account")}</h3>
        <p className="my-4">{t("ForgetPasswordMessage")}</p>
        {
          successfully ? <p className="p-5 border-2 border-lime-300 text-lime-400 font-semibold text-center bg-gray-50">{t(successfully)}</p>:
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 text-xs font-semibold text-gray-900"
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
            <p className="text-red-600 text-xs mb-4">{error}</p>
            <button
              type="button"
              className="border bg-lime-200 border-gray-400 text-gray-900 rounded-lg focus:border-lime-600
              w-full p-2 font-semibold shadow-md hover:bg-lime-700 hover:shadow-lg focus:shadow-lg
              focus:outline-none hover:text-white active:bg-lime-700 active:shadow-lg transition duration-150 ease-in-out"
              onClick={HandleSubmit}
              >
              {t("Search")}
            </button>
          </div>
        }
      </div>
    </div>
  );
}

export default ForgotPassword;
