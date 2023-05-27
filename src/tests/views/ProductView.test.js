import {
  act,
  render,
  screen,
  renderHook,
  getByTestId,
  cleanup,
} from "@testing-library/react";
import ProductView from "../../views/ProductView";
import axiosMock from "axios";
import { PAGINATED_VALID_LIST, CATEGORIES } from "../mockdata/ProductMockData";

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

  it("when drop down filter change", () => {
    expect(true).toBeTruthy();
  });

  it("when name input change", () => {
    expect(true).toBeTruthy();
  });
});
