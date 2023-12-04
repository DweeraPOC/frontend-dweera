import React from 'react'
import { DatePicker } from 'rsuite';
import isBefore from 'date-fns/isBefore';
//import "rsuite/dist/rsuite.min.css";
import "./style.css"
import ListOfHours from './ListOfHours';

export default function CalendarPerHour({ HandleChangeDate,SelectedHours }) {
    const HandleIncrement = () => {
        HandleChangeDate("count",SelectedHours?.countHours+1)
    }

    const HandleDecrement = () => {
        HandleChangeDate("count",SelectedHours?.countHours-1)
    }
  return (
    <>
        <div className='w-full flex flex-col justify-center items-center gap-1.5'>
            <DatePicker
                placeholder={"Select day of booking"}
                style={{width : "100%"}}
                size="md"
                disabledDate={date => isBefore(date, new Date((new Date()).valueOf() - 1000*60*60*24))}
                value={SelectedHours.dateOfDay}
                onChange={(newValue)=> {
                    HandleChangeDate("day",newValue)
                }}
            />
            <div className='flex justify-center items-center w-full flex-col md:flex-row gap-2'>
                <DatePicker size="md" style={{width : "100%"}} name='from' format="HH:mm" placeholder={"Select start hour"}  
                    value={SelectedHours.startHour}
                    onChange={(newValue)=> {
                        HandleChangeDate("start",newValue)
                    }}
                />
                {/*
                    <DatePicker size="md" style={{width : "100%"}} name='to' format="HH:mm" placeholder={"Select end hour"} 
                        value={SelectedHours.endHour}
                        onChange={(newValue)=> {
                            HandleChangeDate("end",newValue)
                        }}
                    />
                */}
            </div>
        </div>
    </>
  )
}
