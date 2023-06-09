/**
 *
 *  @author: Antonio Villasenor
 *  @fileOverview : client for connecting to `https://dummyjson.com/products`
 *  @const productClient
 *  @todo: to be used in the future if there are configs for the new api call (if to be changed)
 */
import axios from "axios";
export const productClient = axios.create({
  baseURL: `https://dummyjson.com/products`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
