import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMacros, selectAllMacros, deselectAllMacros, toggleMacro } from "../features/macroCheckbox/macroCheckboxSlice";
import { macroCheckboxContainer, macroCheckboxHeader,macroCheckboxHead, macroCheckboxLabel, selectAllCheckbox, macroCheckbox, macroCheckboxText } from '../styles/MacroCheckboxesStyles';

const MacroCheckboxes = () => {
    const dispatch = useDispatch();
    const macros = useSelector((state) => state.macroCheckbox.macros);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        dispatch(fetchMacros());
    },[dispatch]);

    useEffect(() => {
        if(selectAll){
            dispatch(selectAllMacros());
        } else {
            dispatch(deselectAllMacros());
        }
    },[selectAll, dispatch]);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
    };

    const handleCheckboxChange = (macroId) => {
        dispatch(toggleMacro(macroId));
    };

    return (
        <div style={macroCheckboxContainer}>
            <div style={macroCheckboxHeader}>
                <h3 style={macroCheckboxHead}>Макрорегион</h3>
                <label style={selectAllCheckbox}>
                    <input 
                        type="checkbox"
                        style={macroCheckbox}
                        checked={selectAll}
                        onChange={handleSelectAll}
                    />
                    Выбрать все
                </label>
                {macros.map((macro) => (
                    <label key={macro.id} style={macroCheckboxLabel}>
                        <input 
                            type="checkbox"
                            style={macroCheckbox}
                            checked={macro.selected}
                            onChange={() => handleCheckboxChange(macro.id)}
                        />
                        <span style={macroCheckboxText}>{macro.name}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default MacroCheckboxes;