



import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { KithkinFormService } from '../../servicesForm/kithkin-form.service';



@Component({
  selector: 'app-kithkinsrdpo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './kithkinsrdpo.component.html',
  styleUrl: './kithkinsrdpo.component.css'
})
export class KithkinsrdpoComponent implements OnInit {

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
        // Filter the records based on status
        this.kithkinRecords = data.filter((record:any) => record.status === 'approvedBySrdpo' || record.status === 'rejectBySRDPO');
        
        console.log(this.kithkinRecords); // Display filtered records
        this.kithkinRecords.forEach(record => record.isActionTaken = false);
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
          updatedRecord.isActionTaken = true;
        }
        alert("Status updated successfully");
        console.log('Status updated successfully', response);
      },
      (error) => {
        alert("Error updating status");
        console.error('Error updating status', error);
      }
    );
  }
}


