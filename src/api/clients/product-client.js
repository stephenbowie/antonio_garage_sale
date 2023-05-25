/**
 *
 *  @author: Antonio Villasenor
 *  @fileOverview : client for connecting to `https://dummyjson.com/products`
 *  @const productClient
 *
 */
import axios from "axios";
export const productClient = axios.create({
  baseURL: `https://dummyjson.com/products`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
