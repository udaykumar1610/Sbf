
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { MotorizedTricycleformService } from '../../servicesForm/motorized-tricycleform.service';


@Component({
  selector: 'app-motorized-tricycle-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './motorized-tricycle-form.component.html',
  styleUrls: ['./motorized-tricycle-form.component.css']
})
export class MotorizedTricycleFormComponent {
  hrmsId: any;
  userdata: any = [];
  successMessage: string = '';
  errorMessage: string = '';

  motorizedTricycleData: any = {
    empname: '',
    date_of_birth: '',
    relation_with_employee: '',
    date_of_appointment: '',
    bill_unit_number: '',
    community: '',
    designation: '',
    office: '',
    division: '',
    pf_no: '',
    payband: '',
    running_allowance: '',
    grade_pay_substantive: '',
    grade_pay_officiating_macp: '',
    account_number: '',
    bank_name: '',
    branch_name: '',
    ifsc_number: '',
    cost_of_tricycle: '',
    percentage_of_handicap: '',
    status: 'submitted',
  };

  pdfFile: any;

  constructor(
    private motorizedTricycleformService:MotorizedTricycleformService ,
    private router: Router,
    private authService: AuthService
  ) {}

  getHrmsId() {
    if (this.isBrowser()) {
      this.hrmsId = localStorage.getItem('hrmsId');
    }
  }

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
        this.userdata = data;
        this.userdata.date_of_appointment = this.formatDateForInput(data.date_of_appointment);
        this.userdata.date_of_birth = this.formatDateForInput(data.date_of_birth);
        
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
    this.motorizedTricycleData.date_of_appointment = this.formatDateForInput(this.userdata.date_of_appointment);
    this.motorizedTricycleData.date_of_birth = this.formatDateForInput(this.userdata.date_of_birth);
    this.motorizedTricycleData.empname = this.userdata.empname;
    this.motorizedTricycleData.designation = this.userdata.designation;
    this.motorizedTricycleData.office = this.userdata.office;
    this.motorizedTricycleData.division = this.userdata.division;
    this.motorizedTricycleData.pf_no = this.userdata.pf_no;
    this.motorizedTricycleData.payband = this.userdata.payband;

    if (form.valid) {
      this.motorizedTricycleformService.create(this.motorizedTricycleData, this.pdfFile)
        .subscribe({
          next: (response) => {
            alert('Motorized Tricycle record created successfully!');
            form.reset();
            this.router.navigate(['/motorized-tricycle']);
          },
          error: (err) => {
            console.error(err);
            alert('Error saving Motorized Tricycle data.');
          }
        });
    }
  }
}
