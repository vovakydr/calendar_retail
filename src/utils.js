import dayjs from "dayjs";
import { getWeeksBetweenDates } from "./CalculateMultiWeek";

import "dayjs/locale/ru";
import localizedFormat from "dayjs/plugin/localizedFormat";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import isBetween from "dayjs/plugin/isBetween";
import weekOfYear from "dayjs/plugin/weekOfYear";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Europe/Moscow");
dayjs.extend(localizedFormat);
dayjs.locale("ru");
dayjs.extend(duration);
dayjs.duration();
dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.extend(weekOfYear);

// // ===========--===========
export const getNewData = (data) => {
    let newData = [];
  
    data.map((info) => {
      const infoCopy = { ...info };
      const { start_date, finish_date, name, start_date_prev_month } = info;
  
      // Проверка разницы в неделях и месяцах между датами начала и окончания
      if (
        dayjs.tz(start_date).week() !== dayjs.tz(finish_date).week() ||
        dayjs.tz(start_date).month() !== dayjs.tz(finish_date).month()
      ) {
        // Инициализация переменных для новых свойств
        let newStartDate;
        let spanTransfer;
        let newDay;
        let isFirst;
        let isLast;
        let isMiddle;
        let newFinishDate;
        let idCounter = 0;
        let startDate;
  
        if (start_date_prev_month) {
          startDate = dayjs.tz(finish_date).startOf("month");
        } else {
          startDate = start_date;
        }
  
        // Вычисление количества недель между датами
        let amountOfWeeks = getWeeksBetweenDates(
          dayjs.tz(startDate),
          dayjs.tz(finish_date)
        );
  
        const endOfMonthOrigin = dayjs.tz(start_date).endOf("month");
        const endOfMonthOriginIncluded = dayjs
          .tz(endOfMonthOrigin)
          .isBetween(start_date, finish_date);
  
        if (endOfMonthOriginIncluded && !start_date_prev_month) {
          amountOfWeeks = getWeeksBetweenDates(
            dayjs.tz(start_date),
            dayjs.tz(endOfMonthOrigin)
          );
        }
  
        if (amountOfWeeks === 0) {
          amountOfWeeks = 1;
        }
  
        // Цикл для разделения событий на недели
        for (let i = 0; i <= amountOfWeeks; i++) {
          isMiddle = 1;
  
          if (i === 0) {
            newStartDate = dayjs.tz(startDate); // Клонирование начальной даты
            isFirst = 1;
            isMiddle = 0;
          } else {
            isFirst = 0;
          }
  
          if (
            start_date_prev_month &&
            dayjs.tz(startDate).week() !== dayjs.tz(finish_date).week()
          ) {
            isMiddle = 1;
            isLast = 0;
            isFirst = 0;
          }
  
          if (i === amountOfWeeks) {
            isLast = 1;
            isMiddle = 0;
          } else {
            isLast = 0;
          }
  
          if (
            start_date_prev_month &&
            dayjs.tz(startDate).week() === dayjs.tz(finish_date).week()
          ) {
            isMiddle = 0;
            isLast = 1;
            isFirst = 0;
          }
  
          let eventStart = newStartDate.day();
          const allowedToSpan = 6 - eventStart;
          let addDays = allowedToSpan;
  
          if (dayjs.tz(finish_date).diff(newStartDate, "day") < allowedToSpan) {
            addDays = dayjs.tz(finish_date).diff(newStartDate, "day");
          }
  
          const endOfMonth = newStartDate.endOf("month"); // Клонирование конца месяца
          const endOfMonthIncluded = endOfMonth.isBetween(
            newStartDate,
            finish_date
          );
  
          if (endOfMonthIncluded && newStartDate.week() === endOfMonth.week()) {
            addDays = endOfMonth.diff(newStartDate, "day");
          }
  
          newFinishDate = newStartDate.add(addDays, "day").format();
          let eventSpanEnd = dayjs.tz(finish_date).diff(newStartDate, "day");
  
          if (eventSpanEnd < 1) {
            eventSpanEnd = 1;
          }
  
          let newEvent = {
            ...infoCopy,
            path_id: info.id,
            id: `${info.id}mw${idCounter}`,
            start_date: newStartDate.format(),
            finish_date: newFinishDate,
            is_multiWeek: true,
            is_first: isFirst,
            is_last: isLast,
            is_Middle: isMiddle,
            old_start_date: info.start_date,
            old_finish_date: info.finish_date,
          };
  
          idCounter += 1;
          newData = [newEvent, ...newData];
  
          if (eventSpanEnd > allowedToSpan) {
            spanTransfer = eventSpanEnd - allowedToSpan;
          }
  
          newDay = dayjs.tz(finish_date).subtract(spanTransfer, "day");
          if (newDay.day() === 6) {
            newDay = newDay.add(2, "day");
          }
          if (newDay.day() === 0) {
            newDay = newDay.add(1, "day");
          }
  
          newStartDate = newDay;
        }
  
        return;
      }
  
      newData = [...newData, info];
    });
  
    return newData;
  };