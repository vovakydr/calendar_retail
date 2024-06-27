import { Link } from "react-router-dom";
import { getCalendarEvents } from "../features/calendar/calendarSlice";
import { useDispatch } from "react-redux";
import { isSubmitted } from "../features/calendar/calendarSlice";
import { updateMonthIndex } from "../features/calendar/calendarSlice";
import dayjs from "dayjs";

const ErrorPage = () => {
  const dispatch = useDispatch();
  return (
    <main className="error-page">
      <h1>404</h1>
      <p>Упсс...такая страница не существует</p>
      <Link
        onClick={() => {
          dispatch(updateMonthIndex(dayjs().month()));
          dispatch(isSubmitted(true));
          dispatch(getCalendarEvents());
        }}
        to={"/calendarRetail"}
      >
        На главную
      </Link>
    </main>
  );
};
export default ErrorPage;
