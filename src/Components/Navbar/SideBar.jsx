import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { TOGGLE_FILTER_MODAL } from "../../Redux/Actions/actions";
import ToggleMapping from "./ToggleMapping";

export default function SideBar() {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const Query = useSelector((state) => state.OffersReducer.query);

  function ToggleModal() {
    dispatch(TOGGLE_FILTER_MODAL());
  }
  return (
        <div className="p-4">
            <ToggleMapping />
        </div>
  );
}
