import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userEmail: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to the userEmail$ observable to listen for changes
    this.authService.userEmail$.subscribe(email => {
      this.userEmail = email;
    });
  }

  logout(): void {
    this.authService.logout();  // Clear email on logout
    this.userEmail = null;  // Clear the userEmail in the component
  }
}

