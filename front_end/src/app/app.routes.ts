import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ShopComponent } from './shop/shop.component';
import { PaiementComponent } from './paiement/paiement.component';
import { PanierComponent } from './panier/panier.component';
import { SelectSizeComponent } from './select-size/select-size.component'; // Nouveau composant
import { ProductGridComponent } from './ag-grid/ag-grid.component';
import { ChartComponent } from './chart/chart.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Route pour la page de login
  { path: 'register', component: LoginRegisterComponent }, // Réutilisation de LoginComponent pour Register
  { path: 'shop', component: ShopComponent }, // Route pour Shop
  { path: 'paiement', component: PaiementComponent }, // Route pour Paiement
  { path: 'panier', component: PanierComponent }, // Route pour Panier
  { path: 'product-grid', component: ProductGridComponent },
  { path: 'select-size/:id', component: SelectSizeComponent }, // Route avec paramètre d'ID
  { path: 'chart', component: ChartComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirection par défaut vers login
  { path: '**', redirectTo: 'login' }, // Redirection pour les routes inconnues

];
