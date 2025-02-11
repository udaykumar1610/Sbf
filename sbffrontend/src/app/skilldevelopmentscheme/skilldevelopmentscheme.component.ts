import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SchemesService } from '../schemes.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-skilldevelopmentscheme',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './skilldevelopmentscheme.component.html',
  styleUrl: './skilldevelopmentscheme.component.css'
})
export class SkilldevelopmentschemeComponent {
  skillDevelopmentSchemes: any[] = [];  // Array to hold the skill development schemes

  constructor(private schemesService: SchemesService,private router:Router) {}

  ngOnInit(): void {
    this.loadSkillDevelopmentSchemes();  // Fetch skill development schemes when component initializes
  }

  // Load all skill development schemes from the API
  loadSkillDevelopmentSchemes() {
    this.schemesService.getAllSchemes().subscribe((data) => {
      // Filter or modify data as needed to display only skill development schemes
      // Assuming we have a property `scheme_type` to distinguish skill development schemes
      this.skillDevelopmentSchemes = data.filter((scheme: { scheme_name: string; }) => scheme.scheme_name === 'occupational skills development');
      //console.log('Skill Development Schemes:', this.skillDevelopmentSchemes);  // For debugging
    });
  }

  apply(){
    this.router.navigate(['/login']);
    
  }

}
