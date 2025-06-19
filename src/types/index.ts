export interface Review {
  id: number;
  text: string;
}

export interface Product {
  id: number;
  image_url: string;
  title: string;
  description: string;
  price: number;
}

export interface ProductsResponse {
  page: number;
  amount: number;
  total: number;
  items: Product[];
}

export interface CartItem {
  id: number;
  quantity: number;
  price: number;
  title: string;
  image_url: string;
  description: string;
}

export interface CartState {
  items: CartItem[];
  phone: string;
}

export interface OrderRequest {
  phone: string;
  cart: Array<{
    id: number;
    quantity: number;
  }>;
}

export interface OrderResponse {
  success: number;
  error?: string;
}
