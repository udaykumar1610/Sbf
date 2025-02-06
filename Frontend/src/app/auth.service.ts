// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';  // Backend API URL

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {}

  // Register a new user
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // User login with UMID or Email
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Logout function
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  // Get the role of the authenticated user
  getRole(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.role;
  }
}
