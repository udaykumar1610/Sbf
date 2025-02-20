// import { Component, OnInit } from '@angular/core';

// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { KithkinFormService } from '../../servicesForm/kithkin-form.service';

// @Component({
//   selector: 'app-kithkinlist',
//   standalone: true,
//   imports: [FormsModule,CommonModule],
//   templateUrl: './kithkinlist.component.html',
//   styleUrl: './kithkinlist.component.css'
// })
// export class KithkinlistComponent implements OnInit {

//   kithkinRecords: any[] = [];  // To store the data fetched from the backend
//   loading: boolean = false;    
//   errorMessage: string = ''; 
//   baseurl:any; 
//   url:any='http://localhost:5000'

//   constructor(private kithkinFormService: KithkinFormService) {}

//   ngOnInit(): void {
//     this.loadKithkinRecords();  // Fetch the data when the component is initialized
//   }

//   // Method to load all Kithkin records
//   loadKithkinRecords(): void {
//     this.loading = true;
//     this.kithkinFormService.getAll().subscribe(
//       (data) => {
//         this.kithkinRecords = data;  
//         this.baseurl=data.pdf_url;
//         console.log(this.baseurl);// Set the data to the records array
//         this.loading = false;
//       },
//       (error) => {
//         this.errorMessage = 'Error fetching records: ' + error.message;
//         this.loading = false;
//       }
//     );
//   }
//   }



import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { KithkinFormService } from '../../servicesForm/kithkin-form.service';

@Component({
  selector: 'app-kithkinlist',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './kithkinlist.component.html',
  styleUrl: './kithkinlist.component.css'
})
export class KithkinlistComponent implements OnInit {

  kithkinRecords: any[] = [];  // To store the data fetched from the backend
  loading: boolean = false;    
  errorMessage: string = ''; 
  baseurl: any; 
  url: any = 'http://localhost:5000'

  constructor(private kithkinFormService: KithkinFormService) {}

  ngOnInit(): void {
    this.loadKithkinRecords();  // Fetch the data when the component is initialized
  }

  // Method to load all Kithkin records
  loadKithkinRecords(): void {
    this.loading = true;
    this.kithkinFormService.getAll().subscribe(
      (data) => {
        this.kithkinRecords = data;  
        this.baseurl = data.pdf_url;
        console.log(this.baseurl); // Set the data to the records array
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching records: ' + error.message;
        this.loading = false;
      }
    );
  }

  // Method to update the status of a Kithkin record
  updateStatus(id: number, status: string): void {
    this.kithkinFormService.updateStatus(id, status).subscribe(
      (response) => {
        // Update the status of the record locally after a successful update
        const updatedRecord = this.kithkinRecords.find(record => record.id === id);
        if (updatedRecord) {
          updatedRecord.status = status; // Update the status
        }
        console.log('Status updated successfully', response);
      },
      (error) => {
        console.error('Error updating status', error);
      }
    );
  }
}


