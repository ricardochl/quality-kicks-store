import { RenderMode, ServerRoute } from '@angular/ssr';
import { MOCK_PRODUCTS } from './core/mocks/products.mock';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => Promise.resolve(MOCK_PRODUCTS.map((p) => ({ id: p.id }))),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
