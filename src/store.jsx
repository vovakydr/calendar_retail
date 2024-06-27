import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./features/calendar/calendarSlice";
import eventInfoReducer from "./features/eventInfo/EventInfoSlice";
import formatDropdownReducer from "./features/formatDropdown/formatDropdownSlice";
import typesDropdownReducer from "./features/typesDropdown/typesDropdownSlice";
import macrosDropdownReducer from "./features/macroDropdown/macroDropdownSlice";
import channelsDropdownReducer from "./features/channelDropdown/channelDropdownSlice";
import searchbarReducer from "./features/Searchbar/searchbarSlice";
import checkboxesReducer from "./features/checkboxes/checkboxesSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import ratingReducer from "./features/rating/ratingSlice";

export const store = configureStore({
    reducer: {
      calendar: calendarReducer,
      eventInfo: eventInfoReducer,
      formatDropdown: formatDropdownReducer,
      typesDropdown: typesDropdownReducer,
      macrosDropdown: macrosDropdownReducer,
      channelsDropdown: channelsDropdownReducer,
      searchBarFilter: searchbarReducer,
      checkboxes: checkboxesReducer,
      sidebar: sidebarReducer,
      rating: ratingReducer,
    },
  });