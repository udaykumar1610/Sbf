

// import { Component, OnInit } from '@angular/core';
// import { SchemesService } from '../schemes.service';
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-userschems',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './userschems.component.html',
//   styleUrls: ['./userschems.component.css']
// })
// export class UserschemsComponent implements OnInit {

//   schemes: any[] = [];  // List of all schemes
//   selectedScheme: any = null;  // Selected scheme details

//   constructor(private schemesService: SchemesService,private authservice:AuthService) {}

//   ngOnInit(): void {
//     this.loadSchemes();
    
//     //console.log(this.authservice.hrmsId);
//   }

//   // Fetch schemes from service
//   loadSchemes() {
//     this.schemesService.getAllSchemes().subscribe((data) => {
//       console.log(data)
//       this.schemes = data;
//     });
//   }

//   // Handle scheme selection from dropdown
//   onSchemeSelect(event: any) {
//     const selectedTitle = event.target.value;
//     // Find the scheme by title
//     this.selectedScheme = this.schemes.find(scheme => scheme.title === selectedTitle);
//   }

//   // Method to handle the click on the View Details button
//   viewSchemeDetails(scheme: any) {
//     console.log('Viewing Scheme Details for:', scheme.title);
//     // You can implement logic here to navigate or show more details.
//   }
// }



import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchemesService } from '../schemes.service';

@Component({
  selector: 'app-userschems',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userschems.component.html',
  styleUrls: ['./userschems.component.css']
})
export class UserschemsComponent implements OnInit {
  schemenames: any[] = [];  // Array to hold the names of schemes
  selectedSchemeName: string = '';  // The selected scheme name
  selectedSchemeDetails: any = null;  // Object to hold the details of the selected scheme
  schemes:any[]=[];

  constructor(private schemesService: SchemesService) {}

  ngOnInit(): void {
    this.getschemenames();  // Fetch scheme names on initialization
  }

  // Fetch only scheme names from the service
  getschemenames() {
    this.schemesService.getAllSchemes().subscribe((data) => {
      //console.log('Fetched Scheme Names:', data);
      this.schemenames = data;  // Set the fetched scheme names
    });
  }

  // Fetch scheme details based on selected scheme name
  onSchemeSelect(event: any) {
    const selectedSchemeName = event.target.value;
    this.getSchemeDetails(selectedSchemeName);
  }

  // Fetch the full scheme details from the service based on selected scheme
  getSchemeDetails(schemeName: string) {
    this.schemesService.getAllSchemes().subscribe((data) => {
      // Find the scheme by name
      this.selectedSchemeDetails = data.find((scheme: { scheme_name: string; }) => scheme.scheme_name === schemeName);
      console.log('Selected Scheme Details:', this.selectedSchemeDetails);
    });
  }

  // View full details of the selected scheme (this could be expanded further)
  viewSchemeDetails() {
    console.log('Viewing full details for:', this.selectedSchemeDetails);
    // Additional logic can be added here for navigating to another page or displaying detailed information
  }
}
