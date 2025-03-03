



// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ScholarshipService } from '../../scholarship.service';
// import { AuthService } from '../../auth.service';


// @Component({
//   selector: 'app-scholarship-form',
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   templateUrl: './scholarship-form.component.html',
//   styleUrls: ['./scholarship-form.component.css']
// })
// export class ScholarshipFormComponent {
//   hrmsId: any;
//   userdata: any = [];
//   selectedFile: File | null = null;
//   isChecked: boolean = false; 

//   scholarshipData = {
//     empname: '',
//     scholar_name: '',
//     relationship: '',
//     spouse_govt_employee_details: '',
//     date_of_appointment: '',
//     bill_unit_no: '',
//     designation: '',
//     office: '',
//     division: '',
//     telephone_number: null,
//     mobile_number: '',
//     pf_no: '',
//     pay_level: '',
//     macp_pay_level: '',
//     basic_pay: '',
//     course_of_study: '',
//     year_of_study: '',
//     institution_name: '',
//     tuition_fee_exemption: '',
//     student_employment_status: '',
//     other_scholarships_value: '',
//   };
  
//   successMessage: string = '';
//   errorMessage: string = '';
// basicPay: any;

//   constructor(
//     private scholarshipService: ScholarshipService,
//     private router: Router,
//     private authService: AuthService
//   ) {}

//   ngOnInit() {
//     this.getHrmsId();
//     if (this.hrmsId) {
//       this.fetchUserDetails();
//     } else {
//       this.errorMessage = 'HRMS ID not found.';
//       alert(this.errorMessage);
//     }
//   }

//   // Fetch HRMS ID from localStorage
//   getHrmsId() {
//     this.hrmsId = localStorage.getItem('hrmsId');
//   }

  
// formatDateForInput(dateString: string | null): string {
//   if (!dateString) return ''; // Ensure no null value is assigned
//   return new Date(dateString).toISOString().split('T')[0]; // Extract YYYY-MM-DD
// }

// // Fetch user details from backend
// fetchUserDetails() {
//   this.authService.getHrmsData(this.hrmsId).subscribe(
//     (data) => {
//       console.log("Raw date from API:", data.date_of_appointment);

//       this.userdata = data;
//       this.userdata.date_of_appointment = this.formatDateForInput(data.date_of_appointment);

//       this.populateFormData();
//     },
//     (err) => {
//       this.errorMessage = 'Failed to fetch user details.';
//       alert(this.errorMessage);
//       console.error(err);
//     }
//   );
// }

  
  

//   // Populate form fields with user data
//   populateFormData() {
//     this.scholarshipData.empname = this.userdata.empname;
//     this.scholarshipData.date_of_appointment = this.userdata.date_of_appointment;
//     this.scholarshipData.designation = this.userdata.designation;
//     this.scholarshipData.office = this.userdata.office;
//     this.scholarshipData.division = this.userdata.division;
//     this.scholarshipData.pf_no = this.userdata.pf_no;
//     this.scholarshipData.pay_level = this.userdata.level;
//     this.scholarshipData.mobile_number = this.userdata.mobilenumber;
//   }

//   // Handle file selection
//   onFileSelected(event: any) {
//     this.selectedFile = event.target.files[0];
//   }

  

//   formatDate(dateString: string | null): string {
//     if (!dateString) return '';  // Return an empty string instead of null
//     return new Date(dateString).toISOString().split('T')[0]; // Convert to YYYY-MM-DD
//   }
  

// // Submit form data
// submitForm() {


//   // Check if basic_pay is valid (number and max 8 digits)
//   const basicPay = this.scholarshipData.basic_pay;
//   const basicPayValid = /^\d{1,8}$/.test(basicPay);

//   if (!basicPayValid) {
//     this.errorMessage = 'Basic Pay must be a valid number with a maximum of 8 digits.';
//     alert(this.errorMessage);
//     return;  // Prevent submission
//   }
//   this.scholarshipData.date_of_appointment = this.formatDate(this.scholarshipData.date_of_appointment);




//   this.scholarshipService.createScholarship(this.scholarshipData, this.selectedFile).subscribe(
//     () => {
//       this.successMessage = 'Scholarship application submitted successfully.';
//       alert(this.successMessage);
//       setTimeout(() => this.router.navigate(['/scheme']), 2000);
//     },
//     (err) => {
//       this.errorMessage = 'Submission failed.';
//       alert(this.errorMessage);
//       console.error(err);
//     }
//   );
// }

// }



import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScholarshipService } from '../../scholarship.service';
import { AuthService } from '../../auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-scholarship-form',
  standalone: true,
  imports: [FormsModule, CommonModule,ToastModule],
  providers:[MessageService],
  templateUrl: './scholarship-form.component.html',
  styleUrls: ['./scholarship-form.component.css']
})
export class ScholarshipFormComponent {
  hrmsId: any;
  userdata: any = [];
  selectedFile: File | null = null;
  isChecked: boolean = false;  // Variable to store checkbox state

  scholarshipData = {
    empname: '',
    scholar_name: '',
    relationship: '',
    spouse_govt_employee_details: '',
    date_of_appointment: '',
    bill_unit_no: '',
    designation: '',
    office: '',
    division: '',
    telephone_number: null,
    mobile_number: '',
    pf_no: '',
    pay_level: '',
    macp_pay_level: '',
    basic_pay: '',
    course_of_study: '',
    year_of_study: '',
    institution_name: '',
    tuition_fee_exemption: '',
    student_employment_status: '',
    other_scholarships_value: '',
  };
  
  successMessage: string = '';
  errorMessage: string = '';
  basicPay: any;

  constructor(
    private scholarshipService: ScholarshipService,
    private router: Router,
    private authService: AuthService,
    private messageService:MessageService
  ) {}

  ngOnInit() {
    this.getHrmsId();
    if (this.hrmsId) {
      this.fetchUserDetails();
    } else {
      this.errorMessage = 'HRMS ID not found.';
      if (typeof window !== 'undefined') {
        alert(this.errorMessage);  // Ensure alert is only called in the browser
      }
    }}

  // Fetch HRMS ID from localStorage
  getHrmsId() {
    if (typeof window !== 'undefined') {
      // Ensure we are in the browser before accessing localStorage
      this.hrmsId = localStorage.getItem('hrmsId');
    }
  }

  formatDateForInput(dateString: string | null): string {
    if (!dateString) return ''; // Ensure no null value is assigned
    return new Date(dateString).toISOString().split('T')[0]; // Extract YYYY-MM-DD
  }

  // Fetch user details from backend
  fetchUserDetails() {
    this.authService.getHrmsData(this.hrmsId).subscribe(
      (data) => {
        console.log("Raw date from API:", data.date_of_appointment);

        this.userdata = data;
        this.userdata.date_of_appointment = this.formatDateForInput(data.date_of_appointment);

        this.populateFormData();
      },
      (err) => {
        this.errorMessage = 'Failed to fetch user details.';
        alert(this.errorMessage);
        console.error(err);
      }
    );
  }

  // Populate form fields with user data
  populateFormData() {
    this.scholarshipData.empname = this.userdata.empname;
    this.scholarshipData.date_of_appointment = this.userdata.date_of_appointment;
    this.scholarshipData.designation = this.userdata.designation;
    this.scholarshipData.office = this.userdata.office;
    this.scholarshipData.division = this.userdata.division;
    this.scholarshipData.pf_no = this.userdata.pf_no;
    this.scholarshipData.pay_level = this.userdata.level;
    this.scholarshipData.mobile_number = this.userdata.mobilenumber;
  }

  // Handle file selection
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  formatDate(dateString: string | null): string {
    if (!dateString) return '';  // Return an empty string instead of null
    return new Date(dateString).toISOString().split('T')[0]; // Convert to YYYY-MM-DD
  }

  // Submit form data
  submitForm() {

  
    // Proceed with form submission if valid
    const basicPay = this.scholarshipData.basic_pay;
    const basicPayValid = /^\d{1,8}$/.test(basicPay);
  
    if (!basicPayValid) {
      this.errorMessage = 'Basic Pay must be a valid number with a maximum of 8 digits.';
      alert(this.errorMessage);
      return;  // Prevent submission
    }
    
    this.scholarshipData.date_of_appointment = this.formatDate(this.scholarshipData.date_of_appointment);

    this.scholarshipService.createScholarship(this.scholarshipData, this.selectedFile).subscribe(
      (response) => {
        this.successMessage = 'Scholarship application submitted successfully.';
        // alert(this.successMessage);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',   
          detail: 'Scholarship application submitted successfully.',
        })
        setTimeout(() => this.router.navigate(['/scheme']), 2000);
      },
      (err) => {
        this.errorMessage = 'Submission failed.';
        //alert(err.error.message);
        alert(this.errorMessage);
        this.messageService.add({
          severity: 'error',
          summary: 'Submission Failed',
          detail :err.error.message
        })
        console.error("err:",err);
      }
    );
  }
}
