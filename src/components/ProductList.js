import { Fragment } from "react";
import { Card } from "semantic-ui-react";
import { GENERAL_LABELS } from "../translations/english";
import ProductCard from "./ProductCard";
import PropTypes from 'prop-types';

/**
 * drop down that displays products in a card group manner
 * @param array props
 * @returns ProductList
 */
function ProductList(props) {
  return (
    <Fragment>
      {props.products.length === 0 ? (
        <div>{GENERAL_LABELS.NO_AVAILABLE_DATA}</div>
      ) : (
        <Card.Group itemsPerRow={props.itemsPerRow}>
          {props.products.map((product, index) => {
            return <ProductCard key={index} product={product}></ProductCard>;
          })}
        </Card.Group>
      )}
    </Fragment>
  );
}

export default ProductList;
ProductList.propTypes = {
  products: PropTypes.array
};
