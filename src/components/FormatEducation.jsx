import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { 
    toggleDropdown,
    selectType,
    fetchDropdownFormatEducation
 } from "../features/formatEducation/formatEducationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const FormatEducation = ({setSelectedFormatId}) => {
    const dispatch = useDispatch();
    const {isOpen, info, dropdownFormatEducation, loading, error } = useSelector((store) => store.formatEducation);

    useEffect(() => {
        dispatch(fetchDropdownFormatEducation());
    },[dispatch]);

    const handleSelectType = (formatId, formatName) => {
        dispatch(selectType(formatName));
        setSelectedFormatId(formatId);
    }
    const dropDownArrayFormat = Object.entries(dropdownFormatEducation)

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
                    {dropDownArrayFormat.map(([formatName,formatId]) => (
                        <li key={formatId} onClick={() => handleSelectType(formatId, formatName)}>
                            {formatName}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default FormatEducation;