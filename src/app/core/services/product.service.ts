import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { MOCK_PRODUCTS } from '../mocks/products.mock';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = signal<Product[]>(MOCK_PRODUCTS);

  getProducts() {
    return this.products();
  }

  getProductById(id: string): Product | undefined {
    return this.products().find(p => p.id === id);
  }

  filterProducts(filters: {
    brand?: string;
    size?: number;
    name?: string;
    gender?: 'hombre' | 'mujer' | 'unisex';
  }): Product[] {
    let filtered = this.products();

    if (filters.brand) {
      filtered = filtered.filter(p =>
        p.brand.toLowerCase().includes(filters.brand!.toLowerCase())
      );
    }

    if (filters.size) {
      filtered = filtered.filter(p => p.size === filters.size);
    }

    if (filters.name) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(filters.name!.toLowerCase())
      );
    }

    if (filters.gender) {
      filtered = filtered.filter(p =>
        p.gender === filters.gender || p.gender === 'unisex'
      );
    }

    return filtered;
  }

  searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return this.products().filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  }
}

