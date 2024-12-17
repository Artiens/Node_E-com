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
  imports: [CommonModule], // Ajout du CommonModule ici
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
      alert('Produit non trouvé');
      this.router.navigate(['/shop']);
    }
  }

  onSelectSize(size: number): void {
    this.selectedSize = size;
  }

  // On confirme l'ajout au panier
  async onConfirm(): Promise<void> {
    if (this.product && this.selectedSize) {
      try {
        // Attendre que le produit soit ajouté avant de naviguer
        await this.cartService.addToCart(this.product, this.selectedSize);
        alert(`Produit ajouté au panier avec la taille ${this.selectedSize}`);
        await this.router.navigate(['/panier']);
      } catch (error) {
        console.error('Erreur lors de l\'ajout au panier:', error);
        alert('Une erreur est survenue lors de l\'ajout au panier.');
      }
    } else {
      alert('Veuillez sélectionner une pointure.');
    }
  }
}
