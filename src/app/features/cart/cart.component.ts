import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  items = computed(() => this.cartService.items());
  itemCount = computed(() => this.cartService.itemCount());
  total = computed(() => this.cartService.total());

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
    this.snackBar.open('Producto eliminado del carrito', 'Cerrar', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  increaseQuantity(productId: string, currentQuantity: number): void {
    this.cartService.updateQuantity(productId, currentQuantity + 1);
  }

  decreaseQuantity(productId: string, currentQuantity: number): void {
    if (currentQuantity > 1) {
      this.cartService.updateQuantity(productId, currentQuantity - 1);
    }
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.snackBar.open('Carrito vaciado', 'Cerrar', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  checkout(): void {
    this.snackBar.open('Función de pago en desarrollo', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
