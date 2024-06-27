import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import {
  toggleDropdownMacros,
  selectMacros,
  fetchDropDownMacros
} from "../features/macroDropdown/macroDropdownSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const MacrosDropdown = () => {
    const dispatch = useDispatch();
    const { isOpen, info, dropDownMacros, loading, error } = useSelector((store) => store.macrosDropdown);

    useEffect(() => {
      dispatch(fetchDropDownMacros());
    },[dispatch]);

    const handleselectMacros = (macroName) => {
      dispatch(selectMacros(macroName));
    };

    if(loading === 'loading') return <p>Loading...</p>;
    

    return (
      <>
        <button
          type="button"
          onClick={() => dispatch(toggleDropdownMacros())}
          className="type-select"
        >
          <p>{info}</p>
          {isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </button>
        {isOpen && (
          <ul>
            {Object.keys(dropDownMacros).map((macroName) => (
              <li key={macroName} onClick={() => handleselectMacros(macroName)}>
                {macroName}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };
  export default MacrosDropdown;