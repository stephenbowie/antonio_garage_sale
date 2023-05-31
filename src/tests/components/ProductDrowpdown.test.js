import { cleanup, render, screen } from "@testing-library/react";
import axiosMock from "axios";
import ProductCategoryDropDown from "../../components/ProductCategoryDropDown";
import { PRODUCT_LABELS } from "../../translations/english";
import { CATEGORIES } from "../mockdata/ProductMockData";

jest.mock("axios");
describe("ProductList when running smoothly", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    axiosMock.get.mockImplementation((url) => {
      switch (url) {
        case "https://dummyjson.com/products/categories":
          return Promise.resolve(CATEGORIES);
        default:
          return Promise.reject(new Error("not found"));
      }
    });
  });
  it("when product data is existing, then display categories", async () => {
    const filterByCategory = (category) => {
      console.log("filterByCategory was triggered");
    };
    render(
      <ProductCategoryDropDown
        handleSelect={filterByCategory}
      ></ProductCategoryDropDown>
    );

    expect(await screen.findByText(CATEGORIES.data[2])).toBeVisible();
    expect(await screen.findByText(CATEGORIES.data[9])).toBeVisible();
  });

  it("after initial load, then calls api products/categories", async () => {
    const filterByCategory = (category) => {
      console.log("filterByCategory was triggered");
    };
    render(
      <ProductCategoryDropDown
        handleSelect={filterByCategory}
      ></ProductCategoryDropDown>
    );
    expect(await screen.findByText(CATEGORIES.data[1])).toBeVisible();
    expect(axiosMock.get).toHaveBeenCalled();
  });
});

describe("ProductList when some services are down", () => {
  afterEach(cleanup);
  beforeEach(() => {
    axiosMock.get.mockImplementation((url) => {
      switch (url) {
        case "https://dummyjson.com/products/categories":
          return Promise.reject(new Error("not found"));
        default:
          return Promise.reject(new Error("not found"));
      }
    });
  });

  it("api serves an error, then display drop down not available", async () => {
    const filterByCategory = (category) => {
      console.log("filterByCategory was triggered");
    };
    render(
      <ProductCategoryDropDown
        handleSelect={filterByCategory}
      ></ProductCategoryDropDown>
    );
    expect(
      await screen.findByText(PRODUCT_LABELS.filters.dropDownNotAvailable)
    ).toBeVisible();
  });
});
