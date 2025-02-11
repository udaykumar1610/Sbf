import { Component } from '@angular/core';
import { UserschemsComponent } from "../userschems/userschems.component";
import { ScholarshipFormComponent } from "../forms/scholarship-form/scholarship-form.component";

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [UserschemsComponent, ScholarshipFormComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}
