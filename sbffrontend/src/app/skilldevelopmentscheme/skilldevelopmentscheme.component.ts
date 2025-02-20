import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SchemesService } from '../schemes.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-skilldevelopmentscheme',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './skilldevelopmentscheme.component.html',
  styleUrl: './skilldevelopmentscheme.component.css'
})
export class SkilldevelopmentschemeComponent {
  skillDevelopmentSchemes: any[] = []; 
  isAuthenticated:boolean=false; // Array to hold the skill development schemes

  constructor(private schemesService: SchemesService,private router:Router,private authService:AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((status) => {
      this.isAuthenticated = status;
    });
    this.loadSkillDevelopmentSchemes();  // Fetch skill development schemes when component initializes
  }

  // Load all skill development schemes from the API
  loadSkillDevelopmentSchemes() {
    this.schemesService.getAllSchemes().subscribe((data) => {
     
      this.skillDevelopmentSchemes = data.filter((scheme: { scheme_name: string; }) => scheme.scheme_name === 'occupational skills development');
      //console.log('Skill Development Schemes:', this.skillDevelopmentSchemes);  // For debugging
    });
  }

  apply(){
    if(this.isAuthenticated){
      this.router.navigate(['/user-dashboard']);
      console.log(this.isAuthenticated);
    }else{

      this.router.navigate(['/login']);
    }
  }

}
