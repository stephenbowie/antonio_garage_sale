import axios from "axios";

/**
 *
 *  @author: Antonio Villasenor
 *  @fileOverview : API layer for products (see product details in ProductMockData.js)
 *  @const ProductApi
 *
 */
let baseURL = `https://dummyjson.com/products`;

export const ProductApi = {
  /**
   *  list of categories of products
   *  @params none
   *  @returns promise[]string
   */
  category: () => {
    return axios.get(baseURL + "/categories");
  },

  /**
   *  list of product searched by name
   *  @params productName : string
   *  @returns promise[]products
   */
  product: (productName) => {
    return axios.get(baseURL + `/search?q=${productName}`);
  },

  /**
   * list of paginated products
   * @param {*} skip integer  - a number that wherein the iteration starts in a paginated result
   * @param {*} limit - integer - number of elements to return
   * @returns promise[]products
   */
  paginatedProducts: (skip, limit) => {
    return axios.get(baseURL + `?limit=${limit}&skip${skip}`);
  },

  /**
   * list of product searched by category
   * @param {*} category - a string to search via category name
   * @returns promise[]products
   */
  productByCategory: (category) => {
    return axios.get(baseURL + `/category/${category}?`);
  },
};
