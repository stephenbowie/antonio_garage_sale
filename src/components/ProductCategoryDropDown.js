/**
 * drop down that displays all the product categories
 * @param {*} props
 * @returns functional component ProductCategoryDropDown
 */
function ProductCategoryDropDown(props) {
  return (
    <select
      className="ui dropdown"
      onChange={(e) => {
        props.handleSelect(e.target.value);
      }}
    >
      {props.categoryOptions.map((category) => {
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
