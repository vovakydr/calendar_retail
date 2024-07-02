import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  handleSearchBarChange,
  resetSearchBarValue,
} from "../features/Searchbar/searchbarSlice";
import { useEffect, useMemo, useState } from "react";
import { GrClose } from "react-icons/gr";
import useHandleFilteredEvents from "../hooks/HandleFilteredEvents";
import { useNavigate, useLocation } from "react-router-dom";
import { isSubmitted } from "../features/calendar/calendarSlice";

const SearchForm = () => {
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
    const { searchValue } = useSelector((store) => store.searchBarFilter);
  
    // const [value, setValue] = useState(searchValue);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
  
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
  
    // useEffect(() => {
    //   setValue(searchValue); // Synchronize value state with searchValue from Redux
    // }, [searchValue]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // dispatch(handleSearchBarChange(value));
      dispatch(isSubmitted(true));
    };
  
    return (
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <CiSearch className="search-icon" />
          <input
            onChange={(e) => dispatch(handleSearchBarChange(e.target.value))}
            type="text"
            name="name"
            value={searchValue}
            className="search-form__input"
            placeholder="Поиск внутри календаря"
            autoComplete="off"
          />
          {searchValue.trim() !== "" && (
            <button
              type="button"
              onClick={() => {
                if (searchValue) {
                  dispatch(resetSearchBarValue(""));
                  dispatch(isSubmitted(true));
                }
              }}
              className="search-reset-icon"
            >
              <GrClose />
            </button>
          )}
        </div>
        <button className="search-form__btn" type="submit">
          Найти
        </button>
      </form>
    );
  };
  export default SearchForm;