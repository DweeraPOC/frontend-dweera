import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import emptyState from "../../assets/images/emptyState.svg";

function EmptyState({ msg, path, goTo }) {

    const { t } = useTranslation();
    return (
    <div className="flex flex-col items-center justify-center mb-4">
      <img src={emptyState} alt="empty state" className="w-96" />
      <p className="text-center font-semibold pb-2 px-2 w-full sm:w-[26rem]">{t(msg)}</p>
      <NavLink
        to={path}
        className=" bg-lime-600 hover:bg-lime-500 hover:text-gray-200 hover:no-underline text-white font-bold py-2 px-4 rounded flex items-center"
      >
        {t(goTo)}
      </NavLink>
    </div>
  );
}

export default EmptyState;
