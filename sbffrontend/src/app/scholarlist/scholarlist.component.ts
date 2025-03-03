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
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-scholarlist',
    standalone: true,
    imports: [CommonModule,ToastModule],
    providers:[MessageService],
    templateUrl: './scholarlist.component.html',
    styleUrl: './scholarlist.component.css'
  })
export class ScholarlistComponent implements OnInit {
  scholarships: any[] = []; // To hold the scholarship data
  errorMessage: string = '';  // To hold any error message if occurs
  baseurl:any;

  constructor(private scholarService: ScholarshipService,private messageService:MessageService) {}

  ngOnInit(): void {
    this.getAllScholars();
  }

  // Method to fetch all scholarships
  getAllScholars() {
    this.scholarService.getAllScholarships().subscribe(
      (data) => {
        // console.log("Data fetched:", data);
        
        // this.scholarships = data;
        this.scholarships = data.filter(
          (record: any) =>
          (  record.status === 'Submitted' || record.status === 'reject') 
        );
        this.scholarships.forEach(scholar => scholar.isActionTaken = false);

        this.baseurl=data.pdf_url;
      },
      (error) => {
        this.errorMessage = 'Error fetching scholarship data.';
        console.error(error);
      }
    );
  }



  updateStatus(id: number, status: string): void {
    this.scholarService.updateStatus(id, status).subscribe(
      (response) => {
        // Update the status of the record locally after a successful update
        const updatedRecord = this.scholarships.find(record => record.id === id);
        if (updatedRecord) {
          updatedRecord.status = status; // Update the status
          updatedRecord.isActionTaken = true; // Mark as action taken
        }
        // alert("Status updated successfully");
        this.messageService.add({
          severity: 'success',
          summary: 'Status updated successfully',
          detail: ` ${response.message}`,
        });
        console.log('Status updated successfully', response);
      },
      (error) => {
        // alert("Error updating status");
        this.messageService.add({
          severity: 'error',
          summary: 'Error updating status',
          detail: error.message || 'Something went wrong!',
        });
        console.error('Error updating status', error);
      }
    );
  }
}
