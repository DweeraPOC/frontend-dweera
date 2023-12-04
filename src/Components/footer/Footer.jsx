import React from "react";
import LanguageSwitcher from "../Languages/LanguageSwitcher";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="text-gray-300 p-2 flex justify-around flex-wrap items-center shadow-md border bg-white">
      <div className="px-6">
        <p className="text-black">
          &copy;
          {t("All Right Reserved 2023 ")}
          <NavLink to="/" className="text-lime-600 font-bold hover:no-underline hover:text-lime-600">
            Dweera
          </NavLink>
        </p>
        
      </div>
      <div className="px-6">
        <ul className="flex flex-wrap gap-4 items-center m-0">
          <li>
            <NavLink
              to="/terms-of-sales"
              className="hover:text-lime-600 text-black font-bold text-sm"
            >
              {t("Terms of Sales")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Privacy-Policy"
              className="hover:text-lime-600 text-black font-bold text-sm"
            >
              {t("Privacy Policy")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Contact-Us"
              className="hover:text-lime-600 text-black font-bold text-sm"
            >
              {t("Contact us")}
            </NavLink>
          </li>
          <li>
            <a href="tel:+212667664899" className="hover:text-lime-600 hover:no-underline no-underline text-black font-bold text-sm px-2 py-2 hover:bg-gray-100 hover:rounded-lg">
              +212667664899
            </a>
          </li>
          <li>
            <a className="hover:text-lime-600 text-black font-bold text-sm px-2 hover:bg-gray-100 hover:rounded-lg">
              <LanguageSwitcher display={"block"} position={"mb-2 -top-24"} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
