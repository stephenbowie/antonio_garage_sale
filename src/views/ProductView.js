import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Button,
  Card,
  Container,
  Header,
  Icon,
  Input,
  Message,
  Segment,
} from "semantic-ui-react";
import ProductCategoryDropDown from "../components/ProductCategoryDropDown";
import ProductList from "../components/ProductList";
import useProductHook from "../hooks/useProductHook";
import { GENERAL_LABELS, PRODUCT_LABELS } from "../translations/english";

/**
 *
 *  @author: Antonio Villasenor
 *  @fileOverview : product view displays products and loads more data when you scroll end of page
 *  @module ProductView
 *  @todo to make this a reusable component, see possible implementation below, if we want to deprecate usage of <InfiniteScroll>, 
 *      make some things into props if to be reused (like height, data page increment and etc..)
 */
function ProductView() {
  let DATA_PAGE_INCREMENT = 20;
  let {
    products,
    filterProductsByCategory,
    searchByName,
    setPaginatedProductList,
    totalFromLastCalledApi,
  } = useProductHook();

  let [limit, setLimit] = useState(DATA_PAGE_INCREMENT);
  let [canLoadMoreDate, setCanLoadMoreData] = useState(true);

  const loadMoreProducts = () => {
    setTimeout(() => {
      setPaginatedProductList(limit, limit + DATA_PAGE_INCREMENT);
      setCanLoadMoreData(products.length < totalFromLastCalledApi);
      setLimit(limit + DATA_PAGE_INCREMENT);
    }, 1500);
  };

  const filterByCategory = (category) => {
    filterProductsByCategory(category);
    setCanLoadMoreData(false);
  };

  const searchByProductName = (productName) => {
    searchByName(productName);
    setCanLoadMoreData(false);
  };

  const removeFilters = () => {
    setLimit(DATA_PAGE_INCREMENT);
    setPaginatedProductList(0, DATA_PAGE_INCREMENT);
    setCanLoadMoreData(true);
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
              ></ProductCategoryDropDown>
            </div>
            <div>
              <Input
                type="text"
                data-testid="filterName"
                placeholder={PRODUCT_LABELS.filters.searchByTitle}
                onChange={(e) => {
                  searchByProductName(e.target.value);
                }}
              ></Input>
            </div>
            <div>
              <Button
                onClick={() => {
                  removeFilters();
                }}
              >
                {PRODUCT_LABELS.filters.removeFilters}
              </Button>
            </div>
          </Card.Content>
        </Segment>
      </Container>
      <div data-testid="end"></div>
      <Container textAlign="left" fluid>
        <InfiniteScroll
          dataLength={products.length}
          next={loadMoreProducts}
          height={700}
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
   we should limit the size of the component and implement the proper way using ref or simpler implementation (like below)
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
