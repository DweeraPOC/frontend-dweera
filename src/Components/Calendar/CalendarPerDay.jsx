import React, { useState } from 'react'
import { DateRangePicker,DatePicker } from 'rsuite';
import isBefore from 'date-fns/isBefore';
//import "rsuite/dist/rsuite.min.css";
import "./style.css"

export default function CalendarPerDay({ HandleChangeDate,SelectedDate }) {
  let date = new Date();
  const [dates,setDates] = useState({
    start : new Date(),
    end : new Date(date.setDate(date.getDate() + 1))
  });
  /*const HandleChange = (name,newValue) => {
    if(name==="start") {
      setDates({
        ...dates,
        start : newValue
      })
    }
    else {
      setDates({
        ...dates,
        end : newValue
      })
    }
  }*/
  return (
    <>
      <div className='w-full flex flex-col justify-center items-center gap-1.5'>
          <div className='flex flex-col justify-start items-start gap-1 w-full'>
            <span className='text-gray-400 ml-2'>Check-In :</span>
            <DatePicker
              style={{ width:"100%" }}
              size="md"
              placeholder={"Check-In"}
              
              disabledDate={date => isBefore(date, new Date((new Date()).valueOf() - 1000*60*60*24))}
              value={SelectedDate.startDate}
              onChange={(newValue) => {
                HandleChangeDate("start",newValue)
              }}
            />
          </div>
          <div className='flex flex-col justify-start items-start gap-1 w-full'>
            <span className='text-gray-400 ml-2'>Check-Out :</span>
            <DatePicker
              style={{ width:"100%" }}
              size="md"
              placeholder={"Check-Out"}
              
              disabledDate={
                date => isBefore(date, new Date((new Date(SelectedDate.startDate)).valueOf() - 1000*60*60*24) && new Date(new Date(SelectedDate.startDate).setDate(new Date(SelectedDate.startDate).getDate() + 1)) )}
              value={SelectedDate?.endDate}
              onChange={(newValue) => {
                HandleChangeDate("end",newValue)
              }}
            />
          </div>
      </div>
    </>
  )
}
