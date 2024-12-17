import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../service/product.service';
import { Product } from '../models/products.models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class ShopComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }
}
