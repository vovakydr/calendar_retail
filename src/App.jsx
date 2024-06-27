import { useEffect } from "react";
import {
  getCalendarEvents,
  handleCurrentMonth,
} from "./features/calendar/calendarSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  HashRouter,
  Routes,
  Route,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import CalendarRetail from "./pages/CalendarRetail";

import SharedLayout from "./pages/SharedLayout";
import EventInfo from "./pages/EventInfo";
import { createHashHistory } from "history";
import { updateFiltersFromUrl } from "./filtersUtils";
import { isSubmitted } from "./features/calendar/calendarSlice";
import ErrorPage from "./components/ErrorPage";
import Redirect from "./Redirect";
import dayjs from "dayjs";
import { updateMonthIndex } from "./features/calendar/calendarSlice";
import { enableMapSet } from 'immer';

enableMapSet();

const router = createHashRouter([
  {
    path: "/",
    element: <SharedLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Redirect />,
      },
      {
        path: `calendarRetail`,
        element: <CalendarRetail />,
        
      },
      // {
      //   path: "CalendarCORP",
      //   element: <CalendarCORP />,
      // },
      // {
      //   path: "CalendarRETAIL",
      //   element: <CalendarRETAIL />,
      // },
      // {
      //   path: "CalendarDRPZ",
      //   element: <CalendarDRPZ />,
      // },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  const history = createHashHistory();
  const location = history.location;
  const urlSearchParams = new URLSearchParams(location.search);
  let monthQueryParam = urlSearchParams.get("monthIndex");

  useEffect(() => {
    if (
      monthQueryParam !== null &&
      monthQueryParam !== undefined &&
      monthQueryParam !== ""
    ) {
      dispatch(updateMonthIndex(monthQueryParam));
    } else {
      dispatch(updateMonthIndex(dayjs().month()));
    }
    dispatch(handleCurrentMonth());
    dispatch(getCalendarEvents());
  }, []);



  return <RouterProvider router={router} />;
}

export default App;
