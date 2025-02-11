

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { Observable, BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:5000/api/auth'; // Backend API URL
//   private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null); // Store user info
//   public currentUser: Observable<any> = this.currentUserSubject.asObservable();
//   private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // Emit authentication status
//   public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable(); // Observable for navbar component
// public umid:any=null;
//   constructor(
//     private http: HttpClient,
//     private router: Router,
//     private jwtHelper: JwtHelperService
//   ) {}

//   // Register a new user
//   register(userData: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, userData);
//   }

//   // User login with UMID or Email
//   login(credentials: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/login`, credentials);
//   }

//   // Handle login logic
//   loginAndStoreData(credentials: any) {
//     return this.login(credentials).subscribe(
//       (res: any) => {
//         // Store token in local storage
//         localStorage.setItem('token', res.token);

//         // Store UMID or user info
//         this.currentUserSubject.next(res.user); // Assuming 'res.user' contains user info, including UMID
//         this.isAuthenticatedSubject.next(true);  // Emit that the user is authenticated
//                const role = this.getRole();
        
//         if (role === 'admin') {
//           this.router.navigate(['/admin-dashboard']);
//         } else {
//           this.router.navigate(['/user-dashboard']);
//         }
//         this.umid = res.umid;
//         console.log("auth",this.umid);
//       },

      
//       (err) => {
//         console.error('Login error:', err);
//         throw err;
//       }
//     );
//   }

//   // Logout function
//   logout() {
//     localStorage.removeItem('token');
//     this.currentUserSubject.next(null); // Reset user data
//     this.isAuthenticatedSubject.next(false); // Emit that the user is logged out
//     this.router.navigate(['/login']);
//   }

//   // Get the JWT token from localStorage
//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//    isAuthenticated(): boolean {
//     // Only check localStorage in the browser
//     if (typeof window !== 'undefined' && window.localStorage) {
//       const token = localStorage.getItem('token');
//       return token ? !this.jwtHelper.isTokenExpired(token) : false;
//     }
//     return false;
//   }

//   // Get user information (e.g., UMID) stored after login
//   getUserInfo(): any {
//     return this.currentUserSubject.value; // Access the stored user data
//   }


//     getRole(): string {
//     if (typeof window !== 'undefined' && window.localStorage) {
//       const token = localStorage.getItem('token');
//       if (!token) return '';

//       const decodedToken = this.jwtHelper.decodeToken(token);
//       return decodedToken.role;
//     }
//     return '';
//   }
// }



import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; // Backend API URL
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser: Observable<any> = this.currentUserSubject.asObservable();
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  public hrmsId: any = null;
  public t:any=null;


  private apiUrl1 = 'http://localhost:5000/api/user/hrms'; 
  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    if (typeof window !== 'undefined' && window.localStorage) {
    const token = this.getToken();
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.isAuthenticatedSubject.next(true);
      this.loadUserData();
    }}
  }
 private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }


getHrmsData(hrms_id:String): Observable<any> {
  return this.http.get(`${this.apiUrl1}/${hrms_id}`, { headers: this.getAuthHeaders() } );
}

  // Register a new user
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Login with HRMS ID
  


  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      catchError((error) => {
        // Handle errors from the backend
        return throwError(() => new Error(error.error.message || 'Backend error'));
      })
    );
  }

  // Handle login logic
  loginAndStoreData(credentials: any) {
    this.login(credentials).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('hrmsId',res.hrms_id)

        // Store HRMS ID and user info
        this.currentUserSubject.next(res.user);
        this.isAuthenticatedSubject.next(true);
        this.hrmsId = res.hrms_id;

        console.log('HRMS ID:', this.hrmsId);

        // Navigate based on role
        const role = this.getRole();
        if (role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/user-dashboard']);
        }
      },
      (err) => {
        
        console.error('Login error:', err);
      }
    );
  }

  // Logout function
  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
     return token ? !this.jwtHelper.isTokenExpired(token) : false;
    //  this.t = this.jwtHelper.isTokenExpired(token) 
    //  if(this.t){
    //   return !this.router.navigate(['/login'])
     //}
    }
    return false;
  }

  // Get role from JWT token
  getRole(): string {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      if (!token) return '';

      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.role;
    }
    return '';
  }


  private loadUserData() {
    if (typeof window !== 'undefined' && window.localStorage) {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.currentUserSubject.next(decodedToken.user);
      this.hrmsId = decodedToken.hrms_id;
    }
  }
  return "";
}
}

