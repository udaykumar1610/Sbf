import { Component } from '@angular/core';
import { UserschemsComponent } from "../userschems/userschems.component";
import { ScholarshipFormComponent } from "../forms/scholarship-form/scholarship-form.component";
import { DenturesFormComponent } from "../forms/dentures-form/dentures-form.component";
import { MedicalFormComponent } from "../forms/medical-form/medical-form.component";
import { SpectaclesFormComponent } from "../forms/spectacles-form/spectacles-form.component";
import { FormdropComponent } from "../forms/formdrop/formdrop.component";
import { MaintenanceGrantFormComponent } from "../forms/maintenance-grant-form/maintenance-grant-form.component";



@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [UserschemsComponent, ScholarshipFormComponent, DenturesFormComponent, MedicalFormComponent, SpectaclesFormComponent, FormdropComponent, MaintenanceGrantFormComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}
