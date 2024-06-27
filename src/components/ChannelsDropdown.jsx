import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import {
  toggleDropdownChannels,
  selectChannels,
  fetchDropDownChannels
} from "../features/channelDropdown/channelDropdownSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ChannelsDropdown = () => {
    const dispatch = useDispatch();
    const { isOpen, info, dropDownChannels, loading, error } = useSelector((store) => store.channelsDropdown);

    useEffect(() => {
      dispatch(fetchDropDownChannels());
    },[dispatch]);

    const handleselectChannels = (channelName) => {
      dispatch(selectChannels(channelName));
    };

    if(loading === 'loading') return <p>Loading...</p>;
    

    return (
      <>
        <button
          type="button"
          onClick={() => dispatch(toggleDropdownChannels())}
          className="type-select"
        >
          <p>{info}</p>
          {isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </button>
        {isOpen && (
          <ul>
            {Object.keys(dropDownChannels).map((channelName) => (
              <li key={channelName} onClick={() => handleselectChannels(channelName)}>
                {channelName}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };
  export default ChannelsDropdown;