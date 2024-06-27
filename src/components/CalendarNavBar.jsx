import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { isSubmitted } from "../features/calendar/calendarSlice";
import {
    getCalendarEvents,
    updateMonthIndex,
} from "../features/calendar/calendarSlice";
import dayjs from "dayjs";

const CalendarNavBar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    return (
        <nav className="calendar-nav">
            <NavLink
                onClick={() => {
                    dispatch(updateMonthIndex(dayjs().month()));
                    dispatch(isSubmitted(true));
                    dispatch(getCalendarEvents());
                }}
                className={({isActive}) =>
                    isActive ? "nav-link active" : "nav-link"
                }
                to={`/calendarRetail`}
            >
                Вебинары и тренинги
            </NavLink>
            {/* ссылки на внешние календари */}
            {/*
            <a
                href="/view_doc.html?mode=doc_type&custom_web_template_id=7295674000626418478"
                className="nav-link"
                target="_blank"
                rel="noopener noreferrer "
            >
                Календарь CORP
            </a>
            <a
                href="/view_doc.html?mode=retail_calendar"
                className="nav-link"
                target="_blank"
                rel="noopener noreferrer "
            >
                Календарь RETAIL
            </a>
            <a
                href="/view_doc.html?mode=doc_type&custom_web_template_id=7135055584805000814"
                className="nav-link"
                target="_blank"
                rel="noopener noreferrer "
            >
                Календарь ДРПЗ
            </a>
            */}
            {/* <NavLink
                className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
                }
                to="/calendarCORP"
            >
                Календарь CORP
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
                }
                to="/calendarRETAIL"
            >
                Календарь RETAIL
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
                }
                to="/calendarDRPZ"
            >
                Календарь ДРПЗ
            </NavLink> */}
        </nav>
    );
};

export default CalendarNavBar;