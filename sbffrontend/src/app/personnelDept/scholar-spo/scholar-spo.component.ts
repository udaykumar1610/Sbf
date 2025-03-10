import { Component } from '@angular/core';
import { ScholarshipService } from '../../scholarship.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-scholar-spo',
  standalone: true,
  imports: [CommonModule,ToastModule,FormsModule,DialogModule],
  providers: [MessageService],
  templateUrl: './scholar-spo.component.html',
  styleUrl: './scholar-spo.component.css'
})
export class ScholarSPOComponent {

  scholarships: any[] = []; 
  errorMessage: string = '';  
  baseurl: any;
  loading: boolean = false;
  isRejectModalVisible: boolean = false;  
  remarksText: string = ''; 
  selectedRecord: any;  

  constructor(private scholarService: ScholarshipService,private messageService:MessageService) {}

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
          (  record.status === 'forwardByPersonnelDept' || record.status === 'rejectBySPO') 
        );
        // Add isActionTaken flag for each scholar
        this.scholarships.forEach(scholar => scholar.isActionTaken = false);
        this.loading = false;
        this.baseurl = data.pdf_url;
      },
      (error) => {
        this.errorMessage = 'Error fetching scholarship data.';
        if (typeof window !== 'undefined') {
          alert(this.errorMessage);
        }
        
        console.error(error);
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
    
    const status = 'rejectBySPO';
    
    // Call the service to update remarks and status
    this.scholarService.updateRemarks(this.selectedRecord.id, this.remarksText, status).subscribe(
      (response) => {
        // Update the status and remarks locally after a successful remarks update
        this.selectedRecord.status = status; // Update the status
        this.selectedRecord.remarks = this.remarksText; // Update remarks
        this.selectedRecord.isActionTaken = true;  // Mark the record as processed
        this.isRejectModalVisible = false;  // Close the modal
  
        // Find and update the record in the array
        const updatedRecord = this.scholarships.find(record => record.id === this.selectedRecord.id);
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
