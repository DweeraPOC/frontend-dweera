import "./list.css"
import OfferDatatable from "../../components/datatable/OfferDatatable"
import React from "react";
import ModalOffer from "../../components/OfferDetails/ModalOffer";

export default function AdminOffersList (){
  return (
    <div className="list">
      <div className="listContainer">
        <OfferDatatable/>
        <ModalOffer />
      </div>
    </div>
  )
}
