import { Component } from '@angular/core';
import { SchemesService } from '../schemes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sicknessscheme',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './sicknessscheme.component.html',
  styleUrl: './sicknessscheme.component.css'
})
export class SicknessschemeComponent {
  sicknessSchemes: any[] = [];  // Array to hold the sickness schemes

  constructor(private schemesService: SchemesService,private router:Router) {}

  ngOnInit(): void {
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
    this.router.navigate(['/login']);
  }

}
