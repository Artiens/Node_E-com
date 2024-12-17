import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil',
  standalone: true,
  template: `<h1>Bienvenue sur la page d'accueil</h1>`,
  styles: [`h1 { text-align: center; margin-top: 20px; }`],
})
export class AccueilComponent {}
