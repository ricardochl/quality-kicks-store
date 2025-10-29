import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  product = signal<Product | undefined>(undefined);
  quantity = signal<number>(1);

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      const foundProduct = this.productService.getProductById(productId);
      this.product.set(foundProduct);
    }

    if (!this.product()) {
      this.router.navigate(['/products']);
    }
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  addToCart(): void {
    const product = this.product();
    if (product && product.stock > 0) {
      this.cartService.addToCart(product, this.quantity());
      this.router.navigate(['/cart']);
    }
  }

  increaseQuantity(): void {
    const product = this.product();
    if (product && this.quantity() < product.stock) {
      this.quantity.update(q => q + 1);
    }
  }

  decreaseQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }
}

