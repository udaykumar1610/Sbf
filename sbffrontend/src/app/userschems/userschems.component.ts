

import { Component, OnInit } from '@angular/core';
import { SchemesService } from '../schemes.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-userschems',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userschems.component.html',
  styleUrls: ['./userschems.component.css']
})
export class UserschemsComponent implements OnInit {

  schemes: any[] = [];  // List of all schemes
  selectedScheme: any = null;  // Selected scheme details

  constructor(private schemesService: SchemesService,private authservice:AuthService) {}

  ngOnInit(): void {
    this.loadSchemes();
    console.log(this.authservice.umid);
  }

  // Fetch schemes from service
  loadSchemes() {
    this.schemesService.getAllSchemes().subscribe((data) => {
      this.schemes = data;
    });
  }

  // Handle scheme selection from dropdown
  onSchemeSelect(event: any) {
    const selectedTitle = event.target.value;
    // Find the scheme by title
    this.selectedScheme = this.schemes.find(scheme => scheme.title === selectedTitle);
  }

  // Method to handle the click on the View Details button
  viewSchemeDetails(scheme: any) {
    console.log('Viewing Scheme Details for:', scheme.title);
    // You can implement logic here to navigate or show more details.
  }
}
