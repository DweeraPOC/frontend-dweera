import React from "react";
import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../../Middlewares/AuthContext";

const Datatable = () => {  
  const [tableData, setTableData] = useState([]);
  const auth = useAuth();
  useEffect(() => {
    fetch(process.env.REACT_APP_MAIN_URL+"/users",{
      headers : {
        'x-access-token' : auth?.user.token
      }
    })
      .then((data) => data.json())
      .then((data) => setTableData(data.allusers))
  },[])

  const handleDelete = (id) => {
    setTableData(tableData.filter((item) => item.id !== id));
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        let id = params.row.Id;
        let link ="/UserPage/"+id
        return (
          <div className="cellAction">
            <Link to={link} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(id)}
            >
              Block
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        User List
      </div>
      <DataGrid
        className="datagrid"
        getRowId={(row)=>row.Id}
        rows={tableData}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;