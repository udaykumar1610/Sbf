import { Component } from '@angular/core';
import { SchemesService } from '../schemes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { Router } from 'express';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-educationscheme',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './educationscheme.component.html',
  styleUrl: './educationscheme.component.css'
})
export class EducationschemeComponent {
  educationSchemes: any[] = [];  // Array to hold the education schemes

  isAuthenticated: boolean = false; 
  constructor(private schemesService: SchemesService,  private router: Router,private authService:AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((status) => {
      this.isAuthenticated = status;
    });
    this.loadEducationSchemes();  // Fetch education schemes when component initializes
  }

  // Load all education schemes from the API
  loadEducationSchemes() {
    this.schemesService.getAllSchemes().subscribe((data) => {
      // Filter or modify data as needed to display only education schemes
      // Assuming we have a property `scheme_type` to distinguish education schemes
      this.educationSchemes = data.filter((scheme: { scheme_name: string; }) => scheme.scheme_name === 'Education Scheme');
     // console.log('Education Schemes:', this.educationSchemes);  // For debugging
    });
  }


  apply(){
    if(this.isAuthenticated){
      this.router.navigate(['/user-dashboard']);
      console.log(this.isAuthenticated)
    }else{

      this.router.navigate(['/login']);
    }
  }
}
