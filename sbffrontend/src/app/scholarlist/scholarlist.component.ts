// import { Component } from '@angular/core';
// import { ScholarshipService } from '../scholarship.service';

// @Component({
//   selector: 'app-scholarlist',
//   standalone: true,
//   imports: [],
//   templateUrl: './scholarlist.component.html',
//   styleUrl: './scholarlist.component.css'
// })
// export class ScholarlistComponent {


//   constructor(private scholarService:ScholarshipService){}

//   ngOnInit(): void {
//     this.getAllScholars();
//   }


//   getAllScholars(){
//     this.scholarService.getAllScholarships().subscribe((data)=>{
//       console.log("data:",data);
//     })
//   }

// }
import { Component, OnInit } from '@angular/core';
import { ScholarshipService } from '../scholarship.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-scholarlist',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './scholarlist.component.html',
    styleUrl: './scholarlist.component.css'
  })
export class ScholarlistComponent implements OnInit {
  scholarships: any[] = []; // To hold the scholarship data
  errorMessage: string = '';  // To hold any error message if occurs
  baseurl:any;

  constructor(private scholarService: ScholarshipService) {}

  ngOnInit(): void {
    this.getAllScholars();
  }

  // Method to fetch all scholarships
  getAllScholars() {
    this.scholarService.getAllScholarships().subscribe(
      (data) => {
        console.log("Data fetched:", data);
        this.scholarships = data; // Assign the fetched data to scholarships array
        this.baseurl=data.pdf_url;
      },
      (error) => {
        this.errorMessage = 'Error fetching scholarship data.';
        console.error(error);
      }
    );
  }
}
