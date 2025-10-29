import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  // Computed signals for cart data
  items = computed(() => this.cartItems());
  itemCount = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );
  total = computed(() =>
    this.cartItems().reduce((total, item) =>
      total + (item.product.price * item.quantity), 0
    )
  );

  addToCart(product: Product, quantity: number = 1): void {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      this.cartItems.set(
        currentItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      this.cartItems.set([...currentItems, { product, quantity }]);
    }
  }

  removeFromCart(productId: string): void {
    this.cartItems.set(
      this.cartItems().filter(item => item.product.id !== productId)
    );
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cartItems.set(
      this.cartItems().map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }

  clearCart(): void {
    this.cartItems.set([]);
  }

  getCartItem(productId: string): CartItem | undefined {
    return this.cartItems().find(item => item.product.id === productId);
  }
}

