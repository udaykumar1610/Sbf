

import { Component } from '@angular/core';
import { ScholarshipService } from '../../scholarship.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scholar-dycpo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scholar-dycpo.component.html',
  styleUrl: './scholar-dycpo.component.css'
})
export class ScholarDYCPOComponent {

  scholarships: any[] = []; 
  errorMessage: string = '';  
  baseurl: any;
  loading: boolean = false;

  constructor(private scholarService: ScholarshipService) {}

  ngOnInit() {
    this.getAllScholars();
  }

  getAllScholars() {
    this.loading = true;
    this.scholarService.getAllScholarships().subscribe(
      (data) => {
        console.log("data :", data)
        this.scholarships = data.filter(
          (record: any) =>
          (  record.status === 'forwardBySPO' || record.status === 'rejectByDYCPO') 
        );
        // Add isActionTaken flag for each scholar
        this.scholarships.forEach(scholar =>{ scholar.isActionTaken = false;console.log(scholar.isActionTaken)});
        console.log("scholarships:",this.scholarships[0].isActionTaken);
      
        
        this.loading = false;
        this.baseurl = data.pdf_url;
      },
      (error) => {
        this.errorMessage = 'Error fetching scholarship data.';
        alert(this.errorMessage)
        console.error(error);
        this.loading = false;
      }
    );
  }

  updateStatus(id: number, status: string): void {
    this.scholarService.updateStatus(id, status).subscribe(
      (response) => {
        // Update the status of the record locally after a successful update
        const updatedRecord = this.scholarships.find(record => record.id === id);
        console.log("us:", updatedRecord);
        if (updatedRecord) {
          updatedRecord.status = status; 
          updatedRecord.isActionTaken = true; 
          console.log( updatedRecord.isActionTaken)
        }
        console.log('Status updated successfully', response);
        alert('Status updated successfully');
      },
      (error) => {
        console.error('Error updating status', error);
      }
    );
  }


}
