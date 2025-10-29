import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Product } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule,
    RouterLink
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  addToCart(event: Event): void {
    if (this.product.stock === 0) {
      this.snackBar.open(
        'Producto agotado',
        'Cerrar',
        {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        }
      );
      return;
    }

    this.cartService.addToCart(this.product, 1);
    this.snackBar.open(
      `${this.product.brand} ${this.product.name} agregado al carrito`,
      'Ver carrito',
      {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      }
    );
  }
}

