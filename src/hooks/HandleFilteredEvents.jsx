import { useSelector } from "react-redux";
import { filterEvents } from "../features/calendar/calendarSlice";
import { updateMonthIndex } from "../features/calendar/calendarSlice";
import dayjs from "dayjs";

const useHandleFilteredEvents = (
  navigate,
  conditions,
  submitted,
  buttonDisabled,
  dispatch,
  isSubmitted,
  spec,
  boss,
  registred,
  free_places,
  for_lectors,
  subordinates,
  location
) => {
  const { calendarEvents } = useSelector((store) => store.calendar);

  const { searchValue } = useSelector((store) => store.searchBarFilter);
  const { formatValue } = useSelector((store) => store.formatDropdown);
  const { typeValue } = useSelector((store) => store.typesDropdown);
  const { macroValue } = useSelector((store) => store.macrosDropdown);
  const { channelValue } = useSelector((store) => store.channelsDropdown);
  const { monthIndex } = useSelector((store) => store.calendar);

  const filteredLogic = () => {
    if (submitted) {
      const urlSearchParams = new URLSearchParams(location.search);
      let monthQueryParam = urlSearchParams.get("monthIndex");

      if (
        monthQueryParam !== null &&
        monthQueryParam !== undefined &&
        monthQueryParam !== ""
      ) {
        const monthIndex = parseInt(monthQueryParam);
        dispatch(updateMonthIndex(monthIndex));
        urlSearchParams.set("monthIndex", monthIndex.toString());
        navigate({ search: urlSearchParams.toString() });
        conditions.monthIndex = monthIndex;
      } else {
        monthQueryParam = dayjs().month();
        const currentMonthIndex = dayjs().month();
        urlSearchParams.set("monthIndex", currentMonthIndex.toString());
        navigate({ search: urlSearchParams.toString() });
        dispatch(updateMonthIndex(currentMonthIndex));
        conditions.monthIndex = currentMonthIndex;
      }

      conditions = {
        ...conditions,
        ...(spec === 1 ? { spec: 1 } : undefined),
        ...(boss === 1 ? { boss: 1 } : undefined),
        ...(registred === 1 ? { registred: 1 } : undefined),
        ...(free_places === 1 ? { free_places: 1 } : undefined),
        ...(for_lectors === 1 ? { for_lectors: 1 } : undefined),
        ...(subordinates === 1 ? { subordinates: 1 } : undefined),
        ...(searchValue.trim() !== "" ? { name: searchValue } : undefined),
        ...(formatValue !== "" ? { type: formatValue } : undefined),
        ...(typeValue !== "" ? { direction: typeValue } : undefined),
        ...(macroValue !== "" ? { macroregion: macroValue} : undefined),
        ...(channelValue !== "" ? { channel: channelValue} : undefined),
      };

      const queryString = new URLSearchParams(conditions).toString();
console.log("queryString  " +queryString)
      navigate({ search: queryString });

      const newFilteredEvents = calendarEvents.map((evt) => {
        const anyValueUndefined = Object.values(conditions).some(
          (value) => value === undefined
        );

        if (anyValueUndefined) {
          return { ...evt, isHidden: false };
        }

        const allConditionsMet = Object.entries(conditions).every(
          ([key, value]) => {
            if (key === "name") {
              return evt[key].toLowerCase().includes(value.toLowerCase());
            }
            if (key === "boss") {
              return evt[key].indexOf("boss]") !== -1;
            }
            if (key === "monthIndex") {
              return true;
            }

            return evt[key] === conditions[key];
          }
        );

        return { ...evt, isHidden: !allConditionsMet };
      });

      dispatch(filterEvents(newFilteredEvents));
      dispatch(isSubmitted(false));
    }
  };

  return filteredLogic;
};
export default useHandleFilteredEvents;
