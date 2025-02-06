// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-register',
//   imports: [],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'
// })
// export class RegisterComponent {

// }


import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userData = { umid: '', email: '', password: '', confirmPassword: '', role: 'user' };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Register a new user
  register() {
    this.authService.register(this.userData).subscribe(
      () => {
        this.successMessage = 'Registration successful. Please login.';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      () => {
        this.errorMessage = 'Registration failed';
      }
    );
  }
}
