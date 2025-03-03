// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-maintenance-grant-form',
//   standalone: true,
//   imports: [],
//   templateUrl: './maintenance-grant-form.component.html',
//   styleUrl: './maintenance-grant-form.component.css'
// })
// export class MaintenanceGrantFormComponent {

// }


import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { MaintenanceGrantformService } from '../../servicesForm/maintenance-grantform.service';

@Component({
  selector: 'app-maintenance-grant-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './maintenance-grant-form.component.html',
  styleUrls: ['./maintenance-grant-form.component.css']
})
export class MaintenanceGrantFormComponent {

  hrmsId: any;
  userdata: any = [];
  successMessage: string = '';
  errorMessage: string = '';
  declarationChecked: boolean = false;


  maintenanceGrantData: any = {
    empname: '',
    son_or_wife_of: '',
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
    period_of_sickness_with_pay_from: '',
    period_of_sickness_with_pay_to: '',
    period_of_sickness_with_half_pay_from: '',
    period_of_sickness_with_half_pay_to: '',
    period_of_sickness_without_pay_from: '',
    period_of_sickness_without_pay_to: '',
    sick_certificate_number_date: '',
    sick_certificate_issued_by: '',
    status: 'Submitted',
  };

  pdfFile: any;

  constructor(
    private MaintenanceGrantformService :MaintenanceGrantformService ,
    private router: Router,
    private authService: AuthService
  ) {}

  // ngOnInit() {
  //   this.getHrmsId();
  //   if (this.hrmsId) {
  //     this.fetchUserDetails();
  //   } else {
  //     this.errorMessage = 'HRMS ID not found.';
  //     alert(this.errorMessage);
  //   }
  // }

  getHrmsId() {
    if (this.isBrowser()) {
      this.hrmsId = localStorage.getItem('hrmsId');
    }
  }

  // isBrowser(): boolean {
  //   return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  // }

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


  ngOnInit() {
    this.getHrmsId();
    if (this.hrmsId) {
      this.fetchUserDetails();
    } else {
      this.errorMessage = 'HRMS ID not found.';
      if (this.isBrowser()) {
        alert(this.errorMessage);
      }
    }
  }
  
  fetchUserDetails() {
    this.authService.getHrmsData(this.hrmsId).subscribe(
      (data) => {
        console.log(data);
        this.userdata = data;
        // Validate and format date_of_appointment
        this.userdata.date_of_appointment = this.formatDateForInput(data.date_of_appointment);
        
        if (!this.userdata.date_of_appointment) {
          this.errorMessage = 'Invalid or missing Date of Appointment.';
          if (this.isBrowser()) {
            alert(this.errorMessage);
          }
        }
      },
      (err) => {
        this.errorMessage = 'Failed to fetch user details.';
        if (this.isBrowser()) {
          alert(this.errorMessage);
        }
        console.error(err);
      }
    );
  }
  
  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.alert !== 'undefined';
  }
  
  

  onFileSelected(event: any) {
    this.pdfFile = event.target.files[0];
  }

  onSubmit(form: NgForm) {
    this.maintenanceGrantData.date_of_appointment = this.formatDateForInput(this.userdata.date_of_appointment);
    this.maintenanceGrantData.empname = this.userdata.empname;
    this.maintenanceGrantData.guardian_name = this.userdata.guardian_name;
    this.maintenanceGrantData.designation = this.userdata.designation;
    this.maintenanceGrantData.office = this.userdata.office;
    this.maintenanceGrantData.division = this.userdata.division;
    this.maintenanceGrantData.pf_no = this.userdata.pf_no;
    this.maintenanceGrantData.pay_band = this.userdata.pay_band;
    this.maintenanceGrantData.running_allowance = this.userdata.running_allowance;


     // Validate running allowance to ensure it doesn't exceed 8 digits
     if (this.maintenanceGrantData.running_allowance && !/^\d{1,8}$/.test(this.maintenanceGrantData.running_allowance.toString())) {
      alert('Running allowance must be a number with up to 8 digits.');
      return;
    }


    if (form.valid) {
      this.MaintenanceGrantformService.create(this.maintenanceGrantData, this.pdfFile)
        .subscribe({
          next: (response) => {
            alert('Maintenance Grant record created successfully!');
            form.reset();
            this.declarationChecked = false;
            this.router.navigate(['/maintenance-grant']);
          },
          error: (err) => {
            console.error(err);
            alert('Error saving Maintenance Grant data.');
          }
        });
    }
  }

 
  
  
}
