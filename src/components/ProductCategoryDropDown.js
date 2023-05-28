import PropTypes from "prop-types";
import useCategoryHook from "../hooks/useCategoryHook";
import { PRODUCT_LABELS } from "../translations/english";

/**
 * drop down that displays all the product categories, specific for https://dummyjson.com/products/category
 * @param func
 * @returns ProductCategoryDropDown
 */
function ProductCategoryDropDown(props) {
  const categoryOptions = useCategoryHook();

  function dropdown() {
    if (categoryOptions.length > 0) {
      return (
        <select
          data-testid="dropdown"
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
    return <div>{PRODUCT_LABELS.filters.dropDownNotAvailable}</div>;
  }

  return dropdown();
}
export default ProductCategoryDropDown;
ProductCategoryDropDown.propTypes = {
  product: PropTypes.func,
};
