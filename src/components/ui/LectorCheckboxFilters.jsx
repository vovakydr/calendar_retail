import { useDispatch, useSelector } from "react-redux";
import { toggleCheckbox } from "../../features/checkboxes/checkboxesSlice";

const LectorCheckboxFilters = () => {
  const dispatch = useDispatch();
  const {
    for_lectors,
  } = useSelector((store) => store.checkboxes);
  return (
    <>
      <div className="checkbox-input">
        <input
          type="checkbox"
          name="for_lectors"
          id="for_lectors"
          onChange={(e) => dispatch(toggleCheckbox(e.target.name))}
          checked={for_lectors ? true : false}
        />
        <label htmlFor="for_lectors">Мои мероприятия как преподавателя</label>
      </div>
    </>
  );
};
export default LectorCheckboxFilters;
