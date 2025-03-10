import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DenturesService {
  private apiUrl = 'http://localhost:5000/api/dentures'; // Adjust this to your backend URL

  constructor(private http: HttpClient,private authService:AuthService) {}

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

  // Create new denture entry
  createDenture(dentureData: any, pdfFile: File): Observable<any> {
    const formData = new FormData();

    // Append all fields to FormData
    for (const key in dentureData) {
      if (dentureData.hasOwnProperty(key)) {
        formData.append(key, dentureData[key]);
      }
    }

    // Append the file
    if (pdfFile) {
      formData.append('pdfFile', pdfFile);
    }

    return this.http.post(`${this.apiUrl}/`, formData,{ headers: this.getAuthHeaders() });
  }

  // Get all dentures
  getAllDentures(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`, { headers: this.getAuthHeaders() });
  }

  // Get dentures by status
  getDenturesByStatus(status: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/status/${status}`,{ headers: this.getAuthHeaders() });
  }

  // Get single denture by ID
  getDentureById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`,{ headers: this.getAuthHeaders() });
  }

  // Update denture
  updateDenture(id: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedData,{ headers: this.getAuthHeaders() });
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


  // Delete denture
  deleteDenture(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`,{ headers: this.getAuthHeaders() });
  }
}
