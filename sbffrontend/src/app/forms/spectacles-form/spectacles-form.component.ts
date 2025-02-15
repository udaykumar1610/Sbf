import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { SpectaclesFormService } from '../../servicesForm/spectacles-form.service';

@Component({
  selector: 'app-spectacles-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './spectacles-form.component.html',
  styleUrls: ['./spectacles-form.component.css']
})
export class SpectaclesFormComponent {
  hrmsId: any;
  userdata: any = [];
  successMessage: string = '';
  errorMessage: string = '';

  spectacle: any = {
    empname: '',
    date_of_birth: '',
    guardian_name: '',
    date_of_appointment: '',
    bill_unit_number: '',
    designation: '',
    office: '',
    division: '',
    pf_no: '',
    pay_band: '',
    running_allowance: '',
    grade_pay_substantive: '',
    grade_pay_officiating_macp: '',
    previous_application_details: '',
    receipt_number_date: '',
    cost_incurred: '',
    status: 'submitted'
  };

  pdfFile: any;

  constructor(
    private spectaclesFormService: SpectaclesFormService, // Inject the service
    private router: Router,
    private authService: AuthService
  ) {}

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
    this.spectacle.date_of_birth = this.formatDateForInput(this.userdata.date_of_birth);
    this.spectacle.date_of_appointment = this.formatDateForInput(this.userdata.date_of_appointment);

    // Validate running allowance and cost incurred to ensure they don't exceed 8 digits
    if (this.spectacle.running_allowance && !/^\d{1,8}$/.test(this.spectacle.running_allowance.toString())) {
      alert('Running allowance must be a number with up to 8 digits.');
      return; // Stop form submission if validation fails
    }

    if (this.spectacle.cost_incurred && !/^\d{1,8}$/.test(this.spectacle.cost_incurred.toString())) {
      alert('Cost incurred must be a number with up to 8 digits.');
      return; // Stop form submission if validation fails
    }

    // Populate other spectacle fields
    this.spectacle.empname = this.userdata.empname;
    this.spectacle.designation = this.userdata.designation;
    this.spectacle.office = this.userdata.office;
    this.spectacle.division = this.userdata.division;
    this.spectacle.pf_no = this.userdata.pf_no;
    this.spectacle.pay_band = this.userdata.pay_band;

    if (form.valid) {
      // Call createSpectacle from the service
      this.spectaclesFormService.createSpectacle(this.spectacle, this.pdfFile).subscribe({
        next: (response) => {
          alert('Spectacle data saved successfully!');
          form.reset();
        },
        error: (err) => {
          console.error(err);
          alert('Error saving spectacle data.');
        }
      });
    }
  }
 
}
