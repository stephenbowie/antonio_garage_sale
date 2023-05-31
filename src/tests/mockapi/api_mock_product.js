import axiosMock from "axios";
import { CATEGORIES, IPHONE_PRODUCT, LIST_CATEGORIED, PAGINATED_VALID_LIST } from "../mockdata/ProductMockData";
jest.mock("axios");

export function mockProductApi_RETURN_SUCCESSFUL(){
    axiosMock.get.mockImplementation((url) => {
        switch (url) {
          case "https://dummyjson.com/products/categories":
            return Promise.resolve(CATEGORIES);
          case "https://dummyjson.com/products?limit=20&skip0":
            return Promise.resolve(PAGINATED_VALID_LIST);
          case "https://dummyjson.com/products/category/tops?":
            return Promise.resolve(LIST_CATEGORIED);
          case "https://dummyjson.com/products/search?q=iphone":
            return Promise.resolve(IPHONE_PRODUCT);
          default:
            return Promise.reject(new Error("not found"));
        }
      });
}

export function mockProductApi_RETURN_FAIL(){
  axiosMock.get.mockImplementation((url) => {
    switch (url) {
      case "https://dummyjson.com/products/categories":
        return Promise.reject(new Error("not found"));
      case "https://dummyjson.com/products?limit=20&skip0":
        return Promise.reject(new Error("not found"));
      default:
        return Promise.reject(new Error("not found"));
    }
  });
}