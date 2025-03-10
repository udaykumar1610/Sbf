import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, ToastModule],
  providers: [MessageService],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  resetData = {
    hrms_id: '',
    mobilenumber: '',
    newPassword: '',
    confirmPassword: ''
  };

  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;
  isLoading: boolean = false;

  // Password validation pattern
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  mobilePattern = /^[0-9]{10}$/; // Mobile number should only contain digits and be 10 digits long
  hrmsIdPattern = /^[A-Za-z0-9]+$/; // HRMS ID should only contain letters and digits, no special characters

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}

  // Toggle password visibility
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }

  // Reset Password
  resetPassword() {
    // Check if any fields are empty
    if (!this.resetData.hrms_id || !this.resetData.mobilenumber || !this.resetData.newPassword || !this.resetData.confirmPassword) {
      this.messageService.add({ severity: 'warn', summary: 'Missing Fields', detail: 'All fields are required.' });
      return;
    }

    // HRMS ID validation: Only letters and digits, no special characters
    if (this.resetData.hrms_id.length !== 6 || !this.hrmsIdPattern.test(this.resetData.hrms_id)) {
      this.messageService.add({ severity: 'warn', summary: 'Invalid HRMS ID', detail: 'HRMS ID must be exactly 6 characters long and contain only letters and digits.' });
      return;
    }

    // Mobile Number validation: Only digits and 10 digits long
    if (!this.mobilePattern.test(this.resetData.mobilenumber)) {
      this.messageService.add({ severity: 'warn', summary: 'Invalid Mobile Number', detail: 'Mobile Number must be exactly 10 digits long and contain only numbers.' });
      return;
    }

    // Password validation
    if (!this.passwordPattern.test(this.resetData.newPassword)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Weak Password',
        detail: 'Password must contain at least one uppercase, one lowercase, one number, and one special character.'
      });
      return;
    }

    // Confirm Password validation
    if (this.resetData.newPassword !== this.resetData.confirmPassword) {
      this.messageService.add({ severity: 'error', summary: 'Mismatch', detail: 'Passwords do not match.' });
      return;
    }

    this.isLoading = true;

    this.authService.updatePassword(this.resetData).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/login']), 2000); // Redirect to login after success
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.message });
        this.isLoading = false;
      }
    });
  }
}
