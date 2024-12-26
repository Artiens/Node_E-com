import { Injectable } from '@angular/core';
import { Product } from '../models/products.models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Jordan 4 grise', price: 199.99, imageUrl: 'assets/air_jordan_4_grise.jpg' },
    { id: 2, name: 'airforce 1', price: 99.99, imageUrl: 'assets/airforce.png' },
    { id: 3, name: 'Jordan 4 frozen', price: 300.00, imageUrl: 'assets/jd4_frozen.jpg' },
    { id: 4, name: 'Jordan 4 travis', price: 500.00, imageUrl: 'assets/jd4_travis.jpg' },
    { id:5, name: 'Jordan 4 off_white', price: 1000.00, imageUrl: 'assets/jd4_offwhite.jpg' },
    { id:6, name: 'Jordan 4 military_black', price: 149.99, imageUrl: 'assets/jd4_mb.jpg' },

  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }
}
