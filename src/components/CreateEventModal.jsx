import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { closeCreateEventModal } from "../features/modal/modalSlice";
import { fetchProgramDetail } from "../features/program/programSlice";
import { fetchEventFormats } from "../features/eventFormat/eventFormatSlice";
import { fetchSkillTypes } from "../features/skillType/skillTypeSlice";
import { resetType } from "../features/typesDropdownCreate/typesDropdownCreateSlice";
import { resetType as formatEducationResetType } from "../features/formatEducation/formatEducationSlice";
import { customStyles2, modalContent,closeButton,modalHeader } from "../styles/LeaderSelectionModalStyles";
import ProgramSearch from "./ProgramSearch";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import MacroCheckboxes from "./MacroCheckboxes";
import ChannelCheckboxes from "./ChannelCheckboxes";
import TypesDropdownCreate from "./TypesDropdownCreate";
import FormatEducation from "./FormatEducation";
import { toggleCheckbox, resetCheckboxes } from "../features/checkboxes/checkboxesForTypeSlice";
import { macroCheckboxContainer, macroCheckboxHeader,macroCheckboxHead, macroCheckboxLabel, selectAllCheckbox, macroCheckbox, macroCheckboxText } from "../styles/MacroCheckboxesStyles";
import EmployeeSearch from "./EmployeeSearch";
import { resetParticipants } from "../features/participants/participantsSlice";
//test url
//const URL = "/custom_web_template.html?object_id=7042022170616100726";
//prod url
const URL = "/custom_web_template.html?object_id=7054645342062408629";

const CreateEventModal = () => {
    const dispatch = useDispatch();
    const isCreateEventModalOpen = useSelector((state) => state.modal.isCreateEventModalOpen);
    const programDetails = useSelector((state) => state.programs.programDetails);
    const [selectedProgram, setSelectedProgram ] = useState(null);
    const [ activeTab, setActiveTab ] = useState("Основная информация");
    const [description, setDescription ] = useState("");

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate ] = useState('');
    const { eventFormats } = useSelector((state) => state.eventFormats);
    const [eventFormat, setEventFormat] = useState('');
    const { skillTypes, status: skillTypeStatus } = useSelector((state) => state.skillTypes);
    const [ skillType, setSkillType ] = useState('');
    const [ participantLoad, setParticipantLoad ] = useState('');
    const [ eventLink, setEventLink ] = useState('');
    const [ isClosedEvent, setIsClosedEvent ] = useState(false);
    const [ timeCollaborator, setTimeCollaborator ] = useState('');
    const [ timeTutor, setTimeTutor ] = useState('');
    const [ minPersons, setMinPersons ] = useState('');
    const [ maxPersons, setMaxPersons ] = useState('');

    const { spec, for_type } = useSelector((store) => store.checkboxesForType);
    const selectedParticipants = useSelector((state) => state.participants.selectedParticipants);
    const macroCheckboxes = useSelector((state) => state.macroCheckbox.macros);
    const channelCheckboxes = useSelector((state) => state.channelCheckbox.channels);
    const [selectedTypeId, setSelectedTypeId] = useState(null);
    const [selectedFormatId, setSelectedFormatId] = useState('');

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    

    useEffect(() => {
        if(selectedProgram) {
            dispatch(fetchProgramDetail(selectedProgram.id));
        }
    }, [selectedProgram, dispatch]);

    useEffect(() => {
        if(programDetails){
            setDescription(programDetails.description || '');
        }
    },[programDetails]);

    useEffect(() => {
        if(isCreateEventModalOpen) {
            dispatch(fetchEventFormats());
            dispatch(fetchSkillTypes());
        }
    },[isCreateEventModalOpen, dispatch]);

    if(!isCreateEventModalOpen) {
        return null;
    }

    const resetForm = () => {
        setSelectedProgram(null);
        setActiveTab("основная информация");
        setDescription("");
        setStartDate("");
        setEndDate("");
        setEventFormat("");
        setSkillType("");
        setParticipantLoad("");
        setEventLink("");
        setIsClosedEvent(false);
        setTimeCollaborator("");
        setTimeTutor("");
        setMinPersons("");
        setMaxPersons("");
        dispatch(resetCheckboxes());
        dispatch(resetParticipants());
        setSelectedTypeId("");
        setSelectedFormatId("");
        dispatch(resetType());
        dispatch(formatEducationResetType());
    }

    const handleClose = () => {
        dispatch(closeCreateEventModal());
        resetForm();
    };

    
    
    const handleSubmit = async () => {
        // Обработка отправки формы с выбранной программой
        const selectedMacroIds = macroCheckboxes.filter(macro => macro.selected).map(macro => macro.id);
        const selectedChannelIds = channelCheckboxes.filter(channel => channel.selected).map(channel => channel.id);

        const eventData = {
            program_id: programDetails.id,
            start_date: startDate,
            end_date: endDate,
            max_person: maxPersons,
            min_person: minPersons,
            event_format: eventFormat,
            skill_type: skillType,
            person_load: participantLoad,
            time_coll: timeCollaborator,
            time_tutor: timeTutor,
            event_url: eventLink,
            is_closed: isClosedEvent,
            desc: description,
            spec: spec,
            boss: for_type,
            persons: selectedParticipants,
            macroCheckboxes: selectedMacroIds,
            channelCheckboxes: selectedChannelIds,
            type: selectedTypeId,
            format: selectedFormatId,
        };
        try {
            const response = await axios.post(`${URL}&method=create_event`, eventData);
            console.log('Event created successfully: ', response.data);
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
                handleClose();
            }, 3000);
            
        } catch(err) {
            console.error('Error creating event: ', err);
        }
    };

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    }

    return (
        <div className="modal">
          <div className="modal_content">
            <span className="close-modal" onClick={handleClose}>
              &times;
            </span>
            <h2>Создать Мероприятие</h2>
            {showSuccessMessage && (
                <div className="success-message">
                    Мероприятие успешно создано
                </div>
            )}
            {!showSuccessMessage && (
                <>
                    <ProgramSearch selectedProgram={selectedProgram} setSelectedProgram={setSelectedProgram} />
                    {selectedProgram && programDetails && (
                        <div>
                            <div className="tabs">
                                {["Основная информация","Дополнительные атрибуты","Описание","Участники"].map((tab) => (
                                    <button
                                        key={tab}
                                        className={`tab-button ${activeTab === tab ? "active" : ""}`}
                                        onClick={() => handleTabClick(tab)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <div className="tab-content-container">
                                <div className={`tab-content ${activeTab === "Основная информация" ? "active" : ""}`}>
                                    <h3>Основная информация</h3>
                                    <form>
                                        <label className="readInput">
                                            Название мероприятия:
                                            <input type="text" value={programDetails.name} readOnly/>
                                        </label>
                                        <label className="readInput">
                                            Количество дней:
                                            <input type="text" value={programDetails.days} readOnly />
                                        </label>
                                        <label className="readInput">
                                            Количество часов:
                                            <input type="text" value={programDetails.hours} readOnly />
                                        </label>
                                        <label className="readInput">
                                            Количество участников:
                                            <input type="text" value={programDetails.participants} readOnly />
                                        </label>
                                        <label className="readInput">
                                            Преподаватель:
                                            <input type="text" value={programDetails.instructor} readOnly />
                                        </label>
                                        <label className="readInput">
                                            Обучающая организация:
                                            <input type="text" value={programDetails.organization} readOnly />
                                        </label>
                                        <label className="readInput">
                                            Код мероприятия:
                                            <input type="text" value={programDetails.code} readOnly />
                                        </label>
                                        <label className="readInput">
                                            Дата с:
                                            <input 
                                                type="datetime-local"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                        </label>
                                        <label className="readInput">
                                            Дата по:
                                            <input 
                                                type="datetime-local"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                            />
                                        </label>
                                        <label className="readInput">
                                            Максимальное количество учатников:
                                            <input 
                                                type="text"
                                                value={maxPersons}
                                                onChange={(e) => setMaxPersons(e.target.value)}
                                            />
                                        </label>
                                        <label className="readInput">
                                            Минимальное количество участников:
                                            <input 
                                                type="text"
                                                value={minPersons}
                                                onChange={(e) => setMinPersons(e.target.value)}
                                            />
                                        </label>
                                        <label className="readInput">
                                            Форма проведения:
                                            <select 
                                                value={eventFormat}
                                                onChange={(e) => setEventFormat(e.target.value)}
                                            >
                                                <option value="" disabled>Выберите форму</option>
                                                {eventFormats.map((format) => (
                                                    <option key={format.id} value={format.id}>
                                                        {format.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                        <label className="readInput">
                                            Тип навыка:
                                            <select
                                                value={skillType}
                                                onChange={(e) => setSkillType(e.target.value)}
                                            >
                                                <option value="" disabled>Выберите тип</option>
                                                {skillTypes.map((type) => (
                                                    <option key={type.id} value={type.id}>
                                                        {type.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                        <label className="readInput">
                                            Нагрузка для участника (час):
                                            <input 
                                                type="text"
                                                value={participantLoad}
                                                onChange={(e) => setParticipantLoad(e.target.value)}
                                            />
                                        </label>
                                        <label className="readInput">
                                            Сколько часов длится мероприятие для участника:
                                            <input 
                                                type="text"
                                                value={timeCollaborator}
                                                onChange={(e) => setTimeCollaborator(e.target.value)}
                                            />
                                        </label>
                                        <label className="readInput">
                                        Сколько часов длится мероприятие для преподавателя:
                                            <input 
                                                type="text"
                                                value={timeTutor}
                                                onChange={(e) => setTimeTutor(e.target.value)}
                                            />
                                        </label>
                                        <label className="readInput">
                                            Ссылка на мероприятие:
                                            <input 
                                                type="text"
                                                value={eventLink}
                                                onChange={(e) => setEventLink(e.target.value)}
                                            />
                                        </label>
                                        <label className="readInputCheckbox">
                                            Закрытое мероприятие: 
                                            <input 
                                                type="checkbox"
                                                checked={isClosedEvent}
                                                onChange={(e) => setIsClosedEvent(e.target.checked)}
                                            />
                                        </label>
                                    </form>
                                </div>
                                <div className={`tab-content ${activeTab === "Дополнительные атрибуты" ? "active" : ""}`}>
                                    <h3>Дополнительные атрибуты</h3>
                                    <MacroCheckboxes />
                                    <ChannelCheckboxes />
                                    <div className="create-dropdown">
                                        <TypesDropdownCreate 
                                            setSelectedTypeId={setSelectedTypeId}
                                        />
                                        <FormatEducation setSelectedFormatId={setSelectedFormatId}/>
                                    </div>
                                    <div style={macroCheckboxContainer}>
                                        <div style={macroCheckboxHeader}>
                                            <h3 style={macroCheckboxHead}>Для кого</h3>
                                            <label htmlFor="mine" style={macroCheckboxLabel}>
                                                <input
                                                    type="checkbox"
                                                    style={macroCheckbox}
                                                    name="spec"
                                                    id="mine"
                                                    onChange={(e) => dispatch(toggleCheckbox(e.target.name))}
                                                    checked={spec ? true : false}
                                                />
                                                <span style={macroCheckboxText}>Для сотрудников</span>
                                            </label>
                                            <label htmlFor="managers" style={macroCheckboxLabel}>
                                                <input
                                                    type="checkbox"
                                                    style={macroCheckbox}
                                                    name="for_type"
                                                    id="managers"
                                                    onChange={(e) => dispatch(toggleCheckbox(e.target.name))}
                                                    checked={for_type ? true : false}
                                                />
                                                <span style={macroCheckboxText}>Для руководителей</span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className={`tab-content ${activeTab === "Описание" ? "active" : ""}`}>
                                    <h3>Описание</h3>
                                    <ReactQuill value={description} onChange={setDescription} />
                                </div>
                                <div className={`tab-content ${activeTab === "Участники" ? "active" : ""}`}>
                                    <h3>Участники</h3>
                                    <EmployeeSearch />
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Добавьте другие поля формы */}
            <div className="button-container">
                <button className="create-event-button" onClick={handleSubmit}>Создать</button>
            </div>
          </div>
        </div>
      );
}

export default CreateEventModal;