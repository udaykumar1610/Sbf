import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
 // Make sure you set the base URL in environment.ts

@Injectable({
  providedIn: 'root',
})
export class SpectaclesFormService {
  private apiUrl = 'http://localhost:5000/api/spectacles';

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

  getAllSpectacles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`,{ headers: this.getAuthHeaders() });
  }

  getSpectacleById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`,{ headers: this.getAuthHeaders() });
  }

  getSpectaclesByStatus(status: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/status/${status}`,{ headers: this.getAuthHeaders() });
  }

  // Create Spectacle
  createSpectacle(data: any, file: any): Observable<any> {
    const formData = new FormData();
    
    // Append all form fields to FormData
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
  
    // Append file if it exists
    if (file) {
      formData.append('pdf_file', file); // Ensure the form field matches the backend
    }
  
    return this.http.post<any>(this.apiUrl, formData, { headers: this.getAuthHeaders(true) });
  }
  

  // Update Spectacle
  updateSpectacle(id: number, data: any, file?: File): Observable<any> {
    const formData = new FormData();
    
    // Append all form fields to FormData
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    // Append file if it exists
    if (file) {
      formData.append('pdfFile', file);
    }
    
    return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
  }
  
 

  deleteSpectacle(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`,{ headers: this.getAuthHeaders() });
  }
}
