import { render, screen } from "@testing-library/react";
import ProductCard from "../../components/ProductCard";
import { PRODUCT_LABELS } from "../../translations/english";
import { goodProductDetails, invalidProductDetails } from "../mockdata/ProductMockData";

/**
 * this is not a needed test, just for my self practice, it's been a while :)
 *
 */
describe("Product Card", () => {
  it("when initial load and thumbnail has data, then display product with good thumbnail", () => {
    render(<ProductCard product={goodProductDetails}></ProductCard>);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("when initial load and thumbnail is blank, display product with bad thumbnail", () => {
    render(<ProductCard product={invalidProductDetails}></ProductCard>);
    const thumbnailUnableToDisplay = screen.getByText(
      PRODUCT_LABELS.card.productThumbNailAvailable
    );
    expect(thumbnailUnableToDisplay).toBeInTheDocument();
  });
});
