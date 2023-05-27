import { render, screen, act, cleanup } from "@testing-library/react";
import ProductCategoryDropDown from "../../components/ProductCategoryDropDown";
import axiosMock from "axios";
import { CATEGORIES } from "../mockdata/ProductMockData";

jest.mock("axios");
describe("ProductList", () => {
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
  it("display product cards when product data are existing", async () => {
    const filterByCategory = (category) => {
      console.log("filterByCategory was triggered");
    };
    render(
      <ProductCategoryDropDown
        handleSelect={filterByCategory}
      ></ProductCategoryDropDown>
    );

    expect(await screen.findByText("laptops")).toBeVisible();
    expect(await screen.findByText("laptops")).toBeVisible();
  });

  it("when rendering calls api products/categories", async () => {
    const filterByCategory = (category) => {
      console.log("filterByCategory was triggered");
    };
    render(
      <ProductCategoryDropDown
        handleSelect={filterByCategory}
      ></ProductCategoryDropDown>
    );
    expect(await screen.findByText("laptops")).toBeVisible();
    expect(axiosMock.get).toHaveBeenCalled();
  });
});
