import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { PhysicallyChallengedFormService } from '../../servicesForm/physically-challenged-form.service';


@Component({
  selector: 'app-physically-challenged-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './physically-challenged-form.component.html',
  styleUrls: ['./physically-challenged-form.component.css']
})
export class PhysicallyChallengedFormComponent {

  hrmsId: any;
  userdata: any = [];
  successMessage: string = '';
  errorMessage: string = '';

  physicallyChallengedData: any = {
    empname: '',
    son_wife_of: '',
    spouse_details: '',
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
    physically_challenged_student_name: '',
    relationship_with_employee: '',
    school_child_dob: '',
    class_studying: '',
    school_name: '',
    nature_of_disability: '',
    financial_assistance_received_upto: '',
    financial_assistance_period_from: '',
    financial_assistance_period_to: '',
    status: 'Submitted',
  };

  pdfFile: any;

  constructor(
    private physicallyChallengedFormService: PhysicallyChallengedFormService,
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
        console.log(data);
        this.userdata = data;
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


     // Validate running allowance to ensure it doesn't exceed 8 digits
     if (this.physicallyChallengedData.running_allowance && !/^\d{1,8}$/.test(this.physicallyChallengedData.running_allowance.toString())) {
      alert('Running allowance must be a number with up to 8 digits.');
      return;
    }
    this.physicallyChallengedData.date_of_appointment = this.formatDateForInput(this.userdata.date_of_appointment);
    this.physicallyChallengedData.empname = this.userdata.empname;
    this.physicallyChallengedData.designation = this.userdata.designation;
    this.physicallyChallengedData.office = this.userdata.office;
    this.physicallyChallengedData.division = this.userdata.division;
    this.physicallyChallengedData.pf_no = this.userdata.pf_no;
    this.physicallyChallengedData.pay_band = this.userdata.pay_band;

    if (form.valid) {
      this.physicallyChallengedFormService.create(this.physicallyChallengedData, this.pdfFile)
        .subscribe({
          next: (response) => {
            alert('Physically Challenged record created successfully!');
            form.reset();
            this.router.navigate(['/physically-challenged']);
          },
          error: (err) => {
            console.error(err);
            alert('Error saving Physically Challenged data.');
          }
        });
    }
  }
}
