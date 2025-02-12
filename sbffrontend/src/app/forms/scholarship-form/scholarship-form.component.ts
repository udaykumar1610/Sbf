

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
//   scholarshipData = {
//     empname: '',
//     scholar_name: '',
//     relationship: '',
//     spouse_govt_employee_details: '',
//     date_of_appointment: null as string | null,
//     bill_unit_no: '',
//     designation: '',
//     office: '',
//     division: '',
//     telephone_number: '',
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

//   constructor(private scholarshipService: ScholarshipService, private router: Router, private authService: AuthService) {}

//   ngOnInit() {
//     this.getHrmsId();
//     console.log("id", this.hrmsId);

//     if (this.hrmsId) {
//       this.fetchUserDetails();
//     } else {
//       this.errorMessage = 'HRMS ID not found.';
//       alert(this.errorMessage);  // Show alert if HRMS ID is not found
//     }
//   }

//   // Fetch HRMS ID from localStorage
//   getHrmsId() {
//     this.hrmsId = localStorage.getItem('hrmsId');
//   }

//   // Fetch user details from the backend
//   fetchUserDetails() {
//     this.authService.getHrmsData(this.hrmsId).subscribe(
//       (data) => {
//         console.log(data);
//         this.userdata = data;

//         // Check if date_of_appointment is not empty before formatting
//         if (this.userdata.date_of_appointment && this.userdata.date_of_appointment !== '') {
//           const date = new Date(this.userdata.date_of_appointment);
//           // Format the date as YYYY-MM-DD (year-month-day)
//           const year = date.getFullYear();
//           const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure month is 2 digits
//           const day = date.getDate().toString().padStart(2, '0'); // Ensure day is 2 digits
//           this.userdata.date_of_appointment = `${year}-${month}-${day}`; // Format as YYYY-MM-DD
//         } else {
//           this.userdata.date_of_appointment = null; // Set to null if the date is missing or empty
//         }
//       },
//       (err) => {
//         this.errorMessage = 'Failed to fetch user details.';
//         console.error(err);
//         alert(this.errorMessage); // Show alert if there is an error fetching user details
//       }
//     );
//   }

//   // Submit form data
//   submitForm() {
//     // Ensure date_of_appointment is properly set to null if empty
//     if (!this.scholarshipData.date_of_appointment || this.scholarshipData.date_of_appointment === '') {
//       this.scholarshipData.date_of_appointment = null;
//     }

//     // Fill scholarshipData with user data for submission
//     this.scholarshipData.empname = this.userdata.empname;
//     this.scholarshipData.date_of_appointment = this.userdata.date_of_appointment;
//     this.scholarshipData.designation = this.userdata.designation;
//     this.scholarshipData.office = this.userdata.office;
//     this.scholarshipData.division = this.userdata.division;
//     this.scholarshipData.pf_no = this.userdata.pf_no;
//     this.scholarshipData.pay_level = this.userdata.level;
//     this.scholarshipData.mobile_number = this.userdata.mobilenumber;

//     // Submit the scholarship data to the backend
//     this.scholarshipService.createScholarship(this.scholarshipData).subscribe(
//       () => {
//         this.successMessage = 'Scholarship application submitted successfully.';
//         alert(this.successMessage); // Show success message
//         setTimeout(() => this.router.navigate(['/scheme']), 2000);
//       },
//       (err) => {
//         this.errorMessage = 'Submission failed.';
//         alert(this.errorMessage); // Show error message
//         console.error(err);
//       }
//     );
//   }
// }



import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScholarshipService } from '../../scholarship.service';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-scholarship-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './scholarship-form.component.html',
  styleUrls: ['./scholarship-form.component.css']
})
export class ScholarshipFormComponent {
  hrmsId: any;
  userdata: any = [];
  selectedFile: File | null = null;

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

  constructor(
    private scholarshipService: ScholarshipService,
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

  //Fetch user details from backend
  // fetchUserDetails() {
  //   this.authService.getHrmsData(this.hrmsId).subscribe(
  //     (data) => {
  //       console.log(data.date_of_appointment)
  //       this.userdata = data;
  //       this.populateFormData();
  //     },
  //     (err) => {
  //       this.errorMessage = 'Failed to fetch user details.';
  //       alert(this.errorMessage);
  //       console.error(err);
  //     }
  //   );
  // }
  // Convert ISO Date format to YYYY-MM-DD
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

  // // Submit form data with PDF file
  // submitForm() {
  //   this.scholarshipService.createScholarship(this.scholarshipData, this.selectedFile).subscribe(
  //     () => {
  //       this.successMessage = 'Scholarship application submitted successfully.';
  //       alert(this.successMessage);
  //       setTimeout(() => this.router.navigate(['/scheme']), 
  //       2000);
  //     },
  //     (err) => {
  //       this.errorMessage = 'Submission failed.';
  //       alert(this.errorMessage);
  //       console.error(err);
  //     }
  //   );
  // }

  formatDate(dateString: string | null): string {
    if (!dateString) return '';  // Return an empty string instead of null
    return new Date(dateString).toISOString().split('T')[0]; // Convert to YYYY-MM-DD
  }
  

// Submit form data
submitForm() {
  this.scholarshipData.date_of_appointment = this.formatDate(this.scholarshipData.date_of_appointment);

  this.scholarshipService.createScholarship(this.scholarshipData, this.selectedFile).subscribe(
    () => {
      this.successMessage = 'Scholarship application submitted successfully.';
      alert(this.successMessage);
      setTimeout(() => this.router.navigate(['/scheme']), 2000);
    },
    (err) => {
      this.errorMessage = 'Submission failed.';
      alert(this.errorMessage);
      console.error(err);
    }
  );
}

}
