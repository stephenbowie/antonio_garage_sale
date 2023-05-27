import useCategoryHook from "../hooks/useCategoryHook";
import PropTypes from 'prop-types';

/**
 * drop down that displays all the product categories
 * @param func
 * @returns ProductCategoryDropDown
 */
function ProductCategoryDropDown(props) {
  const categoryOptions = useCategoryHook();

  return (
    <select
      className="ui dropdown"
      onChange={(e) => {
        props.handleSelect(e.target.value);
      }}
    >
      {categoryOptions.map((category) => {
        return (
          <option key={category} value={category}>
            {category}
          </option>
        );
      })}
    </select>
  );
}
export default ProductCategoryDropDown;
ProductCategoryDropDown.propTypes = {
  product: PropTypes.func
};
