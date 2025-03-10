import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DenturesService } from '../../dentures.service';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dentures-div',
  standalone: true,
  imports: [ToastModule,CommonModule,DialogModule,FormsModule],
  providers: [MessageService],
  templateUrl: './dentures-div.component.html',
  styleUrl: './dentures-div.component.css'
})
export class DenturesDivComponent {
   dentures: any[] = []; // To hold the scholarship data
        errorMessage: string = '';  // To hold any error message if occurs
        baseurl:any;
        isRejectModalVisible: boolean = false;  
        remarksText: string = ''; 
        selectedRecord: any;  
        loading: boolean = true;
      
      
        constructor(private DenturesService: DenturesService,private messageService:MessageService) {}
      
        ngOnInit(): void {
          this.getAllScholars();
        }
      
        // Method to fetch all scholarships
        getAllScholars() {
          this.DenturesService.getAllDentures().subscribe(
            (data) => {
              console.log("Data fetched:", data);
              
              // this.dentures = data;
              this.dentures = data.filter(
                (record: any) =>
                (  record.status === 'forwardBySupervisor' || record.status === 'rejectByDivisionClerk'  ) 
              );
              this.dentures.forEach(denture => denture.isActionTaken = false);
      
              this.baseurl=data.pdf_url;
              this.loading = false;
            },
            (error) => {
              this.errorMessage = 'Error fetching spectacles data.';
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
          
          const status = 'rejectByDivisionClerk';
          
          // Call the service to update remarks and status
          this.DenturesService.updateRemarks(this.selectedRecord.id, this.remarksText, status).subscribe(
            (response) => {
              // Update the status and remarks locally after a successful remarks update
              this.selectedRecord.status = status; // Update the status
              this.selectedRecord.remarks = this.remarksText; // Update remarks
              this.selectedRecord.isActionTaken = true;  // Mark the record as processed
              this.isRejectModalVisible = false;  // Close the modal
        
              // Find and update the record in the array
              const updatedRecord = this.dentures.find(record => record.id === this.selectedRecord.id);
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
        this.DenturesService.updateStatus(id, status).subscribe(
          (response) => {
            // Update the status of the record locally after a successful update
            const updatedRecord = this.dentures.find(record => record.id === id);
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
    
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
  
  
  


