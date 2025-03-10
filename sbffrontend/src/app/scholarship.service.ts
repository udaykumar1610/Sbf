



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ScholarshipService {
  private apiUrl = 'http://localhost:5000/api/scholar';  // Backend API URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Get HTTP headers with JWT token
  // private getAuthHeaders(isFormData = false): HttpHeaders {
  //   let token:any;
    
  //   if( typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'){
      
  //      token = this.authService.getToken();
  //   }
  //   // if(token==null){
  //   //   this.authService.logout();
  //   // }
  //   console.log("scholar service token:",this.authService.getToken())
  //   let headersConfig: Record<string, string> = {
  //     Authorization: `Bearer ${token}`,
  //   };

  //   // Only set Content-Type if not sending FormData (Browser sets it automatically for FormData)
  //   if (!isFormData) {
  //     headersConfig['Content-Type'] = 'application/json';
  //   }

  //   return new HttpHeaders(headersConfig);
  // }


  private getAuthHeaders(isFormData = false): HttpHeaders {
    const token = this.authService.getToken();
    console.log("scholar token! :",token);
    let headersConfig: any = {
      Authorization: `Bearer ${token}`
    };

    if (!isFormData) {
      headersConfig['Content-Type'] = 'application/json';
    }

    return new HttpHeaders(headersConfig);
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
  createScholarship(scholarshipData: any, file: File | null): Observable<any> {
    const formData = new FormData();
    Object.keys(scholarshipData).forEach((key) => {
      formData.append(key, scholarshipData[key]);
    });

    if (file) {
      formData.append('pdf', file);
    }

    return this.http.post(this.apiUrl, formData, { headers: this.getAuthHeaders(true) });
  }

  // Update an existing scholarship (with PDF file)
  updateScholarship(
    id: number,
    scholarshipData: any,
    file: File | null
  ): Observable<any> {
    const formData = new FormData();
    Object.keys(scholarshipData).forEach((key) => {
      formData.append(key, scholarshipData[key]);
    });

    if (file) {
      formData.append('pdf', file);
    }

    return this.http.put(`${this.apiUrl}/${id}`, formData, { headers: this.getAuthHeaders(true) });
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
  

  // Delete a scholarship (Protected)
  deleteScholarship(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
