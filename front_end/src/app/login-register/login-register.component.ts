import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Nécessaire pour [(ngModel)]
import { environment } from '../../environments/environments'; // Nécessaire pour l'URL de l'API

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [FormsModule], // Ajout de FormsModule pour [(ngModel)]
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
})
export class LoginRegisterComponent {
  registerUsername = ''; // Contient le nom d'utilisateur à enregistrer
  registerPassword = ''; // Contient le mot de passe à enregistrer

  constructor(private http: HttpClient) {}

  /**
   * Fonction appelée lors de la soumission du formulaire d'enregistrement
   */
  onRegister() {
    if (this.registerUsername && this.registerPassword) {
      this.http
        .post(`${environment.apiUrl}/register`, {
          email: this.registerUsername,
          password: this.registerPassword,
        })
        .subscribe({
          next: (res) => {
            console.log('User registered successfully', res);
            alert('User registered successfully');
          },
          error: (err) => {
            console.error('Registration failed', err);
            alert('Registration failed');
          },
        });
    }
  }
}
