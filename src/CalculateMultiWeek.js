/*
export function getWeeksBetweenDates(startDate, endDate) {
  // Ensure start date is before end date
  if (startDate.isAfter(endDate)) {
    [startDate, endDate] = [endDate, startDate];
  }

  // Initialize a counter for weeks
  let weeksDifference = 0;

  // Copy the start date to avoid modifying the original
  let currentDate = startDate.clone();

  // Loop until the current date exceeds the end date
  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, "day")) {
    // Check if the current date is at the start of a new week (Monday)
    if (currentDate.day() === 1) {
      weeksDifference++;
    }

    // Move to the next day
    currentDate = currentDate.add(1, "day");
  }

  return weeksDifference;
}
 */
import dayjs from "dayjs";

// Функция для получения количества полных недель между двумя датами
export function getWeeksBetweenDates(startDate, endDate) {
  // Преобразуем строки в объекты dayjs, если необходимо
  if (typeof startDate === 'string') {
    startDate = dayjs(startDate);
  }
  if (typeof endDate === 'string') {
    endDate = dayjs(endDate);
  }

  // Убедимся, что начальная дата перед конечной датой
  if (startDate.isAfter(endDate)) {
    [startDate, endDate] = [endDate, startDate];
  }

  // Инициализируем счетчик для недель
  let weeksDifference = 0;

  // Копируем начальную дату, чтобы избежать изменения оригинала
  let currentDate = startDate.clone();

  // Ищем первый понедельник начиная с начальной даты
  while (currentDate.day() !== 1) {
    currentDate = currentDate.add(1, 'day');
  }

  // Цикл до тех пор, пока текущая дата не превысит конечную дату
  while (currentDate.isBefore(endDate)) {
    weeksDifference++;
    currentDate = currentDate.add(1, 'week');
  }

  return weeksDifference;
}
