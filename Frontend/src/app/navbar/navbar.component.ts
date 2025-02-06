
import { RouterLink, RouterOutlet } from '@angular/router';


import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';  // Import AuthService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet,RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;  // Track authentication status

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();  
    // Check if user is authenticated on page load
   
  }

  // Function to log out the user
  logout() {
    console.log(this.isAuthenticated);
    this.authService.logout();
    this.isAuthenticated = false;  // Set authentication status to false after logout
  }
}
