// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   imports: [],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {

// }


import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { identifier: '', password: '' };  // UMID or Email
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Perform login action
  login() {
    this.authService.login(this.credentials).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        const role = this.authService.getRole();
        
        if (role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/user-dashboard']);
        }
      },
      (err) => {
        this.errorMessage = 'Invalid credentials';
      }
    );
  }
}
