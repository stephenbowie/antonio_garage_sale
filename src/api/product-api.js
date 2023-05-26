import axios from 'axios'

/**
 *
 *  @author: Antonio Villasenor
 *  @fileOverview : API layer for products
 *  @const ProductApi
 *
 */
let baseURL = `https://dummyjson.com/products`;

export const ProductApi = {
  /**
   *  list of categories of products
   *  @params none
   *  @returns Promise possible data [''] array of product objects
   */
  category: () => {
    return axios.get(baseURL + "/categories");
  },

  /**
   *  list of product searched by name
   *  @params productName : string
   *  @returns Promise possible data [''] array of product objects
   */
  product: (productName) => {
    return axios.get(baseURL + `/search?q=${productName}`);
  },

  /**
   * list of paginated products
   * @param {*} skip integer  - a number that wherein the iteration starts in a paginated result
   * @param {*} limit - integer - number of elements to return
   * @returns Promise possible data [''] array of product objects
   */
  paginatedProducts: (skip, limit) => {
    return axios.get(baseURL + `?limit=${limit}&skip${skip}`);
  },

  /**
   * list of product searched by category
   * @param {*} category - a string to search via category name
   * @returns Promise possible data [''] array of product objects
   */
  productByCategory: (category) => {
    return axios.get(baseURL + `/category/${category}?`);
  },
};

/**
 * sample of a product data
 * {
            "id": 6,
            "title": "MacBook Pro",
            "description": "MacBook Pro 2021 with mini-LED display may launch between September, November",
            "price": 1749,
            "discountPercentage": 11.02,
            "rating": 4.57,
            "stock": 83,
            "brand": "Apple",
            "category": "laptops",
            "thumbnail": "https://i.dummyjson.com/data/products/6/thumbnail.png",
            "images": [
                "https://i.dummyjson.com/data/products/6/1.png",
                "https://i.dummyjson.com/data/products/6/2.jpg",
                "https://i.dummyjson.com/data/products/6/3.png",
                "https://i.dummyjson.com/data/products/6/4.jpg"
            ]
        }
 * 
 * 
 * sample of a promise product data
 * 
 * {
     [...product data above],
        "total": 100,
        "skip": 0,
        "limit": 10
      }
  
 */
