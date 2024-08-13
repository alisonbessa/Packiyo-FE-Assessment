import { Product } from "~/src/components/ProductCard/productCard.types";

export interface ProductsProps {
  products: Product[];
  currentPage: number;
  lastPage: number;
}