import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MedicalAssistanceService } from '../../servicesForm/medical-assistance.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-medical-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './medical-form.component.html',
  styleUrl: './medical-form.component.css'
})
export class MedicalFormComponent {
  
  hrmsId: any;
  userdata: any = [];
  successMessage: string = '';
  errorMessage: string = '';

  medicalData: any = {
    empname: '',
    guardian_name: '',
    date_of_appointment: '',
    bill_unit_number: '',
    community: '',
    designation: '',
    office: '',
    division: '',
    pf_no: '',
    pay_band: '',
    running_allowance: '',
    grade_pay_substantive: '',
    grade_pay_officiating_macp: '',
    assistance_for: '',
    dependent_name_relation: '',
    status: 'submitted',  // Default status
  };

  pdfFile: any;

  constructor(
    private medicalService: MedicalAssistanceService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getHrmsId();
    if (this.hrmsId) {
      this.fetchUserDetails();
    } else {
      this.errorMessage = 'HRMS ID not found.';
      if (this.isBrowser()) {
        alert(this.errorMessage);
      }}
  }

  // Fetch HRMS ID from localStorage
  // getHrmsId() {
  //   this.hrmsId = localStorage.getItem('hrmsId');
  // }

  getHrmsId() {
    if (this.isBrowser()) {
      this.hrmsId = localStorage.getItem('hrmsId');
    }
  }

  // Check if the code is running in a browser environment
  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  // Convert ISO Date format to YYYY-MM-DD
  formatDateForInput(dateString: string | null): string {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    return date.toISOString().split('T')[0];
  }

  fetchUserDetails() {
    this.authService.getHrmsData(this.hrmsId).subscribe(
      (data) => {
        console.log(data);
        console.log("Raw date from API:", data.date_of_appointment);

        this.userdata = data;
        this.userdata.date_of_appointment = this.formatDateForInput(data.date_of_appointment);
      },
      (err) => {
        this.errorMessage = 'Failed to fetch user details.';
        if (this.isBrowser()) {
          alert(this.errorMessage); // Only show alert if in the browser
        }
        console.error(err);
      }
    );
  }

  onFileSelected(event: any) {
    this.pdfFile = event.target.files[0];
  }

  onSubmit(form: NgForm) {
    // Ensure the date values are properly formatted
    this.medicalData.date_of_appointment = this.formatDateForInput(this.userdata.date_of_appointment);

    // Check if date_of_appointment is empty or invalid, then don't submit the form
    if (!this.medicalData.date_of_appointment) {
      alert("Please provide a valid date for the appointment.");
      return;
    }

    // Validate running allowance to ensure it doesn't exceed 8 digits
    if (this.medicalData.running_allowance && !/^\d{1,8}$/.test(this.medicalData.running_allowance.toString())) {
      alert('Running allowance must be a number with up to 8 digits.');
      return;
    }

    // Populate other medical fields
    this.medicalData.empname = this.userdata.empname;
    this.medicalData.guardian_name = this.userdata.guardian_name;
    this.medicalData.designation = this.userdata.designation;
    this.medicalData.office = this.userdata.office;
    this.medicalData.division = this.userdata.division;
    this.medicalData.pf_no = this.userdata.pf_no;
    this.medicalData.pay_band = this.userdata.pay_band;

    if (form.valid) {
      this.medicalService.create(this.medicalData, this.pdfFile)
        .subscribe({
          next: (response) => {
            alert('Medical Assistance record created successfully!');
            form.reset();
            this.router.navigate(['/medical']);
          },
          error: (err) => {
            console.error(err);
            alert('Error saving Medical Assistance data.');
          }
        });
    }
  }


// onSubmit(form: NgForm) {
//   // Ensure the date values are properly formatted
//   this.medicalData.date_of_appointment = this.formatDateForInput(this.userdata.date_of_appointment);

//   // Check if date_of_appointment is empty or invalid, then don't submit the form
//   if (!this.medicalData.date_of_appointment) {
//     if (this.isBrowser()) {
//       alert("Please provide a valid date for the appointment.");
//     }
//     return;
//   }

//   // Validate running allowance to ensure it doesn't exceed 8 digits
//   if (this.medicalData.running_allowance && !/^\d{1,8}$/.test(this.medicalData.running_allowance.toString())) {
//     if (this.isBrowser()) {
//       alert('Running allowance must be a number with up to 8 digits.');
//     }
//     return;
//   }

//   // Populate other medical fields
//   this.medicalData.empname = this.userdata.empname;
//   this.medicalData.guardian_name = this.userdata.guardian_name;
//   this.medicalData.designation = this.userdata.designation;
//   this.medicalData.office = this.userdata.office;
//   this.medicalData.division = this.userdata.division;
//   this.medicalData.pf_no = this.userdata.pf_no;
//   this.medicalData.pay_band = this.userdata.pay_band;

//   if (form.valid) {
//     this.medicalService.create(this.medicalData, this.pdfFile)
//       .subscribe({
//         next: (response) => {
//           if (this.isBrowser()) {
//             alert('Medical Assistance record created successfully!');
//           }
//           form.reset();
//           this.router.navigate(['/medical']);
//         },
//         error: (err) => {
//           console.error(err);
//          // if (this.isBrowser()) {
//             alert('Error saving Medical Assistance data.');
//           //}
//         }
//       });
//   }
// }
}
