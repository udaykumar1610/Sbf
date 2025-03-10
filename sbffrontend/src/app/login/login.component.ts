



import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink,ToastModule],
  providers:[MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { hrms_id: '', password: '' };
  errorMessage: string = '';
  isPasswordVisible: boolean = false;

  // Password pattern validation
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  constructor(private authService: AuthService, private router: Router,private messageService:MessageService) {}

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  login() {
    // Validate HRMS ID (exactly 6 characters)
    if (this.credentials.hrms_id.length !== 6) {
      this.errorMessage = 'HRMS ID must be exactly 6 characters long';
      return;
    }
  
    // Validate Password
    if (!this.passwordPattern.test(this.credentials.password)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid Credentials',
        detail: 'Login failed',
      });
      alert('Login failed');
      this.errorMessage =
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
      return;
    }
  
    this.authService.loginAndStoreData(this.credentials);
  
    // Optionally, if you want to directly handle the backend response in the component:
    this.authService.login(this.credentials).subscribe(
      (response) => {
        // Log the response or display it on the component
        console.log('Response from backend:', response);
        if(response.status='success'){

          this.messageService.add({
            severity: 'success',
            summary: 'Login Successful',
            detail: `Welcome, ${response.empname}`,
          });
        }
      },
      (error) => {
        console.error('Login error:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: error.message || 'Something went wrong!',
        });
      }
    );
  }
  
}

