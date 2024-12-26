import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private userEmailSubject = new BehaviorSubject<string | null>(null);  // Initialize the email as null
  userEmail$ = this.userEmailSubject.asObservable();  // Observable to be subscribed by other components

  constructor(private http: HttpClient) {}

  // Login method
  login(email: string, password: string) {
    return this.http.post<{ message: string, token: string }>(`/api/login`, { email, password });
  }

  // This function is called to update the email in the BehaviorSubject
  updateUserEmail(email: string) {
    this.userEmailSubject.next(email);  // Push email into the BehaviorSubject
  }

  // Log out method
  logout() {
    this.userEmailSubject.next(null);  // Reset the email to null on logout
  }
}
