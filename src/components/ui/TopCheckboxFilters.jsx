import { useDispatch, useSelector } from "react-redux";
import { toggleCheckbox } from "../../features/checkboxes/checkboxesSlice";

const TopCheckboxFilters = () => {
  const dispatch = useDispatch();
  const { spec, for_type } = useSelector((store) => store.checkboxes);
  return (
    <>
      {" "}
      <div className="checkbox-input">
        <input
          type="checkbox"
          name="spec"
          id="mine"
          onChange={(e) => dispatch(toggleCheckbox(e.target.name))}
          checked={spec ? true : false}
        />
        <label htmlFor="mine">Для сотрудников</label>
      </div>
      <div className="checkbox-input">
        <input
          type="checkbox"
          name="for_type"
          id="managers"
          onChange={(e) => dispatch(toggleCheckbox(e.target.name))}
          checked={for_type ? true : false}
        />
        <label htmlFor="managers">Для руководителей</label>
      </div>
    </>
  );
};
export default TopCheckboxFilters;
