import { Fragment } from "react";
import { Card } from "semantic-ui-react";
import { GENERAL_LABELS } from "../translations/english";
import ProductCard from "./ProductCard";

/**
 * drop down that displays products in a card group manner
 * @param {*} props
 * @returns functional component ProductList
 */
function ProductList(props) {
  return (
    <Fragment>
      {props.products.length === 0 ? (
        <div>{GENERAL_LABELS.NO_AVAILABLE_DATA}</div>
      ) : (
        <Card.Group itemsPerRow={props.itemsPerRow}>
          {props.products.map((product) => {
            return <ProductCard product={product}></ProductCard>;
          })}
        </Card.Group>
      )}
    </Fragment>
  );
}

export default ProductList;
