import { Component } from '@angular/core';
import { SchemesService } from '../schemes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sicknessscheme',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './sicknessscheme.component.html',
  styleUrl: './sicknessscheme.component.css'
})
export class SicknessschemeComponent {
  sicknessSchemes: any[] = [];  // Array to hold the sickness schemes
  isAuthenticated: boolean = false; 
  constructor(private schemesService: SchemesService,private router:Router,private authService:AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((status) => {
      this.isAuthenticated = status;
    });
    this.loadSicknessSchemes();  // Fetch sickness schemes when component initializes
  }

  // Load all sickness schemes from the API
  loadSicknessSchemes() {
    this.schemesService.getAllSchemes().subscribe((data) => {
      // Filter or modify data as needed to display only sickness schemes
      // Assuming we have a property `scheme_type` to distinguish sickness schemes
      this.sicknessSchemes = data.filter((scheme: { scheme_name: string; }) => scheme.scheme_name === 'Relief of distress and sickness scheme');
      //console.log('Sickness Schemes:', this.sicknessSchemes);  // For debugging
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
