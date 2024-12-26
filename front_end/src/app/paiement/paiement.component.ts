import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService, CartItem } from '../service/cart.service';

@Component({
  selector: 'app-paiement',
  standalone: true,
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css'],
  imports: [CommonModule, FormsModule],
})
export class PaiementComponent {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private http: HttpClient,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    // Retrieving query parameters
    this.route.queryParams.subscribe((params) => {
      this.totalPrice = +params['amount'] || 0;
    });

    // Loading cart items
    this.cartItems = await this.cartService.getCartItems();
  }

  onPay(form: any): void {
    if (form.valid) {
      // Préparation des données à envoyer
      const paymentData = {
        id: 'vente_' + Date.now(), //Unique ID of the sale
        somme: this.totalPrice,
        idProduits: this.cartItems.map((item) => item.product.id),
      };

      // Envoi des données de paiement au backend
      this.http.post('/api/vente', paymentData).subscribe({
        next: (response) => {
          alert('Payment registered successfully !');
          this.cartService.clearCart(); // Empty cart after payment
          this.router.navigate(['/shop']); // Redirect to the store
        },
        error: (error) => {
          console.error('Payment registration error :', error);
          alert('An error has occurred during registration.');
        },
      });
    } else {
      alert('Please fill in all fields correctly.');
    }
  }
}
