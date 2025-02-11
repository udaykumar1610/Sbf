import { Component } from '@angular/core';
import { SchemesService } from '../schemes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { Router } from 'express';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-educationscheme',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './educationscheme.component.html',
  styleUrl: './educationscheme.component.css'
})
export class EducationschemeComponent {
  educationSchemes: any[] = [];  // Array to hold the education schemes


  constructor(private schemesService: SchemesService,  private router: Router,) {}

  ngOnInit(): void {
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
    this.router.navigate(['/login']);
  }
}
