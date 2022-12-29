import Calendar from "@assets/calendar.svg";
import React from "react";

const CalendarIcon = () => {
  return (
    <img src={Calendar} alt="calendar-icon"/>
  )
}

export default React.memo(CalendarIcon);