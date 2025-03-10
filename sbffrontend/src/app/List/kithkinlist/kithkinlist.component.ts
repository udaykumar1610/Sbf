




import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { KithkinFormService } from '../../servicesForm/kithkin-form.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RouterOutlet } from '@angular/router';
import { DialogModule } from 'primeng/dialog'; 


@Component({
  selector: 'app-kithkinlist',
  standalone: true,
  imports: [FormsModule, CommonModule, ToastModule,RouterOutlet,DialogModule],
  providers: [MessageService],
  templateUrl: './kithkinlist.component.html',
  styleUrls: ['./kithkinlist.component.css']
})
export class KithkinlistComponent implements OnInit {

  kithkinRecords: any[] = [];  // To store the data fetched from the backend
  loading: boolean = false;
  errorMessage: string = '';
  isRejectModalVisible: boolean = false;  
  remarksText: string = ''; 
  selectedRecord: any;  


  constructor(
    private kithkinFormService: KithkinFormService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadKithkinRecords();  // Fetch the data when the component is initialized
    this.submitRejectRemarks();
  }
  loadKithkinRecords(): void {
    this.loading = true;
    this.kithkinFormService.getAll().subscribe(
      (data) => {


        // this.kithkinRecords = data

        // Filter records where status is 'Submitted' or 'reject'
        this.kithkinRecords = data.filter(
          (record: any) =>
            record.status === 'Submitted' || record.status === 'reject'
        );
        
        // Add a property `isActionTaken` to each record
        this.kithkinRecords.forEach(kithkinRecord => kithkinRecord.isActionTaken = false);
        
     
        // if (data.length > 0) {
        //   this.baseurl = data[0].pdf_url;  // Assuming `pdf_url` is available in the first record
        // }
        
        // console.log(this.baseurl); // Log the pdf_url or any other relevant information
        
        // Set loading to false after processing
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
    
    const status = 'reject';
    
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