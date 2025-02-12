// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class ScholarshipService {
//   private apiUrl = 'http://localhost:5000/api/scholar';  // Backend API URL

//   constructor(private http: HttpClient, private authService: AuthService) {}

//   // Get HTTP headers with JWT token
//   private getAuthHeaders(): HttpHeaders {
//     const token = this.authService.getToken();
//     console.log("token",token);
//     return new HttpHeaders({ Authorization: `Bearer ${token}` });
//   }

//   // Fetch all scholarships (Protected)
//   getAllScholarships(): Observable<any> {
//     return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
//   }

//   // Fetch a single scholarship by ID (Protected)
//   getScholarshipById(id: number): Observable<any> {
//     return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
//   }

//   // // Create a new scholarship (Protected)
//   // createScholarship(scholarshipData: any): Observable<any> {
//   //   return this.http.post(this.apiUrl, scholarshipData, { headers: this.getAuthHeaders() });
//   // }

  

//   // // Update an existing scholarship (Protected)
//   // updateScholarship(id: number, scholarshipData: any): Observable<any> {
//   //   return this.http.put(`${this.apiUrl}/${id}`, scholarshipData, { headers: this.getAuthHeaders() });
//   // }

//   createScholarship(scholarshipData: any, file: File | null): Observable<any> {
//     const formData = new FormData();
//     Object.keys(scholarshipData).forEach(key => {
//       formData.append(key, scholarshipData[key]);
//     });

//     if (file) {
//       formData.append('pdf', file);
//     }

//     return this.http.post(this.apiUrl, formData, { headers: this.getAuthHeaders() });
//   }

//   // Update an existing scholarship (with PDF file)
//   updateScholarship(id: number, scholarshipData: any, file: File | null): Observable<any> {
//     const formData = new FormData();
//     Object.keys(scholarshipData).forEach(key => {
//       formData.append(key, scholarshipData[key]);
//     });

//     if (file) {
//       formData.append('pdf', file);
//     }

//     return this.http.put(`${this.apiUrl}/${id}`, formData, { headers: this.getAuthHeaders() });
//   }


//   // Delete a scholarship (Protected)
//   deleteScholarship(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
//   }
// }


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


  // const headers = {
  //   'Authorization': `Bearer ${token}`,
  //   'Content-Type': 'application/json'
  // } as Record<string, string>;
  
  // Get HTTP headers with JWT token
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
    Object.keys(scholarshipData).forEach(key => {
      formData.append(key, scholarshipData[key]);
    });

    if (file) {
      formData.append('pdf', file);
    }

    return this.http.post(this.apiUrl, formData, { headers: this.getAuthHeaders(true) });
  }

  // Update an existing scholarship (with PDF file)
  updateScholarship(id: number, scholarshipData: any, file: File | null): Observable<any> {
    const formData = new FormData();
    Object.keys(scholarshipData).forEach(key => {
      formData.append(key, scholarshipData[key]);
    });

    if (file) {
      formData.append('pdf', file);
    }

    return this.http.put(`${this.apiUrl}/${id}`, formData, { headers: this.getAuthHeaders(true) });
  }

  // Delete a scholarship (Protected)
  deleteScholarship(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}

