
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { KithkinFormService } from '../../servicesForm/kithkin-form.service';

@Component({
  selector: 'app-kithkin-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './kithkin-form.component.html',
  styleUrls: ['./kithkin-form.component.css']
})
export class KithkinFormComponent {

  hrmsId: any;
  userdata: any = [];
  successMessage: string = '';
  errorMessage: string = '';
  declarationChecked:boolean=false;

  kithkinData: any = {
    empname: '',
    designation: '',
    office: '',
    division: '',
    pf_no: '',
    date_of_death: '',
    AaddressLastRites: '',
    status: 'Submitted'
  };

  pdfFile: any;

  constructor(
    private kithkinFormService: KithkinFormService,
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
        this.kithkinData.empname = this.userdata.empname;
        this.kithkinData.designation = this.userdata.designation;
        this.kithkinData.office = this.userdata.office;
        this.kithkinData.division = this.userdata.division;
        this.kithkinData.pf_no = this.userdata.pf_no;
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
    if (form.valid) {
      this.kithkinFormService.create(this.kithkinData, this.pdfFile)
        .subscribe({
          next: (response) => {
            alert('Kithkin record created successfully!');
            form.reset();
            this.declarationChecked=false;
            this.router.navigate(['/kithkin']);
          },
          error: (err) => {
            console.error(err);
            alert('Error saving Kithkin data.');
          }
        });
    }
  }
}
