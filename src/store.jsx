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
import leadersReducer from "./features/leader/leadersSlice";
import rolesReducer from "./features/roles/rolesSlice";
import modalReducer from "./features/modal/modalSlice";
import programReducer from "./features/program/programSlice";
import eventFormatReducer from "./features/eventFormat/eventFormatSlice";
import skillTypeReducer from "./features/skillType/skillTypeSlice";
import macroCheckboxReducer from "./features/macroCheckbox/macroCheckboxSlice";
import channelCheckboxReducer from "./features/channelCheckbox/channelChechboxSlice";
import typesDropdownCreateReducer from "./features/typesDropdownCreate/typesDropdownCreateSlice";
import formatEducationReducer from "./features/formatEducation/formatEducationSlice";
import checkboxesForTypeReducer from "./features/checkboxes/checkboxesForTypeSlice";
import participantsReducer from "./features/participants/participantsSlice";


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
      leaders: leadersReducer,
      roles: rolesReducer,
      modal: modalReducer,
      programs: programReducer,
      eventFormats: eventFormatReducer,
      skillTypes: skillTypeReducer,
      macroCheckbox: macroCheckboxReducer,
      channelCheckbox: channelCheckboxReducer,
      typesDropdownCreate: typesDropdownCreateReducer,
      formatEducation: formatEducationReducer,
      checkboxesForType: checkboxesForTypeReducer,
      participants: participantsReducer,
    },
  });