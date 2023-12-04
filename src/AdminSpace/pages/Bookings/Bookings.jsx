import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../../Middlewares/AuthContext';
import default_picture from "../../../assets/images/default_profile_picture.png"
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function Bookings() {
  
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

    const FormatterPrice = (price) => {
        return Number(price).toLocaleString("en-US", {
          style: "currency",
          currency: "MAD",
        });
    };

    const columns = [
        {
          field: "booking_id",
          headerName: "Booking ID",
          width: 170,
          renderCell: (params) => params.row.booking_id || "null",
        },
        {
            field: "Booker Profile",
            headerName: "Booker Profile",
            width: 170,
            renderCell: (params) => (
                <div className='flex justify-center items-center gap-2 flex-row'>
                    <div className="flex justify-center items-center w-8 h-8 rounded-full overflow-hidden">
                        <img
                            src={
                            params.row?.users_bookings_booker_user_idTousers?.profile_photo 
                            ? `${process.env.REACT_APP_MAIN_URL}/images/users/${params.row?.users_bookings_booker_user_idTousers?.profile_photo}`
                            : default_picture
                            }
                            className="object-center object-cover"
                        />
                    </div>
                    <p>{params.row?.users_bookings_booker_user_idTousers?.first_name+" "+params.row?.users_bookings_booker_user_idTousers?.last_name}</p>
                </div>
            )
        },
        {
            field: "Booker Telephone",
            headerName: "Booker Telephone",
            width: 150,
            renderCell: (params) => (
              <a href={`tel:${params.row?.users_bookings_booker_user_idTousers?.telephone}`}>
                {params.row?.users_bookings_booker_user_idTousers?.telephone || "null"}
              </a>
            ),
        },
        {
            field: "start_date",
            headerName: "Start Date",
            width: 150,
            renderCell: (params) => FormatDate(params.row.start_date) || "null",
        },
        {
            field: "end_date",
            headerName: "End Date",
            width: 150,
            renderCell: (params) => FormatDate(params.row.end_date) || "null",
        },
        {
            field: "total_price",
            headerName: "Total Price",
            width: 120,
            renderCell: (params) => FormatterPrice(params.row.total_price) || "null",
        },
        {
            field: "booking_approval_status",
            headerName: "Booking Status",
            width: 150,
            renderCell: (params) => params.row.booking_approval_status || "null",
        },
        {
            field: "offer_id",
            headerName: "Offer ID",
            width: 170,
            renderCell: (params) => params.row.offer_id || "null",
        },
        {
            field: "",
            headerName: "Owner profile",
            width: 170,
            renderCell: (params) => (
                <div className='flex justify-center items-center gap-2 flex-row'>
                    <div className="flex justify-center items-center w-8 h-8 rounded-full overflow-hidden">
                        <img
                            src={
                            params.row?.users_bookings_owner_offerTousers?.profile_photo 
                            ? `${process.env.REACT_APP_MAIN_URL}/images/users/${params.row?.users_bookings_owner_offerTousers?.profile_photo}`
                            : default_picture
                            }
                            className="object-center object-cover"
                        />
                    </div>
                    <p>{params.row?.users_bookings_owner_offerTousers?.first_name+" "+params.row?.users_bookings_owner_offerTousers?.last_name}</p>
                </div>
            )
        },
        {
            field: "Owner Telephone",
            headerName: "Owner Telephone",
            width: 150,
            renderCell: (params) => (
              <a href={`tel:${params.row?.users_bookings_owner_offerTousers?.telephone}`}>
                {params.row?.users_bookings_owner_offerTousers?.telephone || "null"}
              </a>
            ),
        },
    ];

    const [bookings,setBookings] = useState([]);
    const [loading,setLoading] = useState(false)
    const auth = useAuth();
    const GetBookings = useCallback(async () => {
        try {
            setLoading(true)
          await axios({
            method: "GET",
            url: `${process.env.REACT_APP_MAIN_URL}/admin/get-bookingStatistics/`,
            headers: {
              "x-access-token": auth?.user.token,
            },
          }).then((response) => {
            if(response.status===200) return setBookings(response.data.bookings);
          })
          .catch((err) => {
            // 
          })
          .finally(() => setLoading(false));
        } catch (err) {
          //console.log(err);
        }
      }, []);

      useEffect(() => {
        GetBookings()
      },[])

      const handleExportToExcel = () => {
        const fileName = 'bookings';
        const fileType =
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
    
    
    
        const ws = XLSX.utils.json_to_sheet(bookings);
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        saveAs(data, fileName + fileExtension);
      };
  return (
    <>
    
      <div className="datatable">
          <div className="datatableTitle">
            <div>
              <button
                type="button"
                className="px-4 py-2 bg-green-500 rounded-md text-white"
                onClick={handleExportToExcel}
              >
                Export to Excel
              </button>
            </div>
          </div>
          <DataGrid
                className="text-center"
                getRowId={(row) => row.booking_id}
                rows={bookings}
                columns={columns}
                pageSize={15}
                rowsPerPageOptions={[15]}
                checkboxSelection={false}
              />
        
      </div>
    </>
  )
}
