import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Nécessaire pour [(ngModel)]
import { environment } from '../../environments/environments'; // Nécessaire pour l'URL de l'API

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [FormsModule], // Added FormsModule for [(ngModel)]
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
})
export class LoginRegisterComponent {
  registerUsername = ''; // Contains the username to register
  registerPassword = ''; // Contains the password to be saved

  constructor(private http: HttpClient) {}

  /**
   * Function called when the registration form is submitted
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
