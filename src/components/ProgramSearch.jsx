import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPrograms } from "../features/program/programSlice";
import { AiOutlineSearch, AiOutlineDelete } from "react-icons/ai";
import { searchBar, searchInput, searchButton } from "../styles/LeaderSelectionModalStyles";
import { leaderListItem, tableStyles, leaderListItemHover, selectedProgramStyle   } from "../styles/CreateEventModal"

const ProgramSearch = ({ selectedProgram, setSelectedProgram }) => {
    const dispatch = useDispatch();
    const { programs, status, error} = useSelector((state) => state.programs);
    const [query, setQuery] = useState('');

    useEffect(() => {
        if(query && !selectedProgram){
            dispatch(searchPrograms(query));
        }
    },[query, dispatch, selectedProgram]);

    const handleSearch = (event) => {
        setQuery(event.target.value);
    };

    const handleSelectProgram = (program) => {
        setSelectedProgram(program);
        setQuery(program.name);
    };

    const handleClearSelection = () => {
        setSelectedProgram(null);
        setQuery('');
    }

    return (
        <div className="search-bar" style={searchBar}>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Выберите учебную программу"
                style={searchInput}
                disabled={!!selectedProgram}
            />
            {selectedProgram ? (
                <button onClick={handleClearSelection} style={searchButton}>
                    <AiOutlineDelete />
                </button>
            ) : (
                <button onClick={() => dispatch(searchPrograms(query))} style={searchButton}>
                    <AiOutlineSearch />
                </button>
            )}
            
            
            {status === 'loading' && <div>Загрузка...</div>}
            {status === 'failed' && <div>Ошибка: {error}</div>}
            {query && !selectedProgram && programs.length > 0 &&(
                <table style={tableStyles}>
                    <thead>
                        <tr>
                            <th>Код программы</th>
                            <th>Название программы</th>
                        </tr>
                    </thead>
                    <tbody>
                        {programs.map((program) => (
                            <tr key={program.id} style={leaderListItem} onClick={() => handleSelectProgram(program)}>
                                <td>{program.code}</td>
                                <td>{program.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProgramSearch;