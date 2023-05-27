import { useState, useEffect } from "react";
import { ProductApi } from "../api/product-api";
const useCategoryHook =()=> {
    const [categoryOptions, setCategoryOptions] = useState([]);
    useEffect(() => {
      ProductApi.category().then((res) => {
        setCategoryOptions(res.data);
      });
    }, []);
   
    return categoryOptions;
}

export default useCategoryHook;
