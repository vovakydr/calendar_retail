import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSearch, AiOutlineDelete } from "react-icons/ai";
import Modal from "react-modal";
import { customStyles, modalHeader, closeButton, searchBar, searchInput, searchButton, leaderList, leaderListItem, leaderListItemHover } from "../styles/LeaderSelectionModalStyles";
import { searchLeaders, fetchLeadersData, cleanLeaders } from "../features/leader/leadersSlice";

const LeaderSelectionModal = ({ isOpen, onClose, onSelectLeader }) => {
    const dispatch = useDispatch();
    const { allLeaders, status, error } = useSelector((state) => state.leaders);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if(isOpen) {
            dispatch(cleanLeaders());
            setQuery("");
            dispatch(fetchLeadersData());
        }
    },[isOpen, dispatch]);



    const handleSearch = () => {
        if(query.trim() !== "") {
            dispatch(searchLeaders(query));
        }
    };

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        if (status === "succeeded" && allLeaders) {
            console.log("Leaders data:", allLeaders);
        }
    }, [status, allLeaders]);

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onClose} 
            style={customStyles} 
            contentLabel="Select Leader"
        >
            <div className="modal-header" style={modalHeader}>
                <h2>Выберите руководителя</h2>
                <button onClick={onClose} style={closeButton}>
                    &times;
                </button>
            </div>
            <div className="search-bar" style={searchBar}>
                <input 
                    type="text"
                    placeholder="Поиск по ФИО"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={searchInput}
                />
                <button onClick={handleSearch} style={searchButton}>
                    Поиск
                </button>
                {status === "loading" && <p>Загрузка...</p>}
                {status === "failed" && <p>{error}</p>}
                {status === "succeeded" && Array.isArray(allLeaders) && (
                    <ul className="leader-list" style={leaderList}>
                        {allLeaders.map((leader) => (
                            <li key={leader.id} style={leaderListItem} onClick={() => {
                                    onSelectLeader(leader);
                                    onClose();
                                }}>
                                {leader.fullname}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Modal>
    );
};

export default LeaderSelectionModal;