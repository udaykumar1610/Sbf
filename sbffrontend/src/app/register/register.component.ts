
// import { Component } from '@angular/core';
// import { Router, RouterLink } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../auth.service';
// import { MessageService } from 'primeng/api';
// import {  ToastModule } from 'primeng/toast';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [FormsModule, CommonModule, RouterLink,ToastModule],
//   providers:[MessageService],
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css'],
// })
// export class RegisterComponent {
//   userData = {
//     empname: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     designation: '',
//     date_of_birth: '',
//     date_of_appointment: '',
//     mobilenumber: '',
//     pf_no: '',
//     hrms_id: '',
//     division: '',
//     office: '',
//     level: '',
//     employeetype: '',
//     running_allowance: 0,
//     role: 'user',
//     payband: '',
//     familyData: [{ dependent_name: '', relationship: '', age_dob: '', remarks: '' }]
//   };
//   successMessage: string = '';
//   errorMessage: string = '';

//   // Regex patterns for validation
//   passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   mobilePattern = /^[0-9]{10}$/;
//   runningAllowancePattern = /^\d{1,8}$/;

//   // For displaying error messages
//   showEmpnameError = false;
//   showEmailError = false;
//   showPasswordError = false;
//   showConfirmPasswordError = false;
//   showMobileError = false;
//   showPfError = false;
//   showDesignationError = false;
//   showDobError = false;
//   showDateOfAppointmentError = false;
//   showOfficeError = false;
//   showDivisionError = false;
//   showLevelError = false;
//   showHrmsIdError = false;
//   showPaybandError = false; // Error flag for payband
//   showEmployeeTypeError = false;
//   showRunningAllowanceError = false;


//   constructor(private authService: AuthService, private router: Router,private messageService:MessageService) {}

//   register() {
//     console.log("data",this.userData)
//     // Check if password and confirm password match
//     if (this.userData.password !== this.userData.confirmPassword) {
//       this.errorMessage = 'Passwords do not match!';
//       return;
//     }

//     // Check if mobile number is valid
//     if (!this.mobilePattern.test(this.userData.mobilenumber)) {
//       this.errorMessage = 'Mobile number should be exactly 10 digits!';
//       return;
//     }

//     // Check if PF number is valid (non-empty)
//     if (!this.userData.pf_no) {
//       this.errorMessage = 'PF number cannot be empty!';
//       return;
//     }

//     // Check if payband is selected (non-empty)
//     if (!this.userData.payband) {
//       this.errorMessage = 'Please select a Payband!';
//       return;
//     }
//     if (this.userData.employeetype === 'gazetted') {
//       this.errorMessage='Gazetted employees are not allowed for registration.';
//       alert('Gazetted employees are not allowed for registration.');
//       return;
//     }

//     if (!this.runningAllowancePattern.test(this.userData.running_allowance.toString())) {
//       this.errorMessage = 'Running allowance must be up to 8 digits only!';
//       alert(this.errorMessage);
//       return;
//     }
//     // Check if password matches the required pattern
//     if (!this.passwordPattern.test(this.userData.password)) {
//       this.errorMessage = 'Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
//       return;
//     }

//     this.authService.register(this.userData).subscribe(
//       (response) => {
//         // alert('Registration successful. Please login.');
//         if(response.status='success'){
//           this.messageService.add({
//             severity:"success",
//             summary: response.message,
//             detail: ""
//           })
//         }
//         this.successMessage = 'Registration successful. Please login.';
//         setTimeout(() => this.router.navigate(['/login']), 1000);
//       },
//       (err) => {
//         this.errorMessage = 'Registration failed';

//         if(err.status="error"){
//           this.messageService.add({
//             severity: "error",
//             summary:"Registration failed" ,
//             detail: err.error.message
//           });
//         }
//       //  alert(this.errorMessage);
//         console.error(err);
//       }
//     );
//   }

//   // Disable Register button if the form is invalid
//   isFormValid() {
//     return (
//       this.userData.empname &&
//       this.userData.email &&
//       this.userData.password &&
//       this.userData.confirmPassword &&
//       this.userData.designation &&
//       this.userData.date_of_birth &&
//       this.userData.date_of_appointment &&
//       this.userData.mobilenumber &&
//       this.userData.pf_no &&
//       this.userData.hrms_id &&
//       this.userData.division &&
//       this.userData.office &&
//       this.userData.level &&
//       this.userData.payband && 
//       this.userData.employeetype &&
//       this.userData.employeetype !== 'gazetted' &&
//       this.runningAllowancePattern.test(this.userData.running_allowance.toString()) &&
//       this.passwordPattern.test(this.userData.password) &&
//       this.mobilePattern.test(this.userData.mobilenumber)
//     );
//   }

//   // Methods to display validation errors on focus
//   onFocus(field: string) {
//     switch (field) {
//       case 'hrms_id':
//         this.showHrmsIdError = true;
//         break;
//       case 'empname':
//         this.showEmpnameError = true;
//         break;
//       case 'email':
//         this.showEmailError = true;
//         break;
//       case 'password':
//         this.showPasswordError = true;
//         break;
//       case 'confirmPassword':
//         this.showConfirmPasswordError = true;
//         break;
//       case 'mobilenumber':
//         this.showMobileError = true;
//         break;
//       case 'pf_no':
//         this.showPfError = true;
//         break;
//       case 'designation':
//         this.showDesignationError = true;
//         break;
//       case 'date_of_birth':
//         this.showDobError = true;
//         break;
//       case 'date_of_appointment':
//         this.showDateOfAppointmentError = true;
//         break;
//       case 'office':
//         this.showOfficeError = true;
//         break;
//       case 'division':
//         this.showDivisionError = true;
//         break;
//       case 'level':
//         this.showLevelError = true;
//         break;
//       case 'payband': 
//         this.showPaybandError = true;
//         break;
//         case 'employeetype':
//         this.showEmployeeTypeError = true;
//         break;
//       case 'running_allowance':
//         this.showRunningAllowanceError = true;
//         break;
//       default:
//         break;
//     }
//   }

//   isHrmsIdValid() {
//     return this.userData.hrms_id.length >= 6;
//   }

//   addFamilyRow() {
//     this.userData.familyData.push({ dependent_name: '', relationship: '', age_dob: '', remarks: '' });
//   }

//   removeFamilyRow(index: number) {
//     if (this.userData.familyData.length > 1) {
//       this.userData.familyData.splice(index, 1);
//     }
//   }
// }



import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, ToastModule],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userData = {
    empname: '',
    email: '',
    password: '',
    confirmPassword: '',
    designation: '',
    date_of_birth: '',
    date_of_appointment: '',
    mobilenumber: '',
    pf_no: '',
    hrms_id: '',
    division: '',
    office: '',
    level: '',
    employeetype: '',
    running_allowance: 0,
    role: 'user',
    payband: '',
    familyData: [{ dependent_name: '', relationship: '', age_dob: '', remarks: '' }]
  };
  successMessage: string = '';
  errorMessage: string = '';

  // Regex patterns for validation
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  mobilePattern = /^[0-9]{10}$/;
  runningAllowancePattern = /^\d{1,8}$/;
  hrmsIdPattern = /^[A-Z0-9]{6}$/; // HRMS ID should only contain uppercase letters and digits

  // Error flags
  showEmpnameError = false;
  showEmailError = false;
  showPasswordError = false;
  showConfirmPasswordError = false;
  showMobileError = false;
  showPfError = false;
  showDesignationError = false;
  showDobError = false;
  showDateOfAppointmentError = false;
  showOfficeError = false;
  showDivisionError = false;
  showLevelError = false;
  showHrmsIdError = false;
  showPaybandError = false; 
  showEmployeeTypeError = false;
  showRunningAllowanceError = false;

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}

  register() {
    console.log("data", this.userData);
    // Check if password and confirm password match
    if (this.userData.password !== this.userData.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    // Check if mobile number is valid
    if (!this.mobilePattern.test(this.userData.mobilenumber)) {
      this.errorMessage = 'Mobile number should be exactly 10 digits!';
      return;
    }

    // Check if PF number is valid (non-empty)
    if (!this.userData.pf_no) {
      this.errorMessage = 'PF number cannot be empty!';
      return;
    }

    // Check if payband is selected (non-empty)
    if (!this.userData.payband) {
      this.errorMessage = 'Please select a Payband!';
      return;
    }

    // Check if HRMS ID is valid
    if (!this.hrmsIdPattern.test(this.userData.hrms_id)) {
      this.errorMessage = 'HRMS ID should contain only uppercase letters and digits!';
      return;
    }

    // Check if employee type is not 'gazetted'
    if (this.userData.employeetype === 'gazetted') {
      this.errorMessage = 'Gazetted employees are not allowed for registration.';
      alert(this.errorMessage);
      return;
    }

    // Check if running allowance is valid
    if (!this.runningAllowancePattern.test(this.userData.running_allowance.toString())) {
      this.errorMessage = 'Running allowance must be up to 8 digits only!';
      alert(this.errorMessage);
      return;
    }

    // Check if password matches the required pattern
    if (!this.passwordPattern.test(this.userData.password)) {
      this.errorMessage = 'Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
      return;
    }

    // Proceed with registration
    this.authService.register(this.userData).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.messageService.add({
            severity: 'success',
            summary: response.message,
            detail: ''
          });
        }
        this.successMessage = 'Registration successful. Please login.';
        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      (err) => {
        this.errorMessage = 'Registration failed';
        if (err.status === 'error') {
          this.messageService.add({
            severity: 'error',
            summary: 'Registration failed',
            detail: err.error.message
          });
        }
        console.error(err);
      }
    );
  }

  // Disable Register button if the form is invalid
  isFormValid() {
    return (
      this.userData.empname &&
      this.userData.email &&
      this.userData.password &&
      this.userData.confirmPassword &&
      this.userData.designation &&
      this.userData.date_of_birth &&
      this.userData.date_of_appointment &&
      this.userData.mobilenumber &&
      this.userData.pf_no &&
      this.userData.hrms_id &&
      this.userData.division &&
      this.userData.office &&
      this.userData.level &&
      this.userData.payband &&
      this.userData.employeetype &&
      this.userData.employeetype !== 'gazetted' &&
      this.runningAllowancePattern.test(this.userData.running_allowance.toString()) &&
      this.passwordPattern.test(this.userData.password) &&
      this.mobilePattern.test(this.userData.mobilenumber) &&
      this.hrmsIdPattern.test(this.userData.hrms_id)
    );
  }

  // Methods to display validation errors on focus
  onFocus(field: string) {
    switch (field) {
      case 'hrms_id':
        this.showHrmsIdError = true;
        break;
      case 'empname':
        this.showEmpnameError = true;
        break;
      case 'email':
        this.showEmailError = true;
        break;
      case 'password':
        this.showPasswordError = true;
        break;
      case 'confirmPassword':
        this.showConfirmPasswordError = true;
        break;
      case 'mobilenumber':
        this.showMobileError = true;
        break;
      case 'pf_no':
        this.showPfError = true;
        break;
      case 'designation':
        this.showDesignationError = true;
        break;
      case 'date_of_birth':
        this.showDobError = true;
        break;
      case 'date_of_appointment':
        this.showDateOfAppointmentError = true;
        break;
      case 'office':
        this.showOfficeError = true;
        break;
      case 'division':
        this.showDivisionError = true;
        break;
      case 'level':
        this.showLevelError = true;
        break;
      case 'payband':
        this.showPaybandError = true;
        break;
      case 'employeetype':
        this.showEmployeeTypeError = true;
        break;
      case 'running_allowance':
        this.showRunningAllowanceError = true;
        break;
      default:
        break;
    }
  }

  // Automatically convert HRMS ID to uppercase
  convertHrmsIdToUppercase() {
    setTimeout(() => {
      this.userData.hrms_id = this.userData.hrms_id.toUpperCase();
    }, 250); // Delay of 1 second
  }
  
  addFamilyRow() {
    this.userData.familyData.push({ dependent_name: '', relationship: '', age_dob: '', remarks: '' });
  }

  removeFamilyRow(index: number) {
    if (this.userData.familyData.length > 1) {
      this.userData.familyData.splice(index, 1);
    }
  }
}
