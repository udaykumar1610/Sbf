


import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ScholarshipService } from '../../scholarship.service';

@Component({
    selector: 'app-scholardiv',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './scholardiv.component.html',
    styleUrl: './scholardiv.component.css'
  })
export class ScholardivComponent implements OnInit {
  scholarships: any[] = []; // To hold the scholarship data
  errorMessage: string = '';  // To hold any error message if occurs
  baseurl:any;
  loading: boolean=false;

  constructor(private scholarService: ScholarshipService) {}

  ngOnInit(): void {
    this.getAllScholars();
  }

  // Method to fetch all scholarships
  getAllScholars() {
    this.loading = true;
    this.scholarService.getAllScholarships().subscribe(
      (data) => {
        this.scholarships = data.filter((record:any) => record.status === 'forwardBySupervisor' || record.status === 'rejectByDivisionClerk');
        this.scholarships.forEach(scholar => scholar.isActionTaken = false);
        this.loading = false;
        this.baseurl=data.pdf_url;
      },
      (error) => {
        this.errorMessage = 'Error fetching scholarship data.';
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
        if (updatedRecord) {
          updatedRecord.status = status; // Update the status
          updatedRecord.isActionTaken = true;
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
