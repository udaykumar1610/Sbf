
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceGrantformService {
  private apiUrl = 'http://localhost:5000/api/maintenance';  // Adjust the base URL as needed

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(isFormData = false): HttpHeaders {
    const token = this.authService.getToken();
    let headersConfig = {
      Authorization: `Bearer ${token}`
    };
    return new HttpHeaders(headersConfig);
  }

  // Get all records
  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, { headers: this.getAuthHeaders() });
  }

  // Get record by ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Create a new record
  create(data: any, file?: File): Observable<any> {
    const formData = new FormData();
  
    // Append all form fields to FormData
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
  
    // Append file if it exists
    if (file) {
      formData.append('pdf_file', file);
    }
  
    return this.http.post<any>(this.apiUrl, formData, { headers: this.getAuthHeaders() });
  }

  // Update a record
  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data, { headers: this.getAuthHeaders() });
  }

   // Method to update the status of a scholarship record by ID
   updateStatus(id: number, status: string): Observable<any> {
    const url = `${this.apiUrl}/status/${id}`;
    const body = { status };
    return this.http.put(url, body, { headers: this.getAuthHeaders(true) });
  }


  updateRemarks(id: number, remarks: string, status: string): Observable<any> {


  
    const url = `${this.apiUrl}/remarks/${id}`;
    const body = { remarks ,status};
  
  
  
    return this.http.put(url, body, { headers: this.getAuthHeaders(true) });
  }
  
 

  // Delete a record
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
