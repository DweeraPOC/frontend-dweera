import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import i18next from "i18next";

import FR from "../../assets/icons/icons8-france-48.png";
import USA from "../../assets/icons/icons8-usa-48.png";

function LanguageSwitcher({ display, position }) {
  const style =
    "absolute z-10 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none " +
    position;
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex gap-1 w-full justify-center items-center py-1 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <img
            src="/icons/languages.png"
            alt="global icon"
            className="h-6 w-6"
          />
          <span className={display}>
            {i18next.language === "fr" ? "Français" : "English(US)"}
          </span>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={style}>
          <div className="py-1">
            <Menu.Item>
              <a
                className="flex items-center gap-2 px-4 text-gray-600 py-2 text-sm cursor-pointer"
                onClick={() => {
                  i18next.changeLanguage("en");
                }}
              >
                <img src={USA} alt="USA" className="h-6 w-6" />
                English
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                className="flex items-center gap-2 px-4 py-2 text-gray-600 text-sm cursor-pointer"
                onClick={() => {
                  i18next.changeLanguage("fr");
                }}
              >
                <img src={FR} alt="FR" className="h-6 w-6" />
                French
              </a>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default LanguageSwitcher;
