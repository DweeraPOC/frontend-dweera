import React from "react";
import ToggleDate from "./Childs/ToggleDate";
import { useState, useEffect } from "react";

export default function AvailabilityDays({ t, isPerHour, time, setTime, setAvaibilityTypeError }) {
  
  const [days, setDays] = useState({});

  useEffect(() => {
    setDays({
      Monday: time.map((t) => t.day).includes("Monday"),
      Tuesday: time.map((t) => t.day).includes("Tuesday"),
      Wednesday: time.map((t) => t.day).includes("Wednesday"),
      Thursday: time.map((t) => t.day).includes("Thursday"),
      Friday: time.map((t) => t.day).includes("Friday"),
      Saturday: time.map((t) => t.day).includes("Saturday"),
      Sunday: time.map((t) => t.day).includes("Sunday"),
    })
  }, [isPerHour]);
  const genUid = () => {
    return Math.random().toString(16).slice(2);
  };

  const handleCustomeHours = (name) => {
    let newTime = [...time];
    let findIndex = time?.findIndex((_h) => _h.day === name);
    let findItem = newTime[findIndex];
    if (findItem.isTwentyfour === "true") {
      findItem.isTwentyfour = "false";
      findItem.hours = [
        {
          id: genUid(),
          start: null,
          end: null,
        },
      ];
    } else {
      findItem.isTwentyfour = "true";
      findItem.hours = [
        {
          id: genUid(),
          start: "24-hours",
          end: "24-hours",
        },
      ];
    }
    return setTime(newTime);
  };

  const HandleToggle = (name) => {
    setAvaibilityTypeError("");
    setDays({
      ...days,
      [name]: !days[name],
    });
    let findIndex = time.findIndex((_h) => _h.day === name);
    if (findIndex === -1) {
      return setTime([
        ...time,
        {
          day: name,
          isTwentyfour: "true",
          hours: [{ id: genUid(), start: "24-hours", end: "24-hours" }],
        },
      ]);
    }
    let updatedList = [...time];
    updatedList.splice(findIndex, 1);
    return setTime(updatedList);
  };
  
  const HandleChange = (id, name, newValue, isStartTime) => {
    let newTime = [...time];
    let findIndex = newTime?.findIndex((_h) => _h.day === name);
    let findItem = newTime[findIndex];
    let newTimes = [...findItem.hours];
    let timeIndex = newTimes?.findIndex((_i) => _i.id === id);
    let itemTime = newTimes[timeIndex];
    if (isStartTime) itemTime.start = newValue.timeString;
    else itemTime.end = newValue.timeString;
    return setTime(newTime);
  };

  return (
    <>
      <div className="max-w-xl w-full flex justify-center flex-col gap-2 p-4">
        {days &&
          Object.keys(days)?.map((_k, index) => (
            <ToggleDate
              key={`${_k}-${index}`}
              name={_k}
              HandleToggle={HandleToggle}
              HandleChange={HandleChange}
              status={days[_k]}
              Hours={time.find((h) => {
                return h.day === _k;
              })}
              handleCustomeHours={handleCustomeHours}
              isPerHour={isPerHour}
              t={t}
            />
          ))}
      </div>
    </>
  );
}