import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicalAssistanceService {
  private apiUrl = 'http://localhost:5000/api/medical';  // Adjust the base URL as needed

  constructor( private http: HttpClient,private authService:AuthService){}

  private getAuthHeaders(isFormData = false): HttpHeaders {
      const token = this.authService.getToken();
      let headersConfig = {
        Authorization: `Bearer ${token}`
      };
  
      // Only set Content-Type if not sending FormData (Browser sets it automatically for FormData)
      // if (!isFormData) {
      //   headersConfig['Content-Type'] = 'application/json';
      // }
  
      return new HttpHeaders(headersConfig);
    }

  // Get all records
  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`,{ headers: this.getAuthHeaders() });
  }

  // Get record by ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`,{ headers: this.getAuthHeaders() });
  }

  // Get records by status
  getByStatus(status: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/status/${status}`,{ headers: this.getAuthHeaders() });
  }

  // Create a new record
  // create(data: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, data,{ headers: this.getAuthHeaders() });
  // }

  create(data: any, file?: File): Observable<any> {
    const formData = new FormData();
  
    // Append all form fields to FormData
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
  
    // Append file if it exists
    if (file) {
      formData.append('pdfFile', file);
    }
  
    return this.http.post<any>(this.apiUrl, formData, { headers: this.getAuthHeaders() });
  }
  

  // Update a record
  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data,{ headers: this.getAuthHeaders() });
  }

  // Delete a record
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`,{ headers: this.getAuthHeaders() });
  }
}
