import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ShopComponent } from './shop/shop.component';
import { PaiementComponent } from './paiement/paiement.component';
import { PanierComponent } from './panier/panier.component';
import { SelectSizeComponent } from './select-size/select-size.component';
import { ProductGridComponent } from './ag-grid/ag-grid.component';
import { ChartComponent } from './chart/chart.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Route for login page
  { path: 'register', component: LoginRegisterComponent }, // Route for LoginRegisterComponent
  { path: 'shop', component: ShopComponent }, // Route for ShopComponent
  { path: 'paiement', component: PaiementComponent }, // Route for PaiementComponent
  { path: 'panier', component: PanierComponent }, // Route for PanierComponent
  { path: 'product-grid', component: ProductGridComponent },
  { path: 'select-size/:id', component: SelectSizeComponent },
  { path: 'chart', component: ChartComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirection per default toward login
  { path: '**', redirectTo: 'login' },

];
