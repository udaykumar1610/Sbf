



import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { KithkinFormService } from '../../servicesForm/kithkin-form.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { stat } from 'fs';
import { DialogModule } from 'primeng/dialog';



@Component({
  selector: 'app-kithkinsrdpo',
  standalone: true,
  imports: [FormsModule, CommonModule,ToastModule,DialogModule],
  providers: [ MessageService],
  templateUrl: './kithkinsrdpo.component.html',
  styleUrl: './kithkinsrdpo.component.css'
})
export class KithkinsrdpoComponent implements OnInit {

  kithkinRecords: any[] = [];  // To store the data fetched from the backend
  loading: boolean = false;    
  errorMessage: string = ''; 
  baseurl: any; 
  url: any = 'http://localhost:5000'
  isRejectModalVisible: boolean = false;  
  remarksText: string = ''; 
  selectedRecord: any;  

  constructor(private kithkinFormService: KithkinFormService,private messageService:MessageService) {}

  ngOnInit(): void {
    this.loadKithkinRecords();  // Fetch the data when the component is initialized
  }

  // Method to load all Kithkin records
  loadKithkinRecords(): void {
    this.loading = true;
    this.kithkinFormService.getAll().subscribe(
      (data) => {
        // Filter the records based on status
        this.kithkinRecords = data.filter((record:any) => record.status === 'approvedBySrdpo' || record.status === 'rejectBySrdpo' || record.status === 'forwardByDivisionClerk' );
        
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
  

  openRejectModal(record: any): void {
    this.selectedRecord = record;
    this.isRejectModalVisible = true;  // Show the modal
    this.remarksText = '';  // Clear previous remarks
  }
  submitRejectRemarks(): void {
    if (this.remarksText.trim() === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Remarks cannot be empty'
      });
      return;
    }
    
    const status = 'rejectBySrdpo';
    
    // Call the service to update remarks and status
    this.kithkinFormService.updateRemarks(this.selectedRecord.id, this.remarksText, status).subscribe(
      (response) => {
        // Update the status and remarks locally after a successful remarks update
        this.selectedRecord.status = status; // Update the status
        this.selectedRecord.remarks = this.remarksText; // Update remarks
        this.selectedRecord.isActionTaken = true;  // Mark the record as processed
        this.isRejectModalVisible = false;  // Close the modal
  
        // Find and update the record in the array
        const updatedRecord = this.kithkinRecords.find(record => record.id === this.selectedRecord.id);
        if (updatedRecord) {
          updatedRecord.status = this.selectedRecord.status;
          updatedRecord.remarks = this.selectedRecord.remarks;
          updatedRecord.isActionTaken = this.selectedRecord.isActionTaken;
        }
  
        // Show success message
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Remarks added and status updated successfully'
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error updating remarks: ' + error.message
        });
      }
    );
  }
  

  updateStatus(id: number, status: string): void {
    this.kithkinFormService.updateStatus(id, status).subscribe(
      (response) => {
        // Update the status of the record locally after a successful update
        const updatedRecord = this.kithkinRecords.find(record => record.id === id);
        if (updatedRecord) {
          updatedRecord.status = status; // Update the status
          updatedRecord.isActionTaken = true;
        }
  
        // Show success message
        if (response.status === "success") {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Status updated successfully'
          });
        }
  
        console.log('Status updated successfully', response);
      },
      (error) => {
        if (error.status === "success") {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Error updating status',
          });
        }
        console.error('Error updating status', error);
      }
    );
  }
}