import "./list.css"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import React from "react";

export default function AdminUsersList (){
  return (
    <div className="list">
      <div className="listContainer">
        <Datatable/>
      </div>
    </div>
  )
}
