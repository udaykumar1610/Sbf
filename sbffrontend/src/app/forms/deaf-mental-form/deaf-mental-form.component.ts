import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { DeafMentalFormService } from '../../servicesForm/deaf-mental-form.service';


@Component({
  selector: 'app-deaf-mental-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './deaf-mental-form.component.html',
  styleUrls: ['./deaf-mental-form.component.css']
})
export class DeafMentalFormComponent {

  hrmsId: any;
  userdata: any = [];
  successMessage: string = '';
  errorMessage: string = '';
  declarationChecked: boolean = false;
 

  deafMentalData: any = {
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
    school_name: '',
    tuition_fees_per_month: 0,
    transport_charges_per_month: 0,
    residential_fees_per_month: 0,
    grant_sbcf_received_upto: '',
    amount_of_claim: 0,
    period_of_claim_from: '',
    period_of_claim_to: '',
    tuition_fees_claimed: 0,
    residential_fees_claimed: 0,
    conveyance_charges_incurred: 0,
    vouchers_enclosed: '',
    other_financial_aid: '',
    status: 'Submitted',
   
  };
  

  pdfFile: any;

  constructor(
    private deafMentalFormService: DeafMentalFormService,
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
    if (this.deafMentalData.running_allowance && !/^\d{1,8}$/.test(this.deafMentalData.running_allowance.toString())) {
      alert('Running allowance must be a number with up to 8 digits.');
      return;
    }


    this.deafMentalData.date_of_appointment = this.formatDateForInput(this.userdata.date_of_appointment);
    this.deafMentalData.empname = this.userdata.empname;
    
    this.deafMentalData.designation = this.userdata.designation;
    this.deafMentalData.office = this.userdata.office;
    this.deafMentalData.division = this.userdata.division;
    this.deafMentalData.pf_no = this.userdata.pf_no;
    this.deafMentalData.pay_band = this.userdata.pay_band;
    this.deafMentalData.running_allowance = this.userdata.running_allowance;

    if (form.valid) {
      this.deafMentalFormService.create(this.deafMentalData, this.pdfFile)
        .subscribe({
          next: (response) => {
            alert('Deaf and Mentally Retarded record created successfully!');
            form.reset();
            this.declarationChecked = false;
          
            this.router.navigate(['/deaf-and-mentally-retarded']);
          },
          error: (err) => {
            console.error(err);
            alert('Error saving Deaf and Mentally Retarded data.');
          }
        });
    }
  }
}
