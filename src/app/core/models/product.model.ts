export interface Product {
  id: string;
  name: string;
  brand: string;
  size: number;
  price: number;
  description: string;
  imageUrl: string;
  gender: 'hombre' | 'mujer' | 'unisex';
  stock: number;
}

