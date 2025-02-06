


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  umid: string | null = null;
  credentials = { identifier: '', password: '' }; // UMID or Email
  errorMessage: string = '';
  isPasswordVisible: boolean = false; 
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // this.umid = this.authService.umid ;
   
   
  }
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  // Perform login action
  login() {
    this.authService.loginAndStoreData(this.credentials);
    // this.umid=this.authService.umid;
    // console.log("uid",this.umid);
   
  }
}
