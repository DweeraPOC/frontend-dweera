import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { Bars4Icon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import ProfileTab from "./ProfileTab";
import { useEffect } from "react";
import { useAuth } from "../../Middlewares/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../Components/Languages/LanguageSwitcher";

export default function Navbar() {
  const { t } = useTranslation();

  const MenuItems = [
    {
      name: t("Home"),
      path: "/",
    },
    {
      name: t("AddOffer"),
      path: "/add-new-offer",
    },
    {
      name: t("MyOffers"),
      path: "/manage-my-offers",
    },
    {
      name: t("MyBookings"),
      path: "/manage-my-bookings",
    },
    {
      name: t("BookingRequests"),
      path: "/booking-requests",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    setLoggedIn(auth?.user.token ? true : false);
  }, [loggedIn]);
  return (
    <nav className="bg-white border-b border-gray-200 top-0 z-30 py-4">
      <div className="flex items-center justify-between px-8 mx-auto container">
        <NavLink to="/">
          <img
            className="h-auto w-32"
            src="/images/logo_image.png"
            alt="logo"
          />
        </NavLink>

        <div className="flex flex-row justify-center items-center gap-4">
          <div className="hidden lg:block">
            <ul className="flex justify-center items-center gap-2 mb-0">
              {loggedIn ? (
                MenuItems &&
                MenuItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? `text-lime-600 px-3 border-b  font-medium border-lime-600
                          hover:no-underline focus:no-underline hover:text-lime-600 active:text-lime-600 focus:text-lime-600`
                        : "text-gray-600 px-3 font-medium hover:no-underline hover:text-gray-800 "
                    }
                  >
                    <li key={item.name}>{item.name}</li>
                  </NavLink>
                ))
              ) : null}
            </ul>
          </div>
          <div className="-mr-2 z-50 flex items-center gap-3">
            <div className="block p-2 hover:bg-gray-100 hover:rounded-lg ">
              <LanguageSwitcher display={"hidden"} position={"mt-2 right-0"}/>
            </div>
            <ProfileTab />
          </div>
          {
            (loggedIn) && (
              <div className="-mr-2 flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-lime-600"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              {!isOpen ? (
                <Bars4Icon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
            )
          }
        </div>
      </div>
      <Transition
        show={isOpen}
        className="mt-2"
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div ref={ref} className="lg:hidden" id="mobile-menu">
            <ul className="flex justify-center flex-col gap-2 px-7 py-4 bg-gray-100">
              {loggedIn ? (
                MenuItems &&
                MenuItems.map((item) => (
                  <NavLink
                    key={item.name}
                    className={({ isActive }) =>
                      isActive
                        ? `text-lime-600 px-3 border-b font-medium border-lime-600
                          hover:no-underline focus:no-underline hover:text-lime-600 active:text-lime-600 focus:text-lime-600`
                        : "text-gray-600 px-3 font-medium hover:no-underline hover:text-gray-800 "
                    }
                    to={item.path}
                  >
                    <li key={item.name}>{item.name}</li>
                  </NavLink>
                ))
              ) : null}
            </ul>
          </div>
        )}
      </Transition>
    </nav>
  );
}
