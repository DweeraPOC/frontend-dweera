import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import ClipLoader from "react-spinners/ClipLoader";

import ErrorDisplayer from "../../Components/ErrorDisplayer/ErrorDisplayer";
import { SendMessage } from "../../Api/contact-Us";
import { validateEmail } from "../../Components/DataValidation/dataValidation";
import { PhoneIcon } from "@heroicons/react/24/solid";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Helmet } from "react-helmet";

export default function ContactUs() {
  const { t } = useTranslation();
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  const [errorInputName, setErrorInputName] = useState("");
  const [errorInputEmail, setErrorInputEmail] = useState("");
  const [errorInputMessage, setErrorInputMessage] = useState("");

  const [response, setResponse] = useState({ type: 0, message: "" });
  const [loading, setLoading] = useState(false);
  const sendMessage = async () => {
    setLoading(true);
    setResponse({ type: 0, message: "" });

    //---------------------------- validation messages data---------------------------------
    if (inputName.trim() === "") setErrorInputName(t("Please enter a name"));
    else setErrorInputName();
    if (inputEmail.trim() === "") setErrorInputEmail(t("Please enter a email"));
    else {
      if (!validateEmail(inputEmail.trim())) {
        setErrorInputEmail(t("please enter a valid email address"));
        setLoading(false);
        return;
      } else setErrorInputEmail();
    }
    if (inputMessage.trim() === "")
      setErrorInputMessage(t("Please enter a message"));
    else setErrorInputMessage();
    //----------------------------End validation messages data -----------------------------

    if (
      inputName.trim() !== "" &&
      inputEmail.trim() !== "" &&
      inputMessage.trim() !== ""
    ) {
      const data = {
        Name: inputName,
        Email: inputEmail,
        Message: inputMessage,
      };
      const responseData = await SendMessage(data);
      if (responseData.includes("Error"))
        setResponse({ type: -1, message: responseData });
      else {
        setResponse({ type: 1, message: responseData });
        setInputName("");
        setInputEmail("");
        setInputMessage("");
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Dweera | Contact us`}</title>
        <meta name="description" content={`Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing`} />
        <meta name="keywords" content="Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing" />
      </Helmet>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl title-font mb-4 text-gray-900 font-semibold">
            {t("Contact us")}
          </h1>
          <p className="lg:w-1/2 md:w-2/3 sm:w-1/1 mx-auto leading-relaxed text-base">
            {t("ContactMsg")}
          </p>
        </div>

        <div className="lg:w-1/2 md:w-2/3 sm:w-1/1 mx-auto">
          <div className="md:flex flex-wrap">
            <div className="p-2 md:w-1/2 sm:w-full ">
              <div className="relative">
                <label className="leading-7 text-sm text-gray-600">{t("Name")}</label>
                <input
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  type="text"
                  id="name"
                  className="border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block w-full p-2.5"
                  placeholder={t("Name")}
                />
              </div>
              <ErrorDisplayer error={errorInputName} />
            </div>

            <div className="p-2 md:w-1/2 sm:w-full">
              <div className="relative">
                <label className="leading-7 text-sm text-gray-600">{t("Email address")}</label>
                <input
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  type="text"
                  id="email"
                  className="border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block w-full p-2.5"
                  placeholder={t("Email address")}
                />
              </div>
              <ErrorDisplayer error={errorInputEmail} />
            </div>

            <div className="p-2 w-full">
              <div className="relative">
                <label className="leading-7 text-sm text-gray-600">
                  Message
                </label>
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  id="message"
                  rows="5"
                  className="border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-lime-600 focus:ring-1  focus:border-lime-600 block w-full p-2"
                  placeholder={t("Write your message here...")}
                ></textarea>
              </div>
              <ErrorDisplayer error={errorInputMessage} />
            </div>

            <div className="p-2 w-full">
              <button
                type="button"
                onClick={sendMessage}
                className="flex mx-auto bg-lime-600 hover:bg-lime-500 text-white border-0 py-3 px-12 focus:outline-none rounded text-lg"
              >
                {loading ? (
                  <ClipLoader color="#FFFF" loading={true} size={20} />
                ) : (
                  <span> {t("Send")} </span>
                )}
              </button>
            </div>

            {response && response.type == -1 && (
              <div className="flex w-full justify-center font-semibold mt-5 text-red-600">
                {response.message}
              </div>
            )}
            {response && response.type == 1 && (
              <div className="flex w-full justify-center font-semibold mt-5 text-green-600">
                {response.message}
              </div>
            )}

            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
              <p className="leading-normal mb-5">
                {t("followus")}
              </p>
              <span className="flex flex-row justify-center items-center">
                <a href="https://www.facebook.com/profile.php?id=100091925822397" target="_blank" className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>

                {/*<a className="ml-4 text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>*/}

                <a href="https://www.instagram.com/dweera.ma/" target="_blank" className="ml-4 text-gray-500">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  </svg>
                </a>
                <a target="_blank" href="tel:+212667664899" className="ml-4 text-gray-500">
                  <PhoneIcon className="w-5 h-5 block" />
                </a>

                <a href="https://www.linkedin.com/company/linarqa/" target="_blank" className="ml-4 text-gray-500">
                  <LinkedInIcon className="w-5 h-5 block" />
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
