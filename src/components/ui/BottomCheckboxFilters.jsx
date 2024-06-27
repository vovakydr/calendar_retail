import { useDispatch, useSelector } from "react-redux";
import { toggleCheckbox } from "../../features/checkboxes/checkboxesSlice";

const BottomCheckboxFilters = () => {
  const dispatch = useDispatch();
  const {
    registred,
    free_places,
  } = useSelector((store) => store.checkboxes);
  return (
    <>
      <div className="checkbox-input">
        <input
          type="checkbox"
          name="registred"
          id="registred"
          onChange={(e) => dispatch(toggleCheckbox(e.target.name))}
          checked={registred ? true : false}
        />
        <label htmlFor="registred">Я записан</label>
      </div>
      <div className="checkbox-input">
        <input
          type="checkbox"
          name="free_places"
          id="free_places"
          onChange={(e) => dispatch(toggleCheckbox(e.target.name))}
          checked={free_places ? true : false}
        />
        <label htmlFor="free_places">Есть свободные места</label>
      </div>
    </>
  );
};
export default BottomCheckboxFilters;
