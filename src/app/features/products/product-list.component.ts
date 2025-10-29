import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from './product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    ProductCardComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  searchQuery = '';
  selectedBrand = '';
  selectedSize: number | null = null;
  selectedGender: 'hombre' | 'mujer' | 'unisex' | '' = '';
  filteredProducts = signal<Product[]>([]);

  constructor(private productService: ProductService) {
    this.applyFilters();
  }

  applyFilters(): void {
    const filters: any = {};

    if (this.searchQuery.trim()) {
      // Use search for text queries
      const results = this.productService.searchProducts(this.searchQuery);
      this.filteredProducts.set(results);
      return;
    }

    if (this.selectedBrand) {
      filters.brand = this.selectedBrand;
    }

    if (this.selectedSize) {
      filters.size = this.selectedSize;
    }

    if (this.selectedGender) {
      filters.gender = this.selectedGender;
    }

    const results = Object.keys(filters).length > 0
      ? this.productService.filterProducts(filters)
      : this.productService.getProducts();

    this.filteredProducts.set(results);
  }
}

