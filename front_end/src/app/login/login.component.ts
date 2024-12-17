import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log('Submitting form with:', { email: this.email, password: this.password });

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.message = 'Login successful!';
        console.log('API Response:', response);

        // Update email in the BehaviorSubject to notify all components
        this.authService.updateUserEmail(this.email);

        // Redirect to the shop page
        this.router.navigate(['/shop']);
      },
      error: (err) => {
        console.error('API Error:', err);
        this.message = err?.error?.error || 'Invalid email or password.';
      },
    });
  }
}
