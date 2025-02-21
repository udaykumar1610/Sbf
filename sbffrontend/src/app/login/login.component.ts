

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { hrms_id: '', password: '' };
  errorMessage: string = '';
  isPasswordVisible: boolean = false;

  // Password pattern validation
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  constructor(private authService: AuthService, private router: Router) {}

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
      
      alert("login failed");
      this.errorMessage =
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
      return;
    }

    this.authService.loginAndStoreData(this.credentials);
    //alert("login success")
  }
}

