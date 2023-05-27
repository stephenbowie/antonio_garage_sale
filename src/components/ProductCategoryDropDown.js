import useCategoryHook from "../hooks/useCategoryHook";

/**
 * drop down that displays all the product categories
 * @param {*} props
 * @returns functional component ProductCategoryDropDown
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
