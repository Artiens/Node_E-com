import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { CartService } from '../service/cart.service';
import { Product } from '../models/products.models';

@Component({
  selector: 'app-select-size',
  templateUrl: './select-size.component.html',
  styleUrls: ['./select-size.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class SelectSizeComponent implements OnInit {
  product: Product | undefined;
  sizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
  selectedSize: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.product = this.productService.getProductById(productId);

    if (!this.product) {
      alert('Product not found');
      this.router.navigate(['/shop']);
    }
  }

  onSelectSize(size: number): void {
    this.selectedSize = size;
  }

  // We confirm the addition to the basket
  async onConfirm(): Promise<void> {
    if (this.product && this.selectedSize) {
      try {
        // Wait for the product to be added before browsing
        await this.cartService.addToCart(this.product, this.selectedSize);
        alert(`Product added to cart with size ${this.selectedSize}`);
        await this.router.navigate(['/panier']);
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert('An error occurred while adding to cart.');
      }
    } else {
      alert('Please select a size.');
    }
  }
}
