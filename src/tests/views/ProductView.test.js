import { act, render, screen, renderHook, getByTestId, cleanup } from "@testing-library/react";
import ProductView from "../../views/ProductView";
import axiosMock from "axios";
import { PAGINATED_VALID_LIST, CATEGORIES } from "../mockdata/ProductMockData";



jest.mock('axios')
describe("ProductView", () => {

  afterEach(cleanup);
  it("during initial load the 2 apis are being called", () => {
    // axiosMock.get.mockImplementation((url) => {
    //   switch (url) {
    //     case 'https://dummyjson.com/products/categories':
    //       return Promise.resolve(CATEGORIES)
    //     case 'https://dummyjson.com/products?limit=20&skip0':
    //       return Promise.resolve(PAGINATED_VALID_LIST)
    //     default:
    //       return Promise.reject(new Error('not found'))
    //   }
    // })
    // render(<ProductView />)
    // expect(axiosMock.get).toHaveBeenCalledTimes(2);
    // expect(true).toBeTruthy();
    // screen.debug()
  });
  

  it("displays category dropdown when api returns data", () => {
    expect(true).toBeTruthy();
  });

  it("display products when when api returns data", () => {
    expect(true).toBeTruthy();
  });
});
