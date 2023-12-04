import React from "react";
import Datepicker from "react-tailwindcss-datepicker";
import ToggleHours from "../ToggleHours/ToggleHours";
import WidgetsIcon from '@mui/icons-material/Widgets';
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import SelectWeek from "../../Containers/CheckOut/Child/SelectWeek";
import { useState } from "react";
import { useEffect } from "react";

 function MyDatepicker({
  Type,
  Available,
  AvailableH = null,
  AvailableHalf = null,
  Value,
  HandleChange,
  HandleSelectHalfDay=null,
  SelectedHalfDay=null,
  Week=null,
  SetSelectedWeek=null,
  Month=null,
  SetSelectedMonth=null,
  OnToggleSelected,
  Bookings = null,
  t=null
}) {
  let date = new Date();
  const monthNamesList = [ 
    "July", "August", "September", 
    "October", "November", "December"
  ];

  
  const DisabledDates = (Available, Type) => {
    //return [];
     //console.log(Available["days"])
    const __date = new Date();
    const days = Type === "Per_day"
        ? Available["days"]?.filter((day) => {
          return Object?.keys(day)?.some((key) => {
            const { start, end } = day[key];
            return start == "24-hours" && end == "24-hours";
          });
        }).map(obj => Object.keys(obj)[0])
        : Available["days"]?.map(obj => Object.keys(obj)[0]);
  
    const start = Type=="Per_day" && Type=="Per_month" && Type=="Per_week" ? new Date(__date.setDate(__date.getDate() + 1)) : new Date(__date.setDate(__date.getDate() - 0));
    const end = new Date(__date.setMonth(__date.getMonth() + 12));
    let loop = start;
    let arrOfDays = [];
    for (var day = loop; day <= end; day.setDate(day.getDate() + 1)) {
      arrOfDays.push({
        startDate: day.toISOString().slice(0, 10),
        endDate: day.toISOString().slice(0, 10),
      });
      let newDate = loop.setDate(loop.getDate() + 1);
      loop = new Date(newDate);
    }
    var nowDate = new Date();
    if(AvailableHalf?.end && nowDate.getHours()>=AvailableHalf?.end[0]){
      arrOfDays = arrOfDays?.filter((v) => new Date(v?.startDate)==new Date() || new Date(v?.endDate)==new Date() );
    }
    console.log(arrOfDays)
    //arrOfDays = AvailableHalf ? arrOfDays?.filter((v) => AvailableHalf?.end[0]) 
    const __f = arrOfDays.filter(
      (d) =>
        days?.includes(
          new Date(d.startDate).toLocaleDateString("en-US", { weekday: "long" })
        )
    );
    //console.log("disb days ", __f);
    return __f;
  };
  /*const half = Math.ceil(Available["days"]?.length / 2); 
  const firstHalf = Available["days"]?.splice(0, half)
  const secondHalf = Available["days"]?.splice(-half)
  let checkDate = new Date(); // 2020-06-21
  let longMonth = checkDate.toLocaleString('en-us', { month: 'long' }); */ 
  return (
    <div className="relative mb-4 z-50">
      {Type === "Per_day" ? (
        <Datepicker
          classNames={"z-30"}
          i18n={"fr"}
          asSingle={false}
          useRange={false}
          primaryColor={"lime"}
          startFrom={new Date(date.setDate(date.getDate() + 1))}
          minDate={new Date(date.setDate(date.getDate() - 1))}
          maxDate={new Date(date.setMonth(date.getMonth() + 3))}
          disabledDates={[...DisabledDates(Available, Type).concat(Bookings)]}
          value={Value}
          onChange={HandleChange}
        />
      ) : (Type === "Per_hour") ? (
        <>
          <Datepicker
            classNames={"z-50"}
            i18n={"fr"}
            asSingle={true}
            useRange={false}
            primaryColor={"lime"}
            startFrom={new Date()}
            minDate={new Date(date.setDate(date.getDate() - 1))}
            maxDate={new Date(date.setMonth(date.getMonth() + 3))}
            disabledDates={[...DisabledDates(Available, Type).concat(Bookings)]}
            value={Value}
            onChange={HandleChange}
          />
          {AvailableH.length > 0 ? (
            <div className="mt-4 w-full flex justify-center items-center flex-row flex-wrap gap-2">
              {AvailableH &&
                AvailableH?.map((item, index) => (
                  <ToggleHours
                    HandleSelect={null}
                    OnToggleSelected={OnToggleSelected}
                    key={index}
                    Hours={item}
                  />
                ))}
            </div>
          ) : (
            <div className="flex justify-center mt-4 text-center items-center px-2 py-2 bg-red-200 text-gray-800 text-sm font-medium rounded-md">
              <p>No available hours in this day,please select another day</p>
            </div>
          )}
        </>
      )
    : (Type === "Per_half_day") ? (
      <>
        <Datepicker
            classNames={"z-50"}
            i18n={"fr"}
            asSingle={true}
            useRange={false}
            primaryColor={"lime"}
            startFrom={new Date()}
            minDate={new Date(date.setDate(date.getDate() - 1))}
            maxDate={new Date(date.setMonth(date.getMonth() + 3))}
            disabledDates={[...DisabledDates(Available, Type).concat(Bookings)]}
            value={Value}
            onChange={HandleChange}
          />
          <div className="w-full h-full flex md:flex-row flex-col  justify-start items-center gap-4">
            {
                <>
                  <button
                    onClick={() => AvailableHalf?.start==null || (AvailableHalf?.start && AvailableHalf?.start[0]>9) ? null : HandleSelectHalfDay("morning",AvailableHalf?.start)} 
                    type="button" 
                    className={`text-gray-900 text-xl flex flex-row  justify-center items-center  w-full min-h-[50px] rounded-md mt-4 flex-grow
                      ${AvailableHalf?.start==null || (AvailableHalf?.start && AvailableHalf?.start[0]>9) ? 'bg-gray-50 cursor-not-allowed' 
                      : SelectedHalfDay?.type!="morning" ? 'hover:bg-gray-50 bg-white cursor-pointer' : 'text-white bg-gray-900'}
                    `}>
                    <span className="capitalize">{t("morning")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => AvailableHalf?.end==null || (AvailableHalf?.end && AvailableHalf?.end[0]>15) ? null : HandleSelectHalfDay("afternoon",AvailableHalf?.end)} 
                    className={`text-gray-900 text-xl flex flex-row  justify-center items-center  w-full min-h-[50px] rounded-md mt-4 flex-grow
                    ${AvailableHalf?.end==null || (AvailableHalf?.end && AvailableHalf?.end[0]>15) ? 'bg-gray-50 cursor-not-allowed' 
                    : SelectedHalfDay?.type!="afternoon" ? 'hover:bg-gray-50 bg-white cursor-pointer' : 'text-white bg-gray-900'}
                  `}>
                    <span className="capitalize">{t("afternoon")}</span>
                  </button>
                </>
            }
          </div>
      </>
    )
    : (Type === "Per_week") ? (
      <>
        <div className="flex justify-center items-center w-full flex-row gap-2">
          <Datepicker
            classNames={"z-50"}
            i18n={"fr"}
            asSingle={true}
            useRange={false}
            primaryColor={"lime"}
            startFrom={new Date()}
            minDate={new Date(date.setDate(date.getDate() - 1))}
            maxDate={new Date(date.setMonth(date.getMonth() + 3))}
            disabledDates={[...DisabledDates(Available, Type).concat(Bookings)]}
            value={Value}
            onChange={HandleChange}
          />
          <SelectWeek Values={[1,2,3]} Selected={Week} setSelected={SetSelectedWeek} />
        </div>
      </>
    )
    : (Type === "Per_month") ? (
      <>
      <div className="flex justify-center items-center w-full flex-row gap-2">
          <Datepicker
            classNames={"z-50"}
            i18n={"fr"}
            asSingle={true}
            useRange={false}
            primaryColor={"lime"}
            startFrom={new Date()}
            minDate={new Date(date.setDate(date.getDate() - 1))}
            maxDate={new Date(date.setMonth(date.getMonth() + 3))}
            disabledDates={[...DisabledDates(Available, Type).concat(Bookings)]}
            value={Value}
            onChange={HandleChange}
          />
          <SelectWeek 
            Values={[...Array.from({ length: 12 }, (_, index) => index + 1)]} 
            Selected={Month} 
            setSelected={SetSelectedMonth}
          />
        </div>
      </>
    )
    : null
    }
    </div>
  );
}

export default MyDatepicker;
