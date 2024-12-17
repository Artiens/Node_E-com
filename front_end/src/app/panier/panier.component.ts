import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import nécessaire
import { Router } from '@angular/router'; // Pour la navigation
import { CartService, CartItem } from '../service/cart.service';

@Component({
  selector: 'app-panier',
  standalone: true,
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
  imports: [CommonModule], // Import explicite pour *ngFor et autres directives
})
export class PanierComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.cartItems = await this.cartService.getCartItems();
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.product.price, 0);
  }

  goToPayment(): void {
    this.router.navigate(['/paiement'], { queryParams: { amount: this.totalPrice } });
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
    this.totalPrice = 0;
  }
}
