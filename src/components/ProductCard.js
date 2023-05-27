import { Card, Image, Popup, Rating } from "semantic-ui-react";
import { PRODUCT_LABELS } from "../translations/english";
import { isEmptyOrUndefined } from "../utils/stringUtils";
import PropTypes from 'prop-types';
const MAX_RATING = 5; //max rating of a product from what ive seen is 5, this can be adjusted in the future, for now this is enough

/**
 * A card display of a Product
 * @param object
 * @returns ProductCard
 */
function ProductCard(props) {
  return (
    <Popup
      trigger={
        <Card>
          <Card.Content>
            {isEmptyOrUndefined(props.product.thumbnail) ? (
              <div>{PRODUCT_LABELS.card.productThumbNailAvailable}</div>
            ) : (
              <Image
                size="tiny"
                src={props.product.thumbnail}
                floated="right"
              ></Image>
            )}
            <Card.Header>{props.product.title}</Card.Header>
            <Card.Meta>
              {PRODUCT_LABELS.card.price}: {props.product.price}
            </Card.Meta>
            <Card.Description>
              <div>
                {PRODUCT_LABELS.card.description}: {props.product.description}
              </div>
              <div>
                {PRODUCT_LABELS.card.brand}: {props.product.brand}{" "}
              </div>
              <div>
                {PRODUCT_LABELS.card.category}: {props.product.category}
              </div>
            </Card.Description>
          </Card.Content>
        </Card>
      }
    >
      <Popup.Header>{PRODUCT_LABELS.card.userRating}</Popup.Header>
      <Popup.Content>
        <Rating
          icon="star"
          defaultRating={props.product.rating}
          maxRating={MAX_RATING}
        />
      </Popup.Content>
    </Popup>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  product: PropTypes.object
};