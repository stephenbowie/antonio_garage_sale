import { render, screen } from "@testing-library/react";
import ProductCard from "../../components/ProductCard";
import { PRODUCT_LABELS } from "../../translations/english";
import {
  goodProductDetails,
  invalidProductDetails,
} from "../mockdata/ProductMockData";

describe("Product Card display", () => {
  it("when product details from props is valid, then display product with title", async () => {
    render(<ProductCard product={goodProductDetails}></ProductCard>);
    expect(await screen.findByText(goodProductDetails.title)).toBeVisible();
  });

  it("when initial load and thumbnail has data, then display product with good thumbnail", () => {
    render(<ProductCard product={goodProductDetails}></ProductCard>);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});

describe("Product Card unable to display", () => {
  it("when product details from props is invalid, then unable to display card", async () => {
    render(<ProductCard></ProductCard>);
    expect(
      await screen.findByText(PRODUCT_LABELS.card.noProductDetailsDefined)
    ).toBeVisible();
  });

  it("when initial load and thumbnail is blank, display product with bad thumbnail", () => {
    render(<ProductCard product={invalidProductDetails}></ProductCard>);
    const thumbnailUnableToDisplay = screen.getByText(
      PRODUCT_LABELS.card.productThumbNailAvailable
    );
    expect(thumbnailUnableToDisplay).toBeInTheDocument();
  });
});
