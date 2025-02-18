

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FamilyDetailsService } from '../../servicesForm/family-details.service';

@Component({
  selector: 'app-family-details-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './family-details-form.component.html',
  styleUrls: ['./family-details-form.component.css']
})
export class FamilyDetailsFormComponent {

  hrmsId: any;
  userdata: any = [];
  successMessage: string = '';
  errorMessage: string = '';

  familyDetailsData: any = {
    empname: '',
    son_or_wife_of: '',
    spouse_details: '',
    date_of_birth: '',
    date_of_appointment: '',
    bill_unit_number: '',
    community: '',
    designation: '',
    office: '',
    department_division: '',
    pf_number: '',
    pay_in_pay_band: '',
    running_allowance: '',
    grade_pay_substantive: '',
    grade_pay_officiating_macp: '',
    number_of_living_children_male: 0,
    number_of_living_children_female: 0,
    number_of_living_children_total: 0,
    sterilization_date: '',
    sterilization_hospital: '',
    status: 'Submitted',
    pdf_file_path: '',
    familyComposition: [{ dependent_name: '', relationship: '', age_dob: '', remarks: '' }]
  };

  pdfFile: any;

  constructor(
    private familyDetailsService: FamilyDetailsService,
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
      return ''; // Return empty string if date is null or undefined
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return ''; // Return empty string if invalid date
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
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
        this.familyDetailsData.date_of_appointment = this.formatDateForInput(data.date_of_appointment);
        this.familyDetailsData.date_of_birth = this.formatDateForInput(data.date_of_birth);
        this.familyDetailsData.empname = this.userdata.empname;
        this.familyDetailsData.designation = this.userdata.designation;
        this.familyDetailsData.office = this.userdata.office;
        this.familyDetailsData.department_division = this.userdata.department_division;
        this.familyDetailsData.pf_number = this.userdata.pf_no;
        this.familyDetailsData.pay_in_pay_band = this.userdata.payband;
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

    if (this.familyDetailsData.familyComposition.length === 0) {
      alert("Please provide family composition details.");
      return;
    }

    this.familyDetailsData.date_of_birth = this.formatDateForInput(this.userdata.date_of_birth);
    this.familyDetailsData.date_of_appointment = this.formatDateForInput(this.userdata.date_of_appointment);
    

    if (!this.familyDetailsData.date_of_birth || !this.familyDetailsData.date_of_appointment) {
      alert("Please provide valid dates for date of birth and date of appointment.");
      return; // Don't submit the form if dates are invalid
    }

    console.log("family composition before submit", this.familyDetailsData.familyComposition);

    // Keep familyComposition as an array (no stringification)
    if (form.valid) {
      this.familyDetailsService.create(this.familyDetailsData, this.pdfFile)
        .subscribe({
          next: (response) => {
            alert('Family Details record created successfully!');
            this.router.navigate(['/familyDetails']);
          },
          error: (err) => {
            console.error(err);
            alert('Error saving Family Details data.');
          }
        });
    }
    console.log("form details: ", this.familyDetailsData);
  }

  addFamilyRow() {
    this.familyDetailsData.familyComposition.push({ dependent_name: '', relationship: '', age_dob: '', remarks: '' });
  }

  removeFamilyRow(index: number) {
    if (this.familyDetailsData.familyComposition.length > 1) {
      this.familyDetailsData.familyComposition.splice(index, 1);
    }
  }
}
