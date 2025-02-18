import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root',
})
export class FamilyDetailsService {
 private apiUrl = 'http://localhost:5000/api/familyDetails'; // Adjust the base URL as needed
 // private apiUrl = 'http://10.51.3.12:5000/api/familyDetails'; // Adjust the base URL as needed

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(isFormData = false): HttpHeaders {
    const token = this.authService.getToken();
    let headersConfig: any = {
      Authorization: `Bearer ${token}`,
    };

    if (!isFormData) {
      headersConfig['Content-Type'] = 'application/json';
    }

    return new HttpHeaders(headersConfig);
  }

  // Get all FamilyDetails records
  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Get FamilyDetails record by ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Get FamilyDetails records by Status
  getByStatus(status: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/status/${status}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Create a new FamilyDetails record
  create(data: any, file?: File): Observable<any> {
    console.log("service data",data);
    const formData = new FormData();

    // Append all form fields to FormData
    // Object.keys(data).forEach((key) => {
    //   formData.append(key, data[key]);
    // });


    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (Array.isArray(value)) {
        // If the value is an array, add it as a JSON string
        formData.append(key, JSON.stringify(value));
      } else {
        // Append the key-value pair to FormData
        formData.append(key, value);
      }
    });

   



    // formData.append(data)
    // Append file if it exists
    if (file) {
      formData.append('pdf_file', file);
    }

    return this.http.post<any>(this.apiUrl, formData, {
      headers: this.getAuthHeaders(true),
    });
  }

  


  // Update a FamilyDetails record
  update(id: number, data: any, file?: File): Observable<any> {
    const formData = new FormData();

    // Append all form fields to FormData
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    // Append file if it exists
    if (file) {
      formData.append('pdf_file', file);
    }

    return this.http.put<any>(`${this.apiUrl}/${id}`, formData, {
      headers: this.getAuthHeaders(true),
    });
  }

  // Delete a FamilyDetails record
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
