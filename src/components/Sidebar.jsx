import FormatDropdown from "./FormatDropdown";
import TypesDropdown from "./TypesDropdown";
import MacrosDropdown from "./MacrosDropdown";
import ChannelsDropdown from "./ChannelsDropdown";

import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleCheckbox,
  resetCheckboxes,
} from "../features/checkboxes/checkboxesSlice";

import { useEffect } from "react";
import { isSubmitted } from "../features/calendar/calendarSlice";
import useHandleFilteredEvents from "../hooks/HandleFilteredEvents";
import { resetType } from "../features/typesDropdown/typesDropdownSlice";
import { resetFormat } from "../features/formatDropdown/formatDropdownSlice";
import { resetMacros } from "../features/macroDropdown/macroDropdownSlice";
import { resetChannels } from "../features/channelDropdown/channelDropdownSlice";
import TopCheckboxFilters from "./ui/TopCheckboxFilters";
import BottomCheckboxFilters from "./ui/BottomCheckboxFilters";
import BossCheckboxFilters from "./ui/BossCheckboxFilters";
import LectorCheckboxFilters from "./ui/LectorCheckboxFilters";
import SidebarButtonControl from "./ui/SidebarButtonControl";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
  
    const {
      spec,
      boss,
      registred,
      free_places,
      for_lectors,
      subordinates,
    } = useSelector((store) => store.checkboxes);
  
    const { buttonDisabled } = useSelector((store) => store.sidebar);
    const { submitted } = useSelector((store) => store.calendar);
  
    let conditions = {};
  
    const filteredLogic = useHandleFilteredEvents(
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
    );
  
    useEffect(() => {
      filteredLogic();
    }, [
      spec,
      boss,
      registred,
      free_places,
      for_lectors,
      subordinates,
      navigate,
      submitted,
    ]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(isSubmitted(true));
    };
  
    return (
      <aside className="sidebar">
        <form
          onSubmit={handleSubmit}
          action="/calendarRetail"
          className="sidebar__form"
        >
          <TopCheckboxFilters />
          <div className="select-input">
            <FormatDropdown />
            <MacrosDropdown />
            <ChannelsDropdown />
            <TypesDropdown />
          </div>
          <BottomCheckboxFilters />
          <BossCheckboxFilters />
          <LectorCheckboxFilters />
          <SidebarButtonControl />
        </form>
      </aside>
    );
  };
  export default Sidebar;