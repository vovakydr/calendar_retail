import React, { useEffect } from "react";
import Day from "./Day";
import GridLines from "./GridLines";
import dayjs from "dayjs";
import Event from "./Event";
import WeeklyEvents from "./WeeklyEvents";
import { useSelector, useDispatch } from "react-redux";
import { handleCurrentMonth } from "../features/calendar/calendarSlice";

const Month = () => {
    const dispatch = useDispatch();
  
    const { currentMonth, monthIndex } = useSelector((store) => store.calendar);
  
    useEffect(() => {
      dispatch(handleCurrentMonth());
    }, [monthIndex]);
  
    return (
      <section className="month-grid">
        <GridLines />
        <div className=" calendar__month">
          {currentMonth.map((row, index) => {
            if (
              (dayjs(row[0]).week() === dayjs().week() &&
                dayjs(row[0]).year() === dayjs().year()) ||
              (dayjs(row[row.length - 1]).week() === dayjs().week() &&
                dayjs(row[row.length - 1]).year() === dayjs().year())
            ) {
              return (
                <div className={`week highlight`} key={index}>
                  <WeeklyEvents row={row} />
                </div>
              );
            } else {
              return (
                <div className={"week"} key={index}>
                  <WeeklyEvents row={row} />
                </div>
              );
            }
          })}
        </div>
      </section>
    );
  };
  export default Month;