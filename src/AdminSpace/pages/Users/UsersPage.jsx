import { EyeIcon, NoSymbolIcon } from "@heroicons/react/24/solid";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React from "react";
import { useCallback } from "react";
import { useAuth } from "../../../Middlewares/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import UserDetails from "../../UserDetails/UserDetails";
import { useUser } from "../../context/UserContext";
import { LockOpenIcon } from "@heroicons/react/24/solid";
import default_picture from "../../../assets/images/default_profile_picture.png"
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function UsersPage() {

  const [users, setUser] = useState([]);
  const auth = useAuth();
  const user = useUser();
  const [exportData, setExportData] = useState([]);

  const handleExportToExcel = () => {
    const fileName = "users";
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
  };
  const GetUsers = useCallback(async () => {
    try {
      await axios({
        method: "GET",
        url: `${process.env.REACT_APP_MAIN_URL}/admin/get-users/`,
        headers: {
          "x-access-token": auth?.user.token,
        },
      }).then((response) => {
        setUser(response.data.users);
        setExportData(response.data.users);
      });
    } catch (err) {
      //console.log(err);
    }
  }, []);
  const Select = (id) => {
    const selected = users?.find((user) => user.user_id === id);
    user?.SelectUser(selected);
  };
  const FormatDate = (date) => {
    const checkZero = (data) => {
      if (data.length === 1) {
        data = "0" + data;
      }

      return data;
    };

    //var today = FormatDate(new Date());
    var currentDate = new Date(date);
    var day = currentDate?.getDate() + "";
    var month = currentDate?.getMonth() + 1 + "";
    var year = currentDate?.getFullYear() + "";
    var hour = currentDate?.getHours() + "";
    var minutes = currentDate?.getMinutes() + "";
    //var seconds = currentDate?.getSeconds() + "";

    day = checkZero(day);
    month = checkZero(month);
    year = checkZero(year);
    hour = checkZero(hour);
    minutes = checkZero(minutes);
    //seconds = checkZero(seconds);

    return day + "/" + month + "/" + year + " " + hour + ":" + minutes;
  };
  const HandleBlock = async (id) => {
    try {
      await axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_MAIN_URL}/admin/block-user/`,
        data: {
          User_id: id,
        },
        headers: {
          "x-access-token": auth?.user.token,
        },
      }).then(() => {
        GetUsers();
      });
    } catch (err) {
      //console.log(err);
    }
  };

  const HandleUnblock = async (id) => {
    try {
      await axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_MAIN_URL}/admin/unblock-user/`,
        data: {
          User_id: id,
        },
        headers: {
          "x-access-token": auth?.user.token,
        },
      }).then((response) => {
        GetUsers();
      });
    } catch (err) {
      //console.log(err);
    }
  };

  const columns = [
    {
      field: "Id",
      headerName: "ID",
      width: 170,
      renderCell: (params) => params.row.user_id || "null",
    },
    {
      field: "Profilephoto",
      headerName: "",
      width: 100,
      renderCell: (params) => (
        <div className="flex justify-center items-center w-8 h-8 rounded-full overflow-hidden">
          <img
            src={
              params.row.profile_photo 
              ? `${process.env.REACT_APP_MAIN_URL}/images/users/${params.row.profile_photo}`
              : default_picture
            }
            className="object-center object-cover"
          />
        </div>
      ),
    },
    {
      field: "permission level",
      headerName: "permission level",
      width: 150,
      renderCell: (params) => params.row.permission_level || "user",
    },
    {
      field: "FirstName",
      headerName: "First Name",
      width: 150,
      renderCell: (params) => params.row.first_name || "null",
    },
    {
      field: "LastName",
      headerName: "Last Name",
      width: 150,
      renderCell: (params) => params.row.last_name || "null",
    },
    {
      field: "Gender",
      headerName: "Gender",
      width: 100,
      renderCell: (params) => params.row.gender || "null",
    },
    {
      field: "Rating",
      headerName: "Rating",
      width: 100,
      renderCell: (params) => params.row.Rating || "null",
    },
    {
      field: "Telephone",
      headerName: "Telephone",
      width: 150,
      renderCell: (params) => (
        <a href={`tel:${params.row.Telephone}`}>
          {params.row.telephone || "null"}
        </a>
      ),
    },
    {
      field: "Address",
      headerName: "Address",
      width: 250,
      renderCell: (params) => params.row.address || "null",
    },
    {
      field: "Referral",
      headerName: "Referral",
      width: 150,
      renderCell: (params) => params.row.referral || "null",
    },
    {
      field: "JoiningDate",
      headerName: "Date Join",
      width: 150,
      renderCell: (params) => FormatDate(params.row.joining_date) || "null",
    },
    {
      field: "status",
      headerName: "Status",
      width: 70,
      renderCell: (params) => params.row.status,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="flex justify-center items-center gap-2">
          <button onClick={() => Select(params.row.user_id)}>
            <EyeIcon className="block w-6 h-6" aria-hidden="true" />
          </button>
          <button
            onClick={() =>
              params.row.status === "active"
                ? HandleBlock(params.row.user_id)
                : HandleUnblock(params.row.user_id)
            }
          >
            {params.row.permission_level === "super_admin" ? null : params.row
                .status === "active" ? (
              <NoSymbolIcon
                className="block w-6 h-6 text-red-600"
                aria-hidden="true"
              />
            ) : (
              <LockOpenIcon
                className="block w-6 h-6 text-lime-600"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    GetUsers();
  }, [GetUsers]);
  return (
    <>
      {<UserDetails />}
      <div className="w-full h-screen px-4 py-4">
        <div className="flex justify-between mb-4">
          <button
            type="button"
            className="px-4 py-2 bg-green-500 rounded-md text-white"
            onClick={handleExportToExcel}
          >
            Export to Excel
          </button>
        </div>
        <DataGrid
          className="text-center"
          getRowId={(row) => row?.user_id}
          rows={users}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        ></DataGrid>
      </div>
    </>
  );
}