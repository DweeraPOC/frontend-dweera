import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function ResetPassword() {

  const { t } = useTranslation();
  let { id } = useParams();
  const nav = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  /*useEffect(()=> {
    if (getCookie("jwt-token"))
      nav("/")
  }, []);*/

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_MAIN_URL}/users/check-token`, {
        Token: id,
      })
      .then(() => setLoading(false))
      .catch(() => nav("/notfound"));
  }, []);

  function HandleSubmit() {
    let valid = true;
    setError(
      password === confirmPass || (valid = false)
        ? ""
        : t("The password confirmation does not match")
    );
    if (valid) {
      axios
      .post(`${process.env.REACT_APP_MAIN_URL}/users/rest-password`, {
        Token : id,
        NewPassword: password
      })
      .then(() => nav("/login"))
      .catch((err) => {
        console.log(err)
      });
    }
  }

  return (
    <div className="flex justify-center items-center h-screen ">
      {loading ? (
        <ClipLoader color="black" loading={loading} size={40} />
      ) : (
        <div className="block p-4 m-2 bg-white border-4 border-gray-200 rounded-lg shadow">
          <div className="mb-4">
            <h3 className="mb-5 text-center w-fit">{t("Reset Password")}</h3>
            <label
              htmlFor="password"
              className="block mb-1 text-xs font-semibold text-gray-900"
            >
              {t("Password")}
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block w-full p-2"
              placeholder="********"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <p className="text-red-600 text-xs">{error}</p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="repassword"
              className="block mb-1 text-xs font-semibold text-gray-900"
            >
              {t("Confirm Password")}
            </label>
            <input
              type="password"
              id="repassword"
              className="border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block w-full p-2"
              placeholder="********"
              onChange={(e) => setConfirmPass(e.currentTarget.value)}
            />
          </div>
          <button
            type="button"
            className="border bg-lime-200 border-gray-400 text-gray-900 rounded-lg focus:border-lime-600
                w-full p-2 font-semibold shadow-md hover:bg-lime-700 hover:shadow-lg focus:shadow-lg
                focus:outline-none hover:text-white active:bg-lime-700 active:shadow-lg transition duration-150 ease-in-out"
            onClick={HandleSubmit}
          >
            {t("Save")}
          </button>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
