export interface Product {
  product_id: number;
  name: string;
  description: string;
}

export type ProductInput = Omit<Product, 'product_id'>;
