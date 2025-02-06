// import { Component, OnInit } from '@angular/core';
// import { RouterLink, RouterOutlet } from '@angular/router';
// import { AuthService } from '../auth.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-navbar',
//   standalone: true,
//   imports: [RouterLink, RouterOutlet, CommonModule],
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css']
// })
// export class NavbarComponent implements OnInit {
//   isAuthenticated: boolean = false;  // Track authentication status

//   constructor(private authService: AuthService) {}

//   ngOnInit(): void {
//     this.checkAuthenticationStatus();
//   }

//   // Check if the user is authenticated on page load or after login/logout
//   checkAuthenticationStatus(): void {
//     this.isAuthenticated = this.authService.isAuthenticated();
//   }

//   // Function to log out the user
//   logout(): void {
//     this.authService.logout();
//     this.checkAuthenticationStatus();  // Re-check authentication status after logout
//   }
// }


import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;  // Track authentication status

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to the authentication status
    this.authService.isAuthenticated$.subscribe((status) => {
      this.isAuthenticated = status;
    });
  }

  // Function to log out the user
  logout(): void {
    this.authService.logout();
  }
}
