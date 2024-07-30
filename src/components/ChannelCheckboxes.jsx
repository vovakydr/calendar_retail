import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchChannels, toggleChannel } from "../features/channelCheckbox/channelChechboxSlice"; 
import { macroCheckboxContainer, macroCheckboxHeader,macroCheckboxHead, macroCheckboxLabel, selectAllCheckbox, macroCheckbox, macroCheckboxText } from '../styles/MacroCheckboxesStyles';

const ChannelCheckboxes = () => {
    const dispatch = useDispatch();
    const channels = useSelector((state) => state.channelCheckbox.channels);

    useEffect(() => {
        dispatch(fetchChannels());
    },[dispatch]);

    const handleCheckboxChange = (channelId) => {
        dispatch(toggleChannel(channelId));
    };

    return (
        <div style={macroCheckboxContainer}>
            <div style={macroCheckboxHeader}>
                <h3 style={macroCheckboxHead}>Канал</h3>
                {channels.map((channel) => (
                    <label key={channel.id} style={macroCheckboxLabel}>
                        <input 
                            type="checkbox"
                            style={macroCheckbox}
                            checked={channel.selected}
                            onChange={() => handleCheckboxChange(channel.id)}
                        />
                        <span style={macroCheckboxText}>{channel.name}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default ChannelCheckboxes;