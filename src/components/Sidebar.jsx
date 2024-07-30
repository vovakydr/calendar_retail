import React, { useState } from "react";
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
import { fetchUserRoles } from "../features/roles/rolesSlice";
//import CreateEventModal from "./CreateEventModal";
import { openCreateEventModal } from "../features/modal/modalSlice";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { roles, status } = useSelector((state) => state.roles);
/*
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    }; 
*/
  const handleCreateEventClick = () => {
    dispatch(openCreateEventModal());
  }

    useEffect(() => {
      const userId = window.userId;
      if(userId){
        dispatch(fetchUserRoles(userId));
      } else {
        console.error('UserID is not defined');
      }
    },[dispatch]);
    useEffect(() => {
      console.log('Roles:',roles)
    }, [roles])

    const isAdminOrTutor = roles.includes('admin') || roles.includes('tutor');
  
    const {
      registred,
      spec,
      for_type,
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
      registred,
      spec,
      for_type,
      free_places,
      for_lectors,
      subordinates,
      location
    );
  
    useEffect(() => {
      filteredLogic();
    }, [
      registred,
      spec,
      for_type,
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
        {isAdminOrTutor && (
            <div className="button-container">
              <button onClick={handleCreateEventClick} className="create-event-button">Создать мероприятие</button>
            </div>
          )}
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