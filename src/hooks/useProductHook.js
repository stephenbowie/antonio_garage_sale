import { useEffect, useState } from "react";
import { ProductApi } from "../api/product-api";

const TOTAL = 100;
const INITIAL_LIMIT = 20;

const useProductHook = () => {
  let [products, setProducts] = useState([]);
  let [totalFromLastCalledApi, setTotalFromLastCalledApi] = useState(TOTAL);
  useEffect(() => {
    ProductApi.paginatedProducts(0, INITIAL_LIMIT)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {});
  }, []);

  const setProductListByCategory = (category) => {
    ProductApi.productByCategory(category)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        //do nothing for now
      });
  };

  const setProductListByName = (productName) => {
    ProductApi.product(productName)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        //do nothing for now
      });
  };

  const setPaginatedProductList = (skip, limit) => {
    ProductApi.paginatedProducts(skip, limit)
      .then((res) => {
        setProducts(res.data.products);
        setTotalFromLastCalledApi(res.data.total);
      })
      .catch((error) => {
        //do nothing for now
      });
  };

  return {
    products,
    setProducts,
    filterProductsByCategory: setProductListByCategory,
    searchByName: setProductListByName,
    setPaginatedProductList,
    totalFromLastCalledApi,
    setTotalFromLastCalledApi,
  };
};

export default useProductHook;
