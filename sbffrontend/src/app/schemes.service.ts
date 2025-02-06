
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SchemesService {
  private apiUrl = 'http://localhost:5000/api/schemes';  // Backend API URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Get HTTP headers with JWT token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // Fetch all schemes (Public API)
  getAllSchemes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Fetch a single scheme by ID (Public API)
  getSchemeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Create a new scheme (Requires Authentication)
  createScheme(schemeData: any): Observable<any> {
    return this.http.post(this.apiUrl, schemeData, { headers: this.getAuthHeaders() });
  }

  // Update an existing scheme (Requires Authentication)
  updateScheme(id: number, schemeData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, schemeData, { headers: this.getAuthHeaders() });
  }

  // Delete a scheme (Requires Authentication)
  deleteScheme(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
