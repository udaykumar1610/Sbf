import { Component } from '@angular/core';
import { UserschemsComponent } from "../userschems/userschems.component";
import { ScholarshipFormComponent } from "../forms/scholarship-form/scholarship-form.component";
import { DenturesFormComponent } from "../forms/dentures-form/dentures-form.component";
import { MedicalFormComponent } from "../forms/medical-form/medical-form.component";
import { SpectaclesFormComponent } from "../forms/spectacles-form/spectacles-form.component";
import { FormdropComponent } from "../forms/formdrop/formdrop.component";
import { MaintenanceGrantFormComponent } from "../forms/maintenance-grant-form/maintenance-grant-form.component";
import { AuthService } from '../auth.service';

import { RouterLink, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [UserschemsComponent, ScholarshipFormComponent, DenturesFormComponent, MedicalFormComponent, SpectaclesFormComponent, FormdropComponent, MaintenanceGrantFormComponent,RouterOutlet,RouterLink],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

    name: string = '';
         
        
          constructor(private authService: AuthService) {}
        
          
          ngOnInit(): void {
            // Check if we are in the browser before using localStorage
            if (this.isBrowser()) {
              this.name = localStorage.getItem('name') || ''; // Fallback to empty string if not found
            }
          }
          private isBrowser(): boolean {
            // Check if window object exists (i.e., we are in the browser environment)
            return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
          }
  

}
