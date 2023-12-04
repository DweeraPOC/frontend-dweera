import React from "react";
import Apigetallusers from '../Api/getallusers'

export const userColumns = [
  { field: "Id", headerName: "ID", width: 70 },
  { field: "User", headerName: "User", width: 140 ,
  renderCell: (params) => {
    return (
      <div className="cellWithImg">
        <img className="cellImg" 
        src={(process.env.REACT_APP_MAIN_URL+"/images/users").concat(params.row.Profilephoto ? params.row.Profilephoto : "userdefault.png" )} alt="avatar" />
          username
          </div>
    );
  }
},
  {
    field: "Email",
    headerName: "Email",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.Email}
        </div>
      );
    },
  },


];

export const userRows = Apigetallusers;

export const OfferColumns = [
  { field: "offer_id", headerName: "ID", width: 150 },
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "type_booking",
    headerName: "Price Type",
    width: 100,
  },
  {
    field: "offer_description",
    headerName: "Offer Description",
    width: 300,
  },
  {
    field: "offer_status",
    headerName: "Offer Status",
    width: 100,
  },
];
