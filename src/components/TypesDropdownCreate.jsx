import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import {
  toggleDropdown,
  selectType,
  fetchDropDownCreateTypes
} from "../features/typesDropdownCreate/typesDropdownCreateSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const TypesDropdownCreate = ({ setSelectedTypeId }) => {
    const dispatch = useDispatch();
    const { isOpen, info, dropDownTypes, loading, error } = useSelector((store) => store.typesDropdownCreate);
  
    useEffect(() => {
      dispatch(fetchDropDownCreateTypes());
    }, [dispatch]);

  
    const handleSelectType = (typeId, typeName) => {
      dispatch(selectType(typeName));
      setSelectedTypeId(typeId);
    };
  
    if (loading === 'loading') return <p>Loading...</p>;
    const dropDownArray = Object.entries(dropDownTypes)
  
    return (
      <>
        <button
          type="button"
          onClick={() => dispatch(toggleDropdown())}
          className="type-select"
        >
          <p>{info}</p>
          {isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </button>
        {isOpen && (
          <ul className="type-select-create">
            {dropDownArray.map(([typeName, typeId]) => (
              <li key={typeId} onClick={() => handleSelectType(typeId, typeName)}>
                {typeName}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };
  
  export default TypesDropdownCreate;