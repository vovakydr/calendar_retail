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
  registred,
  spec,
  for_type,
  free_places,
  for_lectors,
  subordinates,
  location
) => {
  const { calendarEvents } = useSelector((store) => store.calendar);
  const { debugStore } = useSelector((store) => store);
  const { searchValue } = useSelector((store) => store.searchBarFilter);
  const { formatValue } = useSelector((store) => store.formatDropdown);
  const { typeValue } = useSelector((store) => store.typesDropdown);
  const { macroValue, dropDownMacros } = useSelector((store) => store.macrosDropdown);
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
        ...(registred === 1 ? { registred: 1 } : undefined),
        ...(for_type === 1 ? {for_type: "boss"} : undefined),
        ...(spec === 1 ? {spec: 1} : undefined),
        ...(free_places === 1 ? { free_places: 1 } : undefined),
        ...(for_lectors === 1 ? { for_lectors: 1 } : undefined),
        ...(subordinates === 1 ? { subordinates: 1 } : undefined),
        ...(searchValue.trim() !== "" ? { name: searchValue } : undefined),
        ...(formatValue !== "" ? { type: formatValue } : undefined),
        ...(typeValue !== "" ? { direction: typeValue } : undefined),
        ...(macroValue !== "" ? { macroregion: macroValue} : undefined),
        ...(channelValue !== "" ? { channel: channelValue} : undefined),
      };
      console.log(debugStore)
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
            if (key === "for_type") {
              return evt.for_type.includes("boss]");
            }
            if(key === "spec") {
              return evt.for_type.includes("spec]");
            }
            if (key === "monthIndex") {
              return true;
            }
            if(key === "macroregion") {
              return evt.macroregion.split(';').some(macro => macro.includes(value));
            }
            if(key === "direction") {
              return evt.category.split(';').some(categor => categor.includes(value));
            }
            if(key === "free_places") {
              return evt.max_pers > 0;
            }
            if(key === "subordinates") {
              return evt.sub === 1;
            }
            if(key === "for_lectors") {
              return evt.is_tutor === 1;
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
