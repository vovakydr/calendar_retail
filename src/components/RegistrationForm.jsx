import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeadersData } from "../features/leader/leadersSlice";
import LeaderSelectionModal from "./SelectLeadersModal";
import { AiOutlineSearch, AiOutlineDelete } from "react-icons/ai";
import { customStyles, modalContent, errorMessageCss } from "../styles/LeaderSelectionModalStyles";


const RegistartionForm = ({event, isRegistrationLoading, addRegistration, userId }) => {
    const dispatch = useDispatch();
    const { defaultLeader, status, error } = useSelector((state) => state.leaders);
    const [firstLeader, setFirstLeader] = useState(null);
    const [secondLeader, setSecondLeader] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectingLeader, setSelectingLeader] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        console.log('Initial window.userId:', window.userId);
        if (status === 'idle') {
            dispatch(fetchLeadersData());
        }
    }, [status, dispatch]);

    useEffect(() => {
        setFirstLeader(defaultLeader);
    },[defaultLeader]);

    const handleSelectLeader = (leader) => {
        if(selectingLeader === 'first') {
            setFirstLeader(leader);
        } else if (selectingLeader === 'second') {
            setSecondLeader(leader);
        }
        setIsModalOpen(false);
    };

    const handleOpenModal = (leaderType) => {
        setSelectingLeader(leaderType);
        setIsModalOpen(true);
    };

    const handleDeleteLeader = (leaderType) => {
        if(leaderType === 'first'){
            setFirstLeader(null);
        } else if (leaderType === 'second') {
            setSecondLeader(null);
        }
    };

    const handleRegister = () => {
        if(!firstLeader) {
            setErrorMessage('Пожалуйста, выберите непосредственного руководителя.');
            return;
        }

        console.log('Sending registration with userId:', userId);

        addRegistration({
            id: event.path_id || event.id,
            userId: userId,
            firstLeaderId: firstLeader ? firstLeader.id : null,
            secondLeaderId: secondLeader ? secondLeader.id : null,
        });
    };

    return(
        <div className="registartion-form">
            <div className="leader-selection">
                <h2>Для записи на мероприятие укажите руководителя</h2>
                <div className="leader">
                    <div>Непосредственный руководитель (обязательное поле): </div>
                    <span>{firstLeader ? firstLeader.fullname : 'Не выбран'}</span>
                    <AiOutlineSearch onClick={() => handleOpenModal('first')} />
                    <AiOutlineDelete onClick={() => handleDeleteLeader('first')} />
                </div>
                <div className="leader">
                <div>Руководитель следующего уровня / функциональный руководитель (необязательное поле):</div>
                    <span> {secondLeader ? secondLeader.fullname : 'Не выбран'}</span>
                    <AiOutlineSearch onClick={() => handleOpenModal('second')} />
                    <AiOutlineDelete onClick={() => handleDeleteLeader('second')} />
                </div>
            </div>
            {errorMessage && <p className="error-message" style={errorMessageCss}>{errorMessage}</p>}
            <div className="info-button-container">
                <button
                    disabled={isRegistrationLoading}
                    onClick={handleRegister}
                >
                    {isRegistrationLoading ? (
                        <span className="loading-spinner"></span>
                    ) : (
                        "Зарегистрироваться"
                    )}
                </button>
            </div>
            <LeaderSelectionModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelectLeader={handleSelectLeader}
            />
        </div>
    );
};

export default RegistartionForm;