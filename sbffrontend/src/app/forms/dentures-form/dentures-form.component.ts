





import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DenturesService } from '../../dentures.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';



@Component({
  selector: 'app-dentures-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './dentures-form.component.html',
  styleUrl: './dentures-form.component.css'
})
export class DenturesFormComponent {

  hrmsId: any;
  userdata: any = [];
  successMessage: string = '';
  errorMessage: string = '';



  denture: any = {
    empname: '',
    date_of_birth: '',
    guardian_name: '',
    date_of_appointment: '',
    bill_unit_number: '',
    community: 'UR',
    designation: '',
    office: '',
    division: '',
    pf_no: '',
    pay_band: '',
    running_allowance: '',
    grade_pay_substantive: '',
    grade_pay_officiating_macp: '',
    dentures_recommended: '',
    receipt_number: '',
    receipt_date: '',
    cost_incurred: '',
    status: 'submitted'
  };

  pdfFile: any;

  constructor(private denturesService: DenturesService, private router: Router,
      private authService: AuthService) {}
  


  ngOnInit() {
    this.getHrmsId();
    if (this.hrmsId) {
      this.fetchUserDetails();
    } else {
      this.errorMessage = 'HRMS ID not found.';
      alert(this.errorMessage);
    }
  }

  // Fetch HRMS ID from localStorage
  getHrmsId() {
    this.hrmsId = localStorage.getItem('hrmsId');
  }
    // Convert ISO Date format to YYYY-MM-DD
    formatDateForInput(dateString: string | null): string {
      if (!dateString) {
        return ''; // Return empty string if date is null or undefined
      }
      const date = new Date(dateString);
      // Check if the date is invalid (e.g. NaN date), return empty string
      if (isNaN(date.getTime())) {
        return ''; // Return empty string if invalid date
      }
      return date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
    }
    

  fetchUserDetails() {
    this.authService.getHrmsData(this.hrmsId).subscribe(
      (data) => {
        console.log(data);
        console.log("Raw date from API:", data.date_of_appointment);
  
        this.userdata = data;
        this.userdata.date_of_appointment = this.formatDateForInput(data.date_of_appointment);
        this.userdata.date_of_birth = this.formatDateForInput(data.date_of_birth);
  
        
      },
      (err) => {
        this.errorMessage = 'Failed to fetch user details.';
        alert(this.errorMessage);
        console.error(err);
      }
    );
  }




  onFileSelected(event: any) {
    this.pdfFile = event.target.files[0];
  }
  onSubmit(form: NgForm) {
    // Ensure the date values are properly formatted
    this.denture.date_of_birth = this.formatDateForInput(this.userdata.date_of_birth); 
    this.denture.date_of_appointment = this.formatDateForInput(this.userdata.date_of_appointment);
  
    // Check if date_of_birth is empty or invalid, then don't submit the form
    if (!this.denture.date_of_birth || !this.denture.date_of_appointment) {
      alert("Please provide valid dates for date of birth and date of appointment.");
      return; // Don't submit the form if dates are invalid
    }
   // Validate running allowance and cost incurred to ensure they don't exceed 8 digits
   if (this.denture.running_allowance && !/^\d{1,8}$/.test(this.denture.running_allowance.toString())) {
    alert('Running allowance must be a number with up to 8 digits.');
    return; // Stop form submission if validation fails
  }

  if (this.denture.cost_incurred && !/^\d{1,8}$/.test(this.denture.cost_incurred.toString())) {
    alert('Cost incurred must be a number with up to 8 digits.');
    return; // Stop form submission if validation fails
  }
    // Populate other denture fields
    this.denture.empname = this.userdata.empname;
    this.denture.designation = this.userdata.designation;
    this.denture.office = this.userdata.office;
    this.denture.division = this.userdata.division;
    this.denture.pf_no = this.userdata.pf_no;
    this.denture.pay_band = this.userdata.payband;
  
    if (form.valid) {
      this.denturesService.createDenture(this.denture, this.pdfFile)
        .subscribe({
          next: (response) => {
            alert('Denture data saved successfully!');
            form.reset();
          },
          error: (err) => {
            console.error(err);
            alert('Error saving denture data.');
          }
        });
    }
  }
}