import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ScholarshipService {
  private apiUrl = 'http://localhost:5000/api/scholar';  // Backend API URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Get HTTP headers with JWT token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    console.log("token",token);
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // Fetch all scholarships (Protected)
  getAllScholarships(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // Fetch a single scholarship by ID (Protected)
  getScholarshipById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Create a new scholarship (Protected)
  createScholarship(scholarshipData: any): Observable<any> {
    return this.http.post(this.apiUrl, scholarshipData, { headers: this.getAuthHeaders() });
  }

  // Update an existing scholarship (Protected)
  updateScholarship(id: number, scholarshipData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, scholarshipData, { headers: this.getAuthHeaders() });
  }

  // Delete a scholarship (Protected)
  deleteScholarship(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
