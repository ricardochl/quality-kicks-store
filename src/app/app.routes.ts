import { Routes } from '@angular/router';
import { LayoutComponent } from './features/layout/layout.component';
import { ProductListComponent } from './features/products/product-list.component';
import { ProductDetailComponent } from './features/products/product-detail.component';
import { CartComponent } from './features/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        path: 'products',
        component: ProductListComponent
      },
      {
        path: 'products/:id',
        component: ProductDetailComponent
      },
      {
        path: 'cart',
        component: CartComponent
      }
    ]
  }
];
