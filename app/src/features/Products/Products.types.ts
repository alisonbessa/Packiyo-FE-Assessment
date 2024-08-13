export type Product = {
  id: string;
  attributes: {
    sku: string;
    name: string;
    price: string;
    quantity_available: number;
    quantity_backordered: number;
    barcode: string;
    image: string;
  };
}
export interface ProductsProps {
  products: Product[];
  currentPage: number;
  lastPage: number;
}