import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import Signup from "../../assets/images/Sign up-bro.svg";
import LanguageSwitcher from "../../Components/Languages/LanguageSwitcher";

export default function Soon() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const EmailChecker = () => {
    const regexExpr = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regexExpr.test(email);
  };

  const HandleChange = (e) => {
    setEmail(e.currentTarget.value);
  };

  const HandleSending = async () => {
    switch (EmailChecker(email)) {
      case true:
        setSending(true);
        await axios
          .post(`${process.env.REACT_APP_MAIN_URL}/marketing/insert-email`, {
            Email: email.trim(),
          })
          .then((response) => {
            if (!response.data === "email inserted") return;
            setError("");
            setEmail("");
            setTimeout(() => {
              setSending(false);
            }, 20000);
          });
        break;
      case false:
        setError(t("error"));
        break;
    }
  };

  return (
    <div className="flex">
      <div className="flex justify-start h-screen w-full bg-neutral-100 flex-col px-4 md:px-8 md:w-3/6 pt-8">
        <div className="flex items-center justify-between ">
          <img
            className="h-auto w-32"
            src="/images/logo_image.png"
            alt="logo"
          />
          <LanguageSwitcher />
        </div>
        <div className="flex flex-col gap-2 justify-center font-semibold p-2 md:p-0 mt-10 md:mt-[5rem] text-sm lg:text-base">
          <h2 className="text-normal text-lime-500">{t("Welcome")}</h2>
          <h5>{t("line1")}</h5>
          <p>{t("line2")}</p>
          <p>{t("line3")}</p>
          <p>{t("line4")}</p>
          <p>{t("line5")}</p>
          <div className="flex flex-col mt-3 md:flex-row gap-2 items-start">
            {!sending ? (
              <>
                <div className="w-full md:w-3/4 mt-[2px]">
                  <input
                    id="email"
                    type="email"
                    placeholder={t("emailmsg")}
                    className="w-full rounded-md border-gray-400 border-0 bg-gray-200 px-4 py-3 
                              text-gray-900 placeholder-gray-500 focus:outline-none
                              focus:ring-2 focus:ring-[#65D01E]"
                    value={email}
                    autoComplete="off"
                    onChange={(e) => HandleChange(e)}
                  />
                  <span className="text-xs text-red-600 text-start mt-2">
                    {error}
                  </span>
                </div>
                <div className="w-full md:w-2/4">
                  <button
                    type="button"
                    className="w-full rounded-md bg-[#65D01E] px-4 py-3 font-medium text-white text-base shadow hover:bg-[#5BBF18] focus:outline-none"
                    onClick={HandleSending}
                  >
                    {t("submit")}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-center  items-center py-3 w-full rounded-md bg-lime-600 text-white text-base font-semibold">
                {t("thanks")}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-3/6 hidden h-screen md:flex justify-center items-center">
        <img className="w-9/12 m-auto " src={Signup} alt="Login image" />
      </div>
    </div>
  );
}
