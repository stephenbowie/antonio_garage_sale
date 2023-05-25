import { Container } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Segment,
  Input,
  Header,
  Message,
  Icon,
  Button,
} from "semantic-ui-react";
import { ProductApi } from "../api/product-api";
import ProductList from "../components/ProductList";
import ProductCategoryDropDown from "../components/ProductCategoryDropDown";
import { PRODUCT_LABELS, GENERAL_LABELS } from "../translations/english";

function ProductView() {
  let DATA_PAGE_INCREMENT = 20; //what's needed for now, will make this a props if we will decide to make this a reusable component
  let [products, setProducts] = useState([]);
  let [categoryOptions, setCategoryOptions] = useState([]);
  let [limit, setLimit] = useState(DATA_PAGE_INCREMENT);
  let [canLoadMoreDate, setCanLoadMoreData] = useState(false);

  useEffect(() => {
    initialize();
    ProductApi.category().then((res) => {
      setCategoryOptions(res.data);
    });
  }, []);

  
  const initialize = () => {
    ProductApi.paginatedProducts(0, 20).then((res) => {
      setProducts(res.data.products);
    });
    setCanLoadMoreData(true);
  };

  const loadMoreProducts = () => {
    setTimeout(() => {
      ProductApi.paginatedProducts(limit, limit + DATA_PAGE_INCREMENT).then(
        (res) => {
          setProducts(res.data.products);
          setCanLoadMoreData(products.length < res.data.total);
        }
      );
      setLimit(limit + DATA_PAGE_INCREMENT);
    }, 1500);
  };

  const filterByCategory = (category) => {
    ProductApi.productByCategory(category).then((res) => {
      setProducts(res.data.products);
    });
    setCanLoadMoreData(false);
  };

  const searchByProductName = (productName) => {
    ProductApi.product(productName).then((res) => {
      setProducts(res.data.products);
    });
    setCanLoadMoreData(false);
  };

  return (
    <div>
      <Container fluid textAlign="left">
        <Segment>
          <Card.Content>
            <div>
              <Header as="h2">{PRODUCT_LABELS.filters.searchByCategory}</Header>
              <ProductCategoryDropDown
                handleSelect={filterByCategory}
                categoryOptions={categoryOptions}
              ></ProductCategoryDropDown>
            </div>
            <div>
              <Input
                placeholder={PRODUCT_LABELS.filters.searchByTitle}
                onChange={(e) => {
                  searchByProductName(e.target.value);
                }}
              ></Input>
            </div>
            <div>
              <Button
                onClick={() => {
                  initialize();
                }}
              >
                {PRODUCT_LABELS.filters.removeFilters}
              </Button>
            </div>
          </Card.Content>
        </Segment>
      </Container>
      <Container textAlign="left" fluid>
        <InfiniteScroll
          dataLength={products.length}
          next={loadMoreProducts}
          hasMore={canLoadMoreDate}
          loader={
            <Message icon>
              <Icon name="circle notched" loading />
              <Message.Content>
                <Message.Header>{GENERAL_LABELS.JUST_A_SECOND}</Message.Header>
                {GENERAL_LABELS.FETCHING_CONTENT}
              </Message.Content>
            </Message>
          }
        >
          <ProductList products={products} itemsPerRow={6}></ProductList>
        </InfiniteScroll>
      </Container>
    </div>
  );
}
export default ProductView;
/**
 * 
 *  @author: Antonio Villasenor 
 *  @fileOverview :
        * Using dummyJSON (https://dummyjson.com/docs/products) display a list of products, where following is shown
                for each product:
                • Thumbnail
                • Title
                • Price
                • Description
                • Brand
                • Category
        * Initially, the first 20 products should be loaded, then once the user has scrolled down to the end of the list
            the next 20 are loaded and so on until all products are loaded
            User should be able to filter the list by different product categories
            User should be able to search products via free text field
            
 *  @module ProductView
 * 
 *  @todo for now since this is not a reusable component, this is a proper implementation with usage of <InfiniteScroll> 
 *          but to make this a reusable component,
 *          we should limit the size of the component and implement the proper way using ref or simpler implementation (like below)
                const handleScroll = (e) => {
                    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
                      if (bottom) { 
                          // load more data
                      }
                    }

                return (
                    <div onScroll={handleScroll}  style={{overflowY: 'scroll', maxHeight: '400px'}}  >
                        //overflowing elements here
                   </div>
                )
 */
