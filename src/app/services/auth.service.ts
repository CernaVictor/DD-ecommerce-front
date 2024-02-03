import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.component';
import { Address } from '../models/adress.component';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  register(
    registerDTO: Partial<{
      user: User;
      deliveryAddress: Address;
      billingAddress: Address;
    }>
  ): Observable<Object> {
    return this.http.post('http://localhost:8080/api/register', registerDTO);
  }

  login(user: User): Observable<any> {
    return this.http.post('http://localhost:8080/api/login', user);
  }

  loggedIn() {
    return !!localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  forgotPassword(email: string) {
    return this.http.put(
      `http://localhost:8080/api/forgot-password?email=${email}`,
      {}
    );
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.put(
      `http://localhost:8080/api/set-password?token=${token}&newPassword=${newPassword}`,
      {}
    );
  }
}
