import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    searchEmployees, 
    addParticipants, 
    removeParticipant,
    addParticipantsFromExcel
} from "../features/participants/participantsSlice";
import { AiOutlineSearch, AiOutlineDelete } from "react-icons/ai";
import { 
    searchBar, 
    searchInput, 
    searchButton, 
    employeeSearch, 
    employeeResultText, 
    employeeResult, 
    employeeResultContent,
    employeeDelButton,
    excelButton
} from "../styles/LeaderSelectionModalStyles";
import axios from "axios";

//test url
//const URL = "/custom_web_template.html?object_id=7042022170616100726";
//prod url
const URL = "/custom_web_template.html?object_id=7054645342062408629";

const EmployeeSearch = () => {
    const [query, setQuery] = useState('');
    const [excelFile, setExcelFile] = useState(null);
    const [fileName, setFileName] = useState("Выберите файл");
    const dispatch = useDispatch();
    const { searchResults = [], selectedParticipants = [], loading, error } = useSelector((state) => state.participants);

    
    const handleSearch = () => {
        if(query.length >= 3){
            dispatch(searchEmployees(query));
        }
    };

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            handleSearch();
        }
    };

    const handleAddParticipant = (employee) => {
        dispatch(addParticipants(employee));
    };

    const handleRemoveParticipant = (participantId) => {
        dispatch(removeParticipant(participantId));
    }

    const handleFileChange = (e) => {
        setExcelFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const handleUploadExcel = async () => {
        if(excelFile) {
            const formData = new FormData();
            formData.append('action', 'save_file');
            formData.append('name', 'puks');
            formData.append('enctype', 'multipart/form-data');
            formData.append('file', excelFile);

            try{
                const response = await axios.post(`${URL}&method=upload_excel`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const addedParticipants = response.data.coll_info;
                dispatch(addParticipantsFromExcel(addedParticipants));
            }catch(err){
                console.error('Error upload Excel file:', err);
            }
        }
    };

    return (
        <div className="search-bar" style={searchBar}>
            <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                style={searchInput}
                placeholder="Поиск сотрудников"
            />
            <button onClick={handleSearch} style={searchButton} disabled={query.length < 3}>
                <AiOutlineSearch />
            </button>
            <ul>
                {searchResults.map((employee) => (
                    <li key={employee.id} onClick={() => handleAddParticipant(employee)} style={employeeSearch}>
                        {employee.fullname}
                    </li>
                ))}
            </ul>
            <label className="input-file">
                <span className="input-file-text">{fileName}</span>
                <input type="file" name="file" onChange={handleFileChange} />
                <span className="input-file-btn">Выберите файл</span>
            </label>
            <button onClick={handleUploadExcel} disabled={!excelFile} style={excelButton}>
                Загрузить из Excel
            </button>
            <h3>Выбранные учасники: </h3>
            <ul>
                {selectedParticipants.map((participant) => (
                    <li key={participant.id} style={employeeResult} onClick={() => handleRemoveParticipant(participant.id)}>
                        <div style={employeeResultContent}>
                            <span style={employeeResultText}>{participant.fullname}</span>
                            <button onClick={() => handleRemoveParticipant(participant.id)} style={employeeDelButton}>
                                <AiOutlineDelete />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeSearch;