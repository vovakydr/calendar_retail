import { initialRender } from "./features/checkboxes/checkboxesSlice";
import { initialDirectionRender, fetchDropDownTypes  } from "./features/typesDropdown/typesDropdownSlice";
import { initialDirectionRenderMacros, fetchDropDownMacros } from "./features/macroDropdown/macroDropdownSlice";
import { initialDirectionRenderChannels, fetchDropDownChannels } from "./features/channelDropdown/channelDropdownSlice";
import { initialFormatRender } from "./features/formatDropdown/formatDropdownSlice";
import { handleSearchBarChange } from "./features/Searchbar/searchbarSlice";
import { useLocation } from "react-router-dom";
import { updateMonthIndex } from "./features/calendar/calendarSlice";
import dayjs from "dayjs";

export const updateFiltersFromUrl = async (dispatch, location) => {
    const urlParams = new URLSearchParams(location.search);
    console.log("urlParams " + urlParams)
  
    const paramActionMap = {
      for_type: initialRender,
      spec: initialRender,
      registred: initialRender,
      free_places: initialRender,
      for_lectors: initialRender,
      subordinates: initialRender,
      type: initialFormatRender,
      direction: initialDirectionRender,
      macroregion: initialDirectionRenderMacros,
      channel: initialDirectionRenderChannels,
      name: handleSearchBarChange,
      monthIndex: updateMonthIndex,
    };
  
    let formatValue;
    let directionValue;
    let macroregionValue;
    let channelValue;
    let monthIndexValue;

    // Fetch dropdown types from the server
    const result = await dispatch(fetchDropDownTypes());
    const dropDownTypes = result.payload || new Map();

    // Fetch dropdown macros from the server
    const macrosResult = await dispatch(fetchDropDownMacros());
    const dropDownMacros = macrosResult.payload || new Map();

    // Fetch dropdown channels from the server
    const channelsResult = await dispatch(fetchDropDownChannels());
    const dropDownChannels = channelsResult.payload || new Map();
  
    urlParams.forEach((value, key) => {
      const action = paramActionMap[key];
      // // type(direction) select update
  
      if (!action) {
        console.warn(`No action found for key '${key}'`);
        return;
      }
  
      console.log(key, value);
  
      if (key === "monthIndex") {
        if (value) {
          monthIndexValue = parseInt(value, 10);
        } else {
          monthIndexValue = dayjs().month();
        }
        dispatch(action(monthIndexValue));
      }
      if (key === "direction") {
        directionValue = Object.entries(dropDownTypes).find(([name, id]) => id === value)?.[0];
        if(directionValue) {
          dispatch(action(directionValue));
        } else {
          console.warn(`No matching direction found for value '${value}'`);
        }
        return;
      }
      if(key === "macroregion") {
        macroregionValue = Object.entries(dropDownMacros).find(([name, id]) => id === value)?.[0];
        if(macroregionValue) {
          dispatch(action(macroregionValue));
        } else {
          console.warn(`No matching macroregion found for value '${value}'`);
        }
        return;
      }
      if(key === "channel") {
        channelValue = Object.entries(dropDownChannels).find(([name, id]) => id === value)?.[0];
        if(channelValue) {
          dispatch(action(channelValue));
        } else {
          console.warn(`No matching channel found for value '${value}'`);
        }
        return;
      }
      // formats select update
      if (key === "type") {
        if (value === "webinar") {
          formatValue = "Дистанционно";
        }
        if (value === "training") {
          formatValue = "Очно";
        }
        dispatch(action(formatValue));
        return;
      }
      if (key === "name") {
        dispatch(action(value));
      }
      if (key === "name") return;
      // checkboxes update
  
      dispatch(action(key));
    });
  };