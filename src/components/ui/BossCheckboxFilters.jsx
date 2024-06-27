import { useDispatch, useSelector } from "react-redux";
import { toggleCheckbox } from "../../features/checkboxes/checkboxesSlice";

const BossCheckboxFilters = () => {
  const dispatch = useDispatch();
  const {
    subordinates,
  } = useSelector((store) => store.checkboxes);
  return (
    <>
      <div className="checkbox-input">
        <input
          type="checkbox"
          name="subordinates"
          id="subordinates"
          onChange={(e) => dispatch(toggleCheckbox(e.target.name))}
          checked={subordinates ? true : false}
        />
        <label htmlFor="subordinates">Мероприятия моих подчиненных</label>
      </div>
    </>
  );
};
export default BossCheckboxFilters;
