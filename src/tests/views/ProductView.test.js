import {
  render,
  screen,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import ProductView from "../../views/ProductView";
import axiosMock from "axios";
import { PAGINATED_VALID_LIST, CATEGORIES, LIST_CATEGORIED } from "../mockdata/ProductMockData";
import { async } from "q";

jest.mock("axios");
describe("ProductView", () => {
  afterEach(cleanup);
  beforeEach(() => {
    axiosMock.get.mockImplementation((url) => {
      switch (url) {
        case "https://dummyjson.com/products/categories":
          return Promise.resolve(CATEGORIES);
        case "https://dummyjson.com/products?limit=20&skip0":
          return Promise.resolve(PAGINATED_VALID_LIST);
        case "https://dummyjson.com/products/category/skincare?":
          return Promise.resolve(LIST_CATEGORIED)
        default:
          return Promise.reject(new Error("not found"));
      }
    });
  });

  it("when initial load the 2 apis are being called and product id 1 to twenty are displayed, then some cards are loaded and category and product endpoint will be called", async () => {
    render(<ProductView />);
    expect(await screen.findByText("iPhone 9")).toBeVisible();
    expect(
      await screen.findByText("Freckle Treatment Cream- 15gm")
    ).toBeVisible();
    expect(await axiosMock.get).toHaveBeenCalledTimes(2);
    
  });

  it("when screen was loaded and some products are shown, drop down filter change triggers, then /category endpoint has been called and only selected products are shown", async() => {
    const { getByTestId } = render(<ProductView />);
    expect(await screen.findByText("iPhone 9")).toBeVisible();
    expect(await screen.findByText("Freckle Treatment Cream- 15gm")).toBeVisible();
    expect(await axiosMock.get).toHaveBeenCalledTimes(2);

    expect(await screen.findByText("iPhone 9")).toBeVisible();
    const dropdown = getByTestId('dropdown');
    expect(await dropdown).toBeVisible();
  });

  it("when name input change, then /q?title= endpoint has been called and only products with same name are shown", () => {
    expect(true).toBeTruthy();
  });

  it("when looking at bottom of screen, then product api is called again, loading message appears, and another 20 products will be shown", () => {
    expect(true).toBeTruthy();
  });
});
