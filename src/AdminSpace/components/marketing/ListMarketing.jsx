import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { useAuth } from '../../../Middlewares/AuthContext'
import { useCallback } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export default function ListMarketing() {
    const auth = useAuth();
    const FormatDate = (date) => {
        const checkZero = (data) => {
          if(data.length == 1){
            data = "0" + data;
          }
          
          return data;
        }
    
        //var today = FormatDate(new Date());
        var currentDate = new Date(date);
        var day = currentDate?.getDate() + "";
        var month = (currentDate?.getMonth() + 1) + "";
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
    
        return (day + "/" + month + "/" + year + " " + hour + ":" + minutes);
    }
    const columns = [
        { field: 'Id', headerName: 'ID', width: 70 },
        { field: 'Email', headerName: 'Email', width: 800 },
        { field: 'created_at', headerName: 'Date Join', width: 200 ,renderCell : (params) => FormatDate(params.row.created_at)},
    ];
    const [emails,setEmails] = useState([]);
    const GetEmails = useCallback( async () => {
      try{
        await axios(
          {
            method : 'GET',
            url : `${process.env.REACT_APP_MAIN_URL}/marketing/get-subscribed-emails/`,
            headers : {
              "x-access-token" : auth?.user.token
            }
          }
        )
        .then((response) => {
          setEmails(response.data.emails)
        })
        .catch((err) => {
          //console.log(err);
        })
      }
      catch(err){
        console.log(err);
      }
    },[])

    useEffect(() => {
        GetEmails();
    },[GetEmails])
  return (
    <>
        <div className='w-full h-screen px-4 py-4'>
            <DataGrid
                className='text-center'
                rows={emails}
                columns={columns}
                pageSize={15}
                rowsPerPageOptions={[5]}
                checkboxSelection={false}
                getRowId={(row) => row.Id}
            />
        </div>
    </>
  )
}
