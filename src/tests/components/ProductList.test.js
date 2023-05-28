import { render, screen } from "@testing-library/react";
import ProductList from "../../components/ProductList";
import { GENERAL_LABELS } from "../../translations/english";
import { PRODUCT_MOCK_DATA } from "../mockdata/ProductMockData";

/**
 * just testing the 2 behaviour for 'now'
 */
describe("ProductList", () => {
  it("display product cards when product data are existing", () => {
    render(
      <ProductList
        products={PRODUCT_MOCK_DATA.LIST_VALID}
        itemsPerRow={4}
      ></ProductList>
    );
    const iphone8Label = screen.getByText("iPhone 8");
    expect(iphone8Label).toBeInTheDocument();
  });

  it("display label no products available when the product list is empty", () => {
    render(
      <ProductList
        products={PRODUCT_MOCK_DATA.LIST_EMPTY}
        itemsPerRow={4}
      ></ProductList>
    );
    const nodata = screen.getByText(GENERAL_LABELS.NO_AVAILABLE_DATA);
    expect(nodata).toBeInTheDocument();
  });
});
