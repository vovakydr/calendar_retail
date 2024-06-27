import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import {
  toggleDropdown,
  selectType,
  fetchDropDownTypes
} from "../features/typesDropdown/typesDropdownSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const TypesDropdown = () => {
  const dispatch = useDispatch();
  const { isOpen, info, dropDownTypes, loading, error } = useSelector((store) => store.typesDropdown);

  useEffect(() => {
    dispatch(fetchDropDownTypes());
  }, [dispatch]);

  const handleSelectType = (typeName) => {
    dispatch(selectType(typeName));
  };

  if (loading === 'loading') return <p>Loading...</p>;

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
        <ul>
          {Object.keys(dropDownTypes).map((typeName) => (
            <li key={typeName} onClick={() => handleSelectType(typeName)}>
              {typeName}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TypesDropdown;
