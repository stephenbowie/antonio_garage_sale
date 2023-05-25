import { render, screen } from "@testing-library/react";
import ProductCard from "../../components/ProductCard";

/**
 * this is not a needed test, just for my self practice, it's been a while :)
 *
 */
describe("Test if Product Card has proper thumbnail data", () => {
  it("display product with good thumbnail", () => {
    const goodProductDetails = {
      id: 1,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/10/thumbnail.jpeg",
      images: ["...", "...", "..."],
    };
    render(<ProductCard product={goodProductDetails}></ProductCard>);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("display product with bad thumbnail", () => {
    const goodProductDetails = {
      id: 1,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "",
      images: ["...", "...", "..."],
    };
    render(<ProductCard product={goodProductDetails}></ProductCard>);
    const thumbnailUnableToDisplay = screen.getByText(
      "no product thumbnail available"
    );
    expect(thumbnailUnableToDisplay).toBeInTheDocument();
  });
});
