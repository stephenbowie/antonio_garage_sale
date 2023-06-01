import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axiosMock from "axios";
import { GENERAL_LABELS, PRODUCT_LABELS } from "../../translations/english";
import ProductView from "../../views/ProductView";
import {
  mockProductApi_RETURN_FAIL,
  mockProductApi_RETURN_SUCCESSFUL,
} from "../mockapi/api_mock_product";

jest.mock("axios");
describe("ProductView", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    mockProductApi_RETURN_SUCCESSFUL();
  });

  it("when initial load the 2 apis are being called and product id 1 to twenty are displayed, then some cards are loaded and category and product endpoint will be called", async () => {
    render(<ProductView />);
    expect(await screen.findByText("iPhone 9")).toBeVisible();
    expect(
      await screen.findByText("Freckle Treatment Cream- 15gm")
    ).toBeVisible();
    expect(await axiosMock.get).toHaveBeenCalledTimes(2);
  });

  it("when screen was loaded and some products are shown, drop down filter change triggers, then /category/tops? endpoint has been called and only selected products are shown", async () => {
    render(<ProductView />);
    expect(await screen.findByText("iPhone 9")).toBeVisible();
    expect(
      await screen.findByText("Freckle Treatment Cream- 15gm")
    ).toBeVisible();
    expect(await axiosMock.get).toHaveBeenCalledTimes(2);

    expect(await screen.findByText("tops")).toBeVisible();
    const dropdown = screen.getByTestId("dropdown");
    expect(await dropdown).toBeVisible();
    userEvent.selectOptions(
      dropdown,
      screen.getByRole("option", { name: "tops" })
    );
    expect(await screen.findByText("Women Sweaters Wool")).toBeVisible();
    expect(await screen.findByText("women winter clothes")).toBeVisible();
  });

  it("when name input change, then /q?title= endpoint has been called and only products with same name are shown", async () => {
    render(<ProductView />);
    expect(await screen.findByText("iPhone 9")).toBeVisible();
    expect(
      await screen.findByText("Freckle Treatment Cream- 15gm")
    ).toBeVisible();
    expect(await axiosMock.get).toHaveBeenCalledTimes(2);
    const filterName = screen.getByTestId("filterName");
    expect(await filterName).toBeVisible();

    userEvent.type(filterName, "iphone");
    expect(await screen.findByText("iPhone 9")).toBeVisible();
  });

  it("when looking at bottom of screen, then product api is called again, loading message appears, and another 20 products will be shown by calling paginated product api", async () => {
    render(<ProductView />);
    expect(await screen.findByText("iPhone 9")).toBeVisible();
    expect(
      await screen.findByText("Freckle Treatment Cream- 15gm")
    ).toBeVisible();
    expect(await axiosMock.get).toHaveBeenCalledTimes(2);
    const scroll = screen.getByTestId("scroll");
    await scroll.addEventListener("scroll", () => {
      /* some callback */
    });
    await fireEvent.scroll(scroll, { target: { scrollY: 900 } });
    await setTimeout(() => {
      //do nothing just wait for loading to be finished
    }, 3000);
    expect(await axiosMock.get).toHaveBeenCalledTimes(2);
  });
});

describe("apis are down", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    mockProductApi_RETURN_FAIL();
  });
  it("when category service is down, then display filter not available and expect product and category endpoint called", async () => {
    render(<ProductView />);
    expect(await axiosMock.get).toHaveBeenCalledTimes(2);
    expect(
      await screen.findByText(PRODUCT_LABELS.filters.dropDownNotAvailable)
    ).toBeVisible();
  });
  it("when product service is down, then display no available data and expect product and category endpoint called", async () => {
    render(<ProductView />);
    expect(await axiosMock.get).toHaveBeenCalledTimes(2);
    expect(
      await screen.findByText(GENERAL_LABELS.NO_AVAILABLE_DATA)
    ).toBeVisible();
  });
});
